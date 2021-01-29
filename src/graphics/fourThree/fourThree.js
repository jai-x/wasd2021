import m from 'mithril';
import gsap from 'gsap';

import '../common.css'
import './fourThree.css';

const runRep = NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const timerRep = NodeCG.Replicant('timer', 'nodecg-speedcontrol');

class FourThreeComponent {
  view() {
    return m('.graphic');
  }
}

NodeCG.waitForReplicants(runRep, timerRep).then(() => {
  m.mount(document.body, FourThreeComponent);
});

runRep.on('change', () => { m.redraw(); });
timerRep.on('change', () => { m.redraw(); });
