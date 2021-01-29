import m from 'mithril';
import gsap from 'gsap';
import { range, sample } from 'lodash';

import './starfall.css';

const NUM_STARS = 20;
const MAX_X = 3000;
const MAX_Y = 1600;
const MAX_DELAY = 10;

export default class StarfallComponent {
  view() {
    return m('.starfall-container', ...range(NUM_STARS).map(() => m(StarfallStar)));
  }
}

class StarfallStar {
  oninit() {
    this.startPos = { y: gsap.utils.random(0, MAX_Y) };
    this.size = sample(['small', 'medium', 'large']);
    this.duration = { small: 10, medium: 12, large: 24 }[this.size];
    this.color = sample(['color-1', 'color-2', 'color-3']);
  }

  view() {
    return m(`.starfall-star ${this.size} ${this.color}`);
  }

  oncreate(vnode) {
    gsap.set(vnode.dom, this.startPos);
    gsap.to(vnode.dom, {
      x: `+=${MAX_X}`,
      duration: this.duration,
      ease: 'linear',
      repeat: -1,
      delay: gsap.utils.random(0, MAX_DELAY),
      onRepeat: () => { gsap.set(vnode.dom, { y: gsap.utils.random(0, MAX_Y) }) },
    });
  }
}
