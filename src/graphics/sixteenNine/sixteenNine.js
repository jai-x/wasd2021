import m from 'mithril';
import gsap from 'gsap';

import '../common.css'
import './sixteenNine.css';

import TimerComponent from '../timer/timer.js';

const runRep = NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const timerRep = NodeCG.Replicant('timer', 'nodecg-speedcontrol');

const blankRun = {
  category: 'Nipple %',
  estimate: '00:04:20',
  game: 'Some Cool Game',
  release: '1996',
  system: 'Arch Linux',
  teams: [
    {
      players: [
        { name: 'jai_' },
      ],
    },
  ],
};

const safeRun = () => (runRep.value || blankRun);
const sep = '/';

class SixteenNineComponent {
  view() {
    return m('.graphic', [
      m('.game'),
      m('.left', [
        m('.cam'),
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


NodeCG.waitForReplicants(runRep, timerRep).then(() => {
  m.mount(document.body, SixteenNineComponent);
});

runRep.on('change', () => { m.redraw(); });
timerRep.on('change', () => { m.redraw(); });
