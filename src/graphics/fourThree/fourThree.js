import m from 'mithril';
import { get } from 'lodash';
import fitty from 'fitty';

import '../common.css'
import './fourThree.css';

import TimerComponent from '../timer/timer.js';
import RunnersComponent from '../runners/runners.js';
import CouchComponent from '../couch/couch.js';
import StarfallComponent from '../starfall/starfall.js';

const replicants = {
  run: NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol'),
  timer: NodeCG.Replicant('timer', 'nodecg-speedcontrol'),
  total: NodeCG.Replicant('total', 'nodecg-tiltify'),
};

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
    return m('.graphic .overlay', [
      m(StarfallComponent),
      m('.game'),
      m('.left', [
        m('.run-info', [
          m(RunGameComponent, { game: get(vnode, 'attrs.run.game') }),
          m(RunDetailsComponent, { run: get(vnode, 'attrs.run') }),
        ]),
        m('.run-spacer'),
        m('.run-timing', [
          m(TimerComponent, { time: vnode.attrs.time }),
          m('.run-estimate', `Estimate: ${get(vnode, 'attrs.run.estimate')}`),
        ]),
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
    ]);
  }
}

NodeCG.waitForReplicants(...Object.values(replicants)).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(FourThreeComponent, {
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
