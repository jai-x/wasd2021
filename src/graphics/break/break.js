import m from 'mithril';
import gsap from 'gsap';
import { get } from 'lodash';

import '../common.css';
import './break.css';

import StarfallComponent from '../starfall/starfall.js';
import CurrentSongComponent from '../currentSong/currentSong.js';
import VideoPlayer from '../videoPlayer/videoPlayer.js';
import NextRuns from '../nextRuns/nextRuns.js';

const replicants = {
  run: NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol'),
  runArray: NodeCG.Replicant('runDataArray', 'nodecg-speedcontrol'),
  total: NodeCG.Replicant('total', 'nodecg-tiltify'),
  currentSong: NodeCG.Replicant('currentSong', 'nodecg-spotify'),
  countdown: NodeCG.Replicant('countdown', 'wasd2021'),
  currentVideo: NodeCG.Replicant('currentVideo', 'wasd2021'),
};

class BreakComponent {
  view(vnode) {
    return m('.graphic .fullscreen', [
      m(StarfallComponent),
      m('.break-container', [
        m('.left', [
          m('.logo .wasd'),
          m('.logo .special-effect'),
          m('.h-space'),
          m('.countdown-container', [
            m('.countdown-label', 'BACK SOON'),
            m('.countdown-time', vnode.attrs.countdown.display),
          ]),
          m(CurrentSongComponent, vnode.attrs.currentSong),
        ]),
        m('.v-space'),
        m('.right', [
          m('.right-schedule', [
            m(NextRuns, { nextRuns: vnode.attrs.nextRuns, key: get(vnode, 'attrs.nextRuns[0].id') })
          ]),
          m('.v-space'),
          m('.right-info', [
            m('.total-container', [
              m('.total-label', 'TOTAL RAISED'),
              m('.total-amount', `£${vnode.attrs.total}`),
            ]),
            m('.h-space'),
            m('.incentives-container', [
              m('.incentives-label', 'DONATION INCENTIVES'),
            ]),
          ]),
          m(VideoPlayer, { currentVideo: vnode.attrs.currentVideo }),
        ]),
      ]),
    ]);
  }
}

const nextRuns = (currentRun, allRuns) => {
  if (!currentRun) {
    return allRuns;
  }

  const currentIdx = allRuns.findIndex((run) => (run.id === currentRun.id));

  return allRuns.slice(currentIdx + 1);
};

NodeCG.waitForReplicants(...Object.values(replicants)).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(BreakComponent, {
        currentSong: replicants.currentSong.value,
        total: Math.floor(replicants.total.value),
        countdown: replicants.countdown.value,
        currentVideo: replicants.currentVideo.value,
        nextRuns: nextRuns(replicants.run.value, replicants.runArray.value),
      });
    }
  });
});

Object.values(replicants).forEach((rep) => {
  rep.on('change', () => { m.redraw(); });
});
