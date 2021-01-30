import m from 'mithril';

import '../common.css'
import './sixteenNine.css';

import TimerComponent from '../timer/timer.js';
import RunnersComponent from '../runners/runners.js';
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

class SixteenNineComponent {
  view() {
    return m('.graphic .sixteen-nine', [
      m(StarfallComponent),
      m('.game'),
      m('.left', [
        m('.cam'),
        m(RunnersComponent, { players: safeRun().teams[0].players }),
        m('.left-info', [
          m('.special-effect-logo'),
          //m('.x', 'X'),
          m('.wasd-logo'),
          m('.total', `£${Math.floor(totalRep.value)}`),
        ]),
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
