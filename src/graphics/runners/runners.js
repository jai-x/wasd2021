import m from 'mithril';
import gsap from 'gsap';

import './runners.css';

export default class RunnersComponent {
  view(vnode) {
    return m('.runners-container', ...vnode.attrs.players.map((p) => {
      return m(RunnerComponent, { name: p.name, key: p.name, twitch: p.social.twitch });
    }));
  }
}

class RunnerComponent {
  view(vnode) {
    const { name, twitch, key } = vnode.attrs;

    if (!key) {
      throw 'RunnerComponent requires `key` attribute';
    }

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
    if (this.timeline) {
      this.timeline.kill();
    }

    // if there's just runner name with no twitch, don't animate
    if (vnode.dom.children.length < 2) {
      return;
    }

    // animation timeline
    const tl = gsap.timeline({ repeat: -1 });

    // how long to display each element
    const hold = 10;

    // fadein/pause/fadeout for each child element in sequence
    Array.from(vnode.dom.children).forEach((child) => {
      tl.from(child, { opacity: 0 });
      tl.to({}, hold, {});
      tl.to(child, { opacity: 0 });
    });

    // hold reference to animation
    this.timeline = tl;
  }

  onremove(vnode) {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}

