import m from 'mithril';
import gsap from 'gsap';

import '../common.css'
import './sixteenNine.css';

class SixteenNineComponent {
  view() {
    return [
      m('.game'),
      m('.left', [
        m('.cam'),
      ]),
      m('.bottom'),
    ];
  }
}

m.mount(document.body, SixteenNineComponent);
