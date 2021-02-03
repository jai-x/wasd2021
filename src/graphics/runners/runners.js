import m from 'mithril';
import gsap from 'gsap';
import { get } from 'lodash';

import './runners.css';

export default class RunnersComponent {
  view(vnode) {
    if (!vnode.attrs.players) {
      return null;
    }

    return m('.runners-container', ...vnode.attrs.players.map((p, i) => {
      return m(RunnerComponent, {
        name: p.name,
        key: p.name,
        twitch: get(p, 'social.twitch'),
        pronouns: get(vnode, `attrs.customData.p${i+1}Pronouns`),
      });
    }));
  }
}

class RunnerPronouns {
  view(vnode) {
    const { pronouns } = vnode.attrs;

    if (!pronouns) {
      return null;
    }

    return m('.runner-pronouns', pronouns);
  }
}

class RunnerRowName {
  view(vnode) {
    const { name, pronouns } = vnode.attrs;

    return m('.runner-row .name', [
      m('.runner-icon .runner'),
      m('.runner-label', name),
      m(RunnerPronouns, { pronouns: pronouns }),
    ]);
  }
}

class RunnerRowTwitch {
  view(vnode) {
    const { twitch, pronouns } = vnode.attrs;

    if (!twitch) {
      return null;
    }

    return m('.runner-row .twitch', [
      m('.runner-icon .twitch'),
      m('.runner-label', twitch),
      //m(RunnerPronouns, { pronouns: pronouns }),
    ]);
  }
}

class RunnerComponent {
  view(vnode) {
    const { name, twitch, key, pronouns } = vnode.attrs;

    if (!key) {
      throw 'RunnerComponent requires `key` attribute';
    }

    return m('.runner-container', [
      m(RunnerRowName, { name: name, pronouns: pronouns }),
      m(RunnerRowTwitch, { twitch: twitch, pronouns: pronouns }),
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

