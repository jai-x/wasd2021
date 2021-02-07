import m from 'mithril';
import gsap from 'gsap';

import '../common.css';
import './problems.css';

import StarfallComponent from '../starfall/starfall.js';

class ProblemsImages {
  view() {
    return m('div', [
      m('.problems-image .wasd'),
      m('.problems-image .notlikethis'),
    ]);
  }

  onremove(vnode) {
    if (this.anim) {
      this.anim.kill();
    }
  }

  oncreate(vnode) {
    console.log(vnode.dom.children);

    if (this.anim) {
      this.anim.kill();
    }

    const tl = gsap.timeline({ repeat: -1 });

    Array.from(vnode.dom.children).forEach((child) => {
      tl.from(child, { opacity: 0 });
      tl.to({}, 20, {});
      tl.to(child, { opacity: 0});
    });

    this.anim = tl;
  }
}

class ProblemsComponent {
  view() {
    return m('.graphic .fullscreen', [
      m(StarfallComponent),
      m(ProblemsImages),
      m('.problems-text', 'Technical Difficulties'),
    ]);
  }
}

m.mount(document.body, ProblemsComponent);
