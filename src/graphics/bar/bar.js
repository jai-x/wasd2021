import m from 'mithril';
import gsap from 'gsap';
import moment from 'moment';

import '../common.css';
import './bar.css';

import { nextRuns } from '../nextRuns/nextRuns.js';

const replicants = {
  run: NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol'),
  runArray: NodeCG.Replicant('runDataArray', 'nodecg-speedcontrol'),
  total: NodeCG.Replicant('total', 'nodecg-tiltify'),
};

class BarComponent {
  view(vnode) {
    return m('.bar', [
      m('.left', 'Bottom Text'),
      m('.v-space'),
      m('.mid', 'Next Up: Furi - jai_'),
      m('.v-space'),
      m('.right', moment().format('HH:mm')),
    ]);
  }
}


NodeCG.waitForReplicants(...Object.values(replicants)).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(BarComponent, {
        total: Math.floor(replicants.total.value),
        nextRuns: nextRuns(replicants.run.value, replicants.runArray.value),
      });
    }
  });
});

Object.values(replicants).forEach((rep) => {
  rep.on('change', () => { m.redraw(); });
});

class Ticker extends EventTarget {
  constructor(intervalMs) {
    super();

    if (typeof intervalMs !== 'number') {
        throw new TypeError('Expected number');
    }

    this.intervalMs = intervalMs;
  }

  start() {
    this.ticker = setInterval(this.tick.bind(this), this.intervalMs);
  }

  stop() {
    clearInterval(this.ticker);
  }

  tick() {
    this.dispatchEvent(new Event('tick'));
  }
}

const ticker = new Ticker(5000); // 5 seconds
ticker.addEventListener('tick', () => { m.redraw(); });
ticker.start();
