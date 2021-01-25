import m from 'mithril';
import gsap from 'gsap';

import '../common.css'
import './sixteenNine.css';

const camHeightRep = NodeCG.Replicant('camHeight', 'wasd2021', { defaultValue: 300 });

class HelloWorldComponent {
  view() {
    return m('.hello-world', 'Hello World!');
  }

  oncreate(vnode) {
    this.tween = gsap.to(vnode.dom, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
  }

  onremove() {
    this.tween.kill();
  }
}

class CamComponent {
  view() {
    return m('.cam');
  }

  oncreate(vnode) {
    camHeightRep.on('change', (newVal, _) => {
      gsap.to(vnode.dom, { height: newVal });
    });
  }
}


class SixteenNineComponent {
  view() {
    return [
      m('.game'),
      m('.left', [
        m(CamComponent),
      ]),
      m('.bottom'),
    ];
  }
}

m.mount(document.body, SixteenNineComponent);
