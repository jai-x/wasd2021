import m from 'mithril';

import '../common.css';
import './countdown.css';

const countdownRep = NodeCG.Replicant('countdown', 'wasd2021');

class CountdownControl {
  oninit(vnode) {
    this.display = vnode.attrs.countdown.display;
  }

  view(vnode) {
    const running = (vnode.attrs.countdown.state === 'running');

    return m('.countdown-container', [
      m('.countdown-status', vnode.attrs.countdown.state),
      m('input.countdown-display', {
        type: 'text',
        autofocus: !running,
        disabled: running,
        value: running ? vnode.attrs.countdown.display : this.display,
        oninput: (e) => { this.display = e.target.value; },
      }),
      m('.countdown-controls', [
        m('button.countdown-button', {
          disabled: running,
          onclick: () => {
            NodeCG.sendMessageToBundle('countdown.start', 'wasd2021', this.display);
          }
        }, 'Start'),
        m('button.countdown-button', {
          disabled: !running,
          onclick: () => {
            NodeCG.sendMessageToBundle('countdown.pause', 'wasd2021');
            this.display = vnode.attrs.countdown.display;
          }
        }, 'Pause'),
      ]),
    ]);
  }
}

NodeCG.waitForReplicants(countdownRep).then(() => {
  // ensure good state
  countdownRep.value = { state: 'paused', display: '10:00' };

  m.mount(document.body, {
    view: () => m(CountdownControl, { countdown: countdownRep.value })
  });
});

countdownRep.on('change', () => { m.redraw(); });
