import m from 'mithril';

import '../common.css';
import './break.css';

import StarfallComponent from '../starfall/starfall.js';
import CurrentSongComponent from '../currentSong/currentSong.js';

const runRep = NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const totalRep = NodeCG.Replicant('total', 'nodecg-tiltify');
const currentSongRep = NodeCG.Replicant('currentSong', 'nodecg-spotify');

class BreakComponent {
  view(vnode) {
    return m('.graphic .fullscreen', [
      m(StarfallComponent),
      m(CurrentSongComponent, vnode.attrs.currentSong),
    ]);
  }
}

NodeCG.waitForReplicants(runRep, totalRep, currentSongRep).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(BreakComponent, {
        currentSong: currentSongRep.value,
        total: Math.floor(totalRep.value),
      });
    }
  });
});


runRep.on('change', () => { m.redraw(); });
totalRep.on('change', () => { m.redraw(); });
currentSongRep.on('change', () => { m.redraw(); });
