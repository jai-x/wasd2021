const EventEmitter = require('events');

const moment = require('moment');

module.exports = (nodecg) => {

  class CountdownTimer extends EventEmitter {
    constructor() {
      super();
      this.state = 'paused';
      this.remainingMs = 300000; // 5 min
    }

    log(msg) {
      nodecg.log.info(`[countdown] ${msg}`);
    }

    timeStringToMs(timeString) {
      if (typeof timeString !== 'string') {
        throw new TypeError('Expected string');
      }

      const format = /^(\d{1,2}:){0,2}\d{1,2}$/;
      if (!format.test(timeString)) {
        throw new Error(`Bad timeString format ${timeString}`);
      }

      const parts = timeString.split(':')
                              .map(part => parseInt(part, 10))
                              .reverse();

      return moment.duration({
        seconds: parts[0],
        minutes: parts[1],
        hours:   parts[2],
      }).asMilliseconds();
    }

    msToTimeString(ms) {
      if (typeof ms !== 'number') {
        throw new TypeError('Expected number');
      }

      const d = moment.duration({ milliseconds: ms });

      return [(d.hours() || null), d.minutes(), d.seconds()]
        .filter(d => d !== null)
        .map(d => String(d).padStart(2, '0'))
        .join(':');
    }

    update() {
      this.emit('tick', this.msToTimeString(this.remainingMs), this.state);
    }

    tick() {
      this.remainingMs = Math.max(this.endTime - Date.now(), 0);
      this.update();

      if (this.remainingMs === 0) {
        clearInterval(this.ticker);
        this.state = 'ended';
        this.update();
      }
    }

    start(timeString) {
      try {
        this.endTime = this.timeStringToMs(timeString) + Date.now();
      } catch (e) {
        this.log(e);
        this.endTime = Date.now();
      }


      clearInterval(this.ticker);
      this.state = 'running';
      this.ticker = setInterval(this.tick.bind(this), 100);
    }

    pause() {
      clearInterval(this.ticker);
      this.state = 'paused';
      this.update();
    }
  }

  const countdownRep = nodecg.Replicant('countdown', 'wasd2021');
  const instance = new CountdownTimer();
  instance.on('tick', (display, state) => { countdownRep.value = { display, state } });
  instance.update(); //Broadcast paused state on startup

  nodecg.listenFor('countdown.start', 'wasd2021', (msg) => { instance.start(msg); });
  nodecg.listenFor('countdown.pause', 'wasd2021', () => { instance.pause(); });
};
