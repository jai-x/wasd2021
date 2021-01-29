import m from 'mithril';

import '../common.css';
import './problems.css';

import StarfallComponent from '../starfall/starfall.js';

class ProblemsComponent {
  view() {
    return m('.graphic .problems', [
      m(StarfallComponent),
      m('.problems-text', 'Technical Difficulties'),
      m('.problems-image'),
    ]);
  }
}

m.mount(document.body, ProblemsComponent);
