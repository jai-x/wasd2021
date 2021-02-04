import m from 'mithril';
import gsap from 'gsap';
import { range, sample } from 'lodash';

import './starfall.css';

const CONF = {
  numStars: 20,
  x:     { min: 0, max: 3000 },
  y:     { min: 0, max: 1600 },
  delay: { min: 0, max: 20 },
  sizes: [
    { name: 'small',  duration: 10, colors: ['color-1', 'color-2', 'color-3'], },
    { name: 'medium', duration: 15, colors: ['color-1', 'color-2', 'color-3', 'color-4'] },
    { name: 'large',  duration: 24, colors: ['color-1', 'color-2', 'color-3'] },
  ],
};

export default class StarfallComponent {
  view() {
    return m('.starfall-container', ...range(CONF.numStars).map(() => m(StarfallStar)));
  }
}

class StarfallStar {
  oninit(vnode) {
    this.size = sample(CONF.sizes);
    this.color = sample(this.size.colors);
  }

  view(vnode) {
    return m(`.starfall-star ${this.size.name} ${this.color}`);
  }

  oncreate(vnode) {
    const randomY = () => ({ y: gsap.utils.random(CONF.y.min, CONF.y.max) });

    gsap.set(vnode.dom, randomY());

    gsap.to(vnode.dom, {
      x: `+=${CONF.x.max}`,
      duration: this.size.duration,
      ease: 'power1.in',
      repeat: -1,
      delay: gsap.utils.random(CONF.delay.min, CONF.delay.max),
      onRepeat: () => { gsap.set(vnode.dom, randomY()) },
    });
  }
}
