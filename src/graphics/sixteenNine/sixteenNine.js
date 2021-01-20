import m from 'mithril';
import gsap from 'gsap';

import '../common.css'
import './sixteenNine.css';

class HelloWorldComponent {
  view() {
    return m('div', { class: 'hello-world'}, 'Hello World!');
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

m.mount(document.body, HelloWorldComponent);
