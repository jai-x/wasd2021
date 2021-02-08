import m from 'mithril';
import gsap from 'gsap';

import '../common.css';
import './break.css';

import StarfallComponent from '../starfall/starfall.js';
import CurrentSongComponent from '../currentSong/currentSong.js';

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
          m(VideoPlayer, { currentVideo: vnode.attrs.currentVideo })
        ]),
      ]),
    ]);
  }
}

class VideoPlayer {
  view(vnode) {
    return m('.video-container', [
      m('video.video-player', { src: vnode.attrs.currentVideo.src }),
    ]);
  }

  oncreate(vnode) {
    gsap.set(vnode.dom, { opacity: 0 });

    const container = vnode.dom;
    const video = vnode.dom.children[0];

    const playerPlay = () => {
      vnode.attrs.currentVideo.state = 'playing';
      gsap.to(container, { opacity: 1 });
      video.load();
      video.play();
    };

    const playerStop = () => {
      vnode.attrs.currentVideo.state = 'stopped';
      video.pause();
      gsap.to(container, { opacity: 0 });
    };

    // set state on end
    video.onended = () => { playerStop() };

    // catch funky state
    switch (vnode.attrs.currentVideo.state) {
      case 'playing':
        playerPlay();
        break;
      case 'stopped':
        playerStop();
        break;
    }

    // bind message listeners
    nodecg.listenFor('currentVideo.start', 'wasd2021', () => { playerPlay() });
    nodecg.listenFor('currentVideo.stop', 'wasd2021', () => { playerStop() });
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
      });
    }
  });
});

Object.values(replicants).forEach((rep) => {
  rep.on('change', () => { m.redraw(); });
});
