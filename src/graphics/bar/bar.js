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

class CTA {
  view(vnode) {
    return m('.cta', vnode.attrs.ctas.map(c => m('.cta-text', c)));
  }

  oncreate(vnode) {
    const ctas = Array.from(vnode.dom.children);

    const tl = gsap.timeline({ repeat: -1 });

    ctas.forEach((cta) => {
      tl.from(cta, { opacity: 0 });
      tl.to({}, vnode.attrs.hold || 2, {});
      tl.to(cta, { opacity: 0 });
    });

    this.anim = tl;
  }

  onremove(vnode) {
    if (this.anim) {
      this.anim.kill();
    }
  }
}

class BarComponent {
  view(vnode) {
    return m('.bar', [
      m('.name', [
        m('.logo.wasd-icon'),
        m('span', 'WASD 2021'),
      ]),
      m('.v-space'),
      m('.donos', [
        m('.logo.special-effect'),
        m('span', `£${vnode.attrs.total}`),
      ]),
      m('.v-space'),
      m(CTA, {
        hold: 30,
        ctas: [
        'This is Warwick\'s Awesome Speedruns & Demos 2021',
        'See the full schedule at wasd.warwick.gg/schedule',
        'WASD 2021 is raising money for SpecialEffect',
        'Donate now at wasd.warwick.gg/donate',
        ]
      }),
      m('.v-space'),
      m('span', moment().format('HH:mm')),
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
