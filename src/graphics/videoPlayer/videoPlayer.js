import m from 'mithril';
import gsap from 'gsap';

import '../common.css';
import './videoPlayer.css';

export default class VideoPlayer {
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
