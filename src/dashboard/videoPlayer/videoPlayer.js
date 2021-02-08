import m from 'mithril';

import '../common.css';
import './videoPlayer.css';

const currentVideoRep = NodeCG.Replicant('currentVideo', 'wasd2021');
const seVideosRep = NodeCG.Replicant('assets:specialEffectVideos', 'wasd2021');

class VideoPlayerControl {
  view(vnode) {
    if (vnode.attrs.seVideos.length < 1) {
      return m('h1', 'No Uploaded Videos');
    }

    if (!vnode.attrs.currentVideo.src) {
      vnode.attrs.currentVideo.src = vnode.attrs.seVideos[0].url;
    }

    const playing = (vnode.attrs.currentVideo.state === 'playing');

    return m('.video-control-container', [
      m('.video-control-state', vnode.attrs.currentVideo.state),
      m('select.video-control-select.', {
        disabled: playing,
        onchange: (e) => { vnode.attrs.currentVideo.src = e.target.value; },
      }, vnode.attrs.seVideos.map((v) => {
        return m('option', { value: v.url, selected: v.url === vnode.attrs.currentVideo.src }, v.base)
      })),
      m('.video-control-buttons', [
        m('button.video-control-button', {
          disabled: playing,
          onclick: () => { NodeCG.sendMessageToBundle('currentVideo.start', 'wasd2021'); }
        }, 'Start'),
        m('button.video-control-button', {
          disabled: !playing,
          onclick: () => { NodeCG.sendMessageToBundle('currentVideo.stop', 'wasd2021'); }
        },'Stop'),
      ]),
    ]);
  }
}

NodeCG.waitForReplicants(currentVideoRep, seVideosRep).then(() => {
  m.mount(document.body, {
    view: () => {
      return m(VideoPlayerControl, {
        currentVideo: currentVideoRep.value,
        seVideos: seVideosRep.value,
      });
    }
  });
});

currentVideoRep.on('change', () => { m.redraw(); });
seVideosRep.on('change', () => { m.redraw(); });
