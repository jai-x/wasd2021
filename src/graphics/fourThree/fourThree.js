import m from 'mithril';
import { get } from 'lodash';
import fitty from 'fitty';

import '../common.css'
import './fourThree.css';

import TimerComponent from '../timer/timer.js';
import RunnersComponent from '../runners/runners.js';
import StarfallComponent from '../starfall/starfall.js';

import blankRun from '../blankRun.js';

const runRep = NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const timerRep = NodeCG.Replicant('timer', 'nodecg-speedcontrol');
const totalRep = NodeCG.Replicant('total', 'nodecg-tiltify');


class RunGameComponent {
  view(vnode) {
    return m('.run-game', String(vnode.attrs.game));
  }

  onupdate(vnode) {
    fitty(vnode.dom, { maxSize: 45, multiline: false });
  }

  oncreate(vnode) {
    fitty(vnode.dom, { maxSize: 45, multiline: false });
  }
}

class RunDetailsComponent {
  view(vnode) {
    const system = get(vnode, 'attrs.run.system');
    const release = get(vnode, 'attrs.run.release');
    const category = get(vnode, 'attrs.run.category');
    const sep = '/';

    return  m('.run-details', `${system}  ${sep}  ${release}  ${sep}  ${category}`);
  }

  onupdate(vnode) {
    fitty(vnode.dom, { maxSize: 23, multiline: false });
  }

  oncreate(vnode) {
    fitty(vnode.dom, { maxSize: 23, multiline: false });
  }
}

class FourThreeComponent {
  view(vnode) {
    return m('.graphic .four-three', [
      m(StarfallComponent),
      m('.game'),
      m('.left', [
        m('.run-info', [
          m(RunGameComponent, { game: get(vnode, 'attrs.run.game') }),
          m(RunDetailsComponent, { run: get(vnode, 'attrs.run') }),
        ]),
        m('.h-spacer'),
        m('.run-timing', [
          m(TimerComponent, { time: vnode.attrs.time }),
          m('.run-estimate', `Estimate: ${get(vnode, 'attrs.run.estimate')}`),
        ]),
        m('.cam'),
        m(RunnersComponent, {
          players: get(vnode, 'attrs.run.teams[0].players'),
          customData: get(vnode, 'attrs.run.customData'),
        }),
        m('.info', [
          m('.special-effect-logo'),
          m('.wasd-logo'),
          m('.total', `£${vnode.attrs.total}`),
        ]),
      ]),
    ]);
  }
}

NodeCG.waitForReplicants(runRep, timerRep, totalRep).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(FourThreeComponent, {
        run: runRep.value,
        time: timerRep.value.time,
        total: Math.floor(totalRep.value),
      });
    }
  });
});

runRep.on('change', () => { m.redraw(); });
timerRep.on('change', () => { m.redraw(); });
totalRep.on('change', () => { m.redraw(); });
