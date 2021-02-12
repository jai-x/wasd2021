import m from 'mithril';
import gsap from 'gsap';
import { get } from 'lodash';

import '../common.css';
import './break.css';

import StarfallComponent from '../starfall/starfall.js';
import CurrentSongComponent from '../currentSong/currentSong.js';
import VideoPlayer from '../videoPlayer/videoPlayer.js';
import { nextRuns, NextRunsComponent } from '../nextRuns/nextRuns.js';

const replicants = {
  run: NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol'),
  runArray: NodeCG.Replicant('runDataArray', 'nodecg-speedcontrol'),
  currentSong: NodeCG.Replicant('currentSong', 'nodecg-spotify'),
  countdown: NodeCG.Replicant('countdown', 'wasd2021'),
  currentVideo: NodeCG.Replicant('currentVideo', 'wasd2021'),
  total: NodeCG.Replicant('total', 'nodecg-tiltify'),
  challenges: NodeCG.Replicant('challenges', 'nodecg-tiltify'),
};

class Incentive {
  view(vnode) {
    const { name, amount, totalAmountRaised } = vnode.attrs.incentive;
    const [ gameName, incentiveName ] = name.split('-').map(s => s.trim());

    return m('.incentive-container', [
      m('.incentive-game', gameName),
      m('.incentive-name', incentiveName),
      m('.incentive-bar', [
        m('.incentive-progress'),
        m('.incentive-amount', `£${totalAmountRaised} / £${amount}`),
      ]),
    ]);
  }

  onupdate(vnode) {
    const bar = vnode.dom.children[2].children[0];

    const current = Number(vnode.attrs.incentive.totalAmountRaised);
    const max = Number(vnode.attrs.incentive.amount);

    const width = Math.min(((current / max) * 100), 100);

    gsap.to(bar, {
      width: `${width}%`,
      ease: 'expo.out',
      duration: 3,
    });
  }
}

class Incentives {
  view(vnode) {
    return m('.incentives-container', [
      m('.incentives-label', 'DONATION INCENTIVES'),
      m('.incentives-list', ...vnode.attrs.incentives.filter(i => i.active).map((i) => {
        return m(Incentive, { incentive: i, key: i.id });
      })),
    ]);
  }
}

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
            m(NextRunsComponent, { nextRuns: vnode.attrs.nextRuns, key: get(vnode, 'attrs.nextRuns[0].id') })
          ]),
          m('.v-space'),
          m('.right-info', [
            m('.total-container', [
              m('.total-label', 'TOTAL RAISED'),
              m('.total-amount', `£${vnode.attrs.total}`),
            ]),
            m('.h-space'),
            m(Incentives, { incentives: vnode.attrs.incentives }),
          ]),
          m(VideoPlayer, { currentVideo: vnode.attrs.currentVideo }),
        ]),
      ]),
    ]);
  }
}


NodeCG.waitForReplicants(...Object.values(replicants)).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(BreakComponent, {
        currentSong: replicants.currentSong.value,
        total: Math.floor(replicants.total.value),
        countdown: replicants.countdown.value,
        currentVideo: replicants.currentVideo.value,
        nextRuns: nextRuns(replicants.run.value, replicants.runArray.value),
        incentives: replicants.challenges.value,
      });
    }
  });
});

Object.values(replicants).forEach((rep) => {
  rep.on('change', () => { m.redraw(); });
});
