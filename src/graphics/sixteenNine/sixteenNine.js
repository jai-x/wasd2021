import m from 'mithril';
import { get } from 'lodash';

import '../common.css'
import './sixteenNine.css';

import TimerComponent from '../timer/timer.js';
import RunnersComponent from '../runners/runners.js';
import CouchComponent from '../couch/couch.js';
import StarfallComponent from '../starfall/starfall.js';

const replicants = {
  run: NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol'),
  timer: NodeCG.Replicant('timer', 'nodecg-speedcontrol'),
  total: NodeCG.Replicant('total', 'nodecg-tiltify'),
};

const sep = '/';

class SixteenNineComponent {
  view(vnode) {
    return m('.graphic .overlay', [
      m(StarfallComponent),
      m('.game'),
      m('.left', [
        m('.cam'),
        m(RunnersComponent, {
          players: get(vnode, 'attrs.run.teams[0].players'),
          customData: get(vnode, 'attrs.run.customData'),
        }),
        m(CouchComponent, { customData: get(vnode, 'attrs.run.customData') }),
        m('.logos', [
          m('.logo .wasd'),
          m('.logo .special-effect'),
        ]),
      ]),
      m('.bottom',[
        m('.run-details', [
          m('.run-game', String(get(vnode, 'attrs.run.game'))),
          m('.run-details-row', [
            m('div', String(get(vnode, 'attrs.run.system'))),
            m('div', sep),
            m('div', String(get(vnode, 'attrs.run.release'))),
            m('div', sep),
            m('div', String(get(vnode, 'attrs.run.category'))),
          ]),
        ]),
        m('.run-timing', [
          m(TimerComponent, { time: vnode.attrs.time }),
          m('.estimate', `Estimate: ${get(vnode, 'attrs.run.estimate')}`),
        ]),
      ]),
    ]);
  }
}


NodeCG.waitForReplicants(...Object.values(replicants)).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(SixteenNineComponent, {
        run: replicants.run.value,
        time: replicants.timer.value.time,
        total: Math.floor(replicants.total.value),
      });
    }
  });
});

Object.values(replicants).forEach((rep) => {
  rep.on('change', () => { m.redraw(); });
});
