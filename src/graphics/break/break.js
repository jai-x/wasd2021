import m from 'mithril';

import '../common.css';
import './break.css';

import StarfallComponent from '../starfall/starfall.js';
import CurrentSongComponent from '../currentSong/currentSong.js';

const runRep = NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const totalRep = NodeCG.Replicant('total', 'nodecg-tiltify');
const currentSongRep = NodeCG.Replicant('currentSong', 'nodecg-spotify');
const countdownRep = NodeCG.Replicant('countdown', 'wasd2021');

class BreakComponent {
  view(vnode) {
    return m('.graphic .fullscreen', [
      m(StarfallComponent),
      m('.break-container', [
        m('.left', [
          m('.countdown-container', [
            m('.countdown-label', 'BACK SOON'),
            m('.countdown-time', vnode.attrs.countdown.display),
          ]),
          m('.logo .wasd'),
          m('.logo .special-effect'),
          m(CurrentSongComponent, vnode.attrs.currentSong),
        ]),
        m('.v-space'),
        m('.right'),
      ]),
    ]);
  }
}

NodeCG.waitForReplicants(runRep, totalRep, currentSongRep, countdownRep).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(BreakComponent, {
        currentSong: currentSongRep.value,
        total: Math.floor(totalRep.value),
        countdown: countdownRep.value,
      });
    }
  });
});


runRep.on('change', () => { m.redraw(); });
totalRep.on('change', () => { m.redraw(); });
currentSongRep.on('change', () => { m.redraw(); });
countdownRep.on('change', () => { m.redraw(); });
