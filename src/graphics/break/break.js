import m from 'mithril';
import gsap from 'gsap';

import '../common.css';
import './break.css';

import StarfallComponent from '../starfall/starfall.js';
import CurrentSongComponent from '../currentSong/currentSong.js';

const runRep = NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const totalRep = NodeCG.Replicant('total', 'nodecg-tiltify');
const currentSongRep = NodeCG.Replicant('currentSong', 'nodecg-spotify');
const countdownRep = NodeCG.Replicant('countdown', 'wasd2021');
const currentVideoRep = NodeCG.Replicant('currentVideo', 'wasd2021');

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

NodeCG.waitForReplicants(runRep, totalRep, currentSongRep, countdownRep, currentVideoRep).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(BreakComponent, {
        currentSong: currentSongRep.value,
        total: Math.floor(totalRep.value),
        countdown: countdownRep.value,
        currentVideo: currentVideoRep.value,
      });
    }
  });
});


runRep.on('change', () => { m.redraw(); });
totalRep.on('change', () => { m.redraw(); });
currentSongRep.on('change', () => { m.redraw(); });
countdownRep.on('change', () => { m.redraw(); });
currentVideoRep.on('change', () => { m.redraw(); });
