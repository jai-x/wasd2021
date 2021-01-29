import m from 'mithril';
import gsap from 'gsap';
import { get } from 'lodash';

import '../common.css'
import './sixteenNine.css';

import TimerComponent from '../timer/timer.js';
import StarfallComponent from '../starfall/starfall.js';

const runRep = NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const timerRep = NodeCG.Replicant('timer', 'nodecg-speedcontrol');
const totalRep = NodeCG.Replicant('total', 'nodecg-tiltify');

const blankRun = {
  category: 'Nipple %',
  estimate: '00:04:20',
  game: 'Some Cool Game',
  release: '1996',
  system: 'Arch Linux',
  teams: [
    {
      players: [
        { name: 'jai_', social: { twitch: 'jai_' } },
        { name: 'Excalibur12' },
      ],
    },
  ],
};

const safeRun = () => (runRep.value || blankRun);
const sep = '/';

class RunnerComponent {
  view(vnode) {
    const name = get(vnode, 'attrs.runner.name');
    const twitch = get(vnode, 'attrs.runner.social.twitch');

    if (!twitch) {
      return m('.runner-container', [
        m('.runner-row', [
          m('.runner-icon .runner'),
          m('span', name),
        ])
      ]);
    }

    return m('.runner-container', [
      m('.runner-row', [
        m('.runner-icon .runner'),
        m('span', name),
      ]),
      m('.runner-row .twitch', [
        m('.runner-icon .twitch'),
        m('span', twitch),
      ]),
    ]);
  }

  oncreate(vnode) {
    if (vnode.dom.children.length < 2) {
      return;
    }

    const tl = gsap.timeline({ repeat: -1 });

    const hold = 10;

    Array.from(vnode.dom.children).forEach((child) => {
      tl.from(child, { opacity: 0 });
      tl.to({}, hold, {});
      tl.to(child, { opacity: 0 });
    });

    this.timeline = tl;
  }

  onremove() {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}

class SixteenNineComponent {
  view() {
    return m('.graphic .sixteen-nine', [
      m(StarfallComponent),
      m('.game'),
      m('.left', [
        m('.cam'),
        m('.runners', ...safeRun().teams[0].players.map((p) => {
          return m(RunnerComponent, { runner: p });
        })),
      ]),
      m('.bottom',[
        m('.run-details', [
          m('.run-game', safeRun().game),
          m('.run-details-row', [
            m('div', safeRun().system),
            m('div', sep),
            m('div', safeRun().release),
            m('div', sep),
            m('div', safeRun().category),
          ]),
        ]),
        m('.run-timing', [
          m(TimerComponent, { timerRep }),
          m('.estimate', `Estimate: ${safeRun().estimate}`),
        ]),
      ]),
    ]);
  }
}


NodeCG.waitForReplicants(runRep, timerRep, totalRep).then(() => {
  m.mount(document.body, SixteenNineComponent);
});

runRep.on('change', () => { m.redraw(); });
timerRep.on('change', () => { m.redraw(); });
totalRep.on('change', () => { m.redraw(); });
