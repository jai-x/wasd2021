import m from 'mithril';

import '../common.css';
import './break.css';

import StarfallComponent from '../starfall/starfall.js';

class BreakComponent {
  view() {
    return m('.graphic .break', [
      m(StarfallComponent),
    ]);
  }
}

m.mount(document.body, BreakComponent);
