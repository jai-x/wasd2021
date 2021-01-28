import m from 'mithril';
import gsap from 'gsap';

import './timer.css';

export default class TimerComponent {
  view(vnode) {
    const { time } = vnode.attrs.timerRep.value;

    return m('.timer-container', [
      m('.timer-flash'),
      m('.timer-text', time),
    ]);
  }

  oncreate(vnode) {
    const flashbox = vnode.dom.children[0];

    const startAnim = gsap.to(flashbox, {
      opacity: 1,
      duration: 0.5,
      easing: 'power4',
      repeat: 1,
      yoyo: true,
      paused: true,
    });

    const stopAnim = gsap.to(flashbox, {
      opacity: 1,
      duration: 0.5,
      paused: true,
    });

    const resetAnim = gsap.to(flashbox, {
      opacity: 0,
      duration: 0.5,
      paused: true,
    });

    nodecg.listenFor('timerStart', 'nodecg-speedcontrol', () => {
      startAnim.restart();
    });

    nodecg.listenFor('timerPause', 'nodecg-speedcontrol', () => {
      stopAnim.restart();
    });

    nodecg.listenFor('timerStop', 'nodecg-speedcontrol', () => {
      stopAnim.restart();
    });

    nodecg.listenFor('timerReset', 'nodecg-speedcontrol', () => {
      resetAnim.restart();
    });

    nodecg.listenFor('timerUndo', 'nodecg-speedcontrol', () => {
      resetAnim.restart();
    });
  }
}
