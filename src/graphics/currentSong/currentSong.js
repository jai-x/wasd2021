import m from 'mithril';
import gsap from 'gsap';

import '../common.css';
import './currentSong.css';

class ScrollText {
  oninit(vnode) {
    this.prevText = vnode.attrs.txt
  }

  view(vnode) {
    return m(vnode.attrs.cls, vnode.attrs.txt);
  }

  onupdate(vnode) {
    if (this.prevText === vnode.attrs.txt) {
      return;
    } else {
      this.prevText = vnode.attrs.txt;
    }

    if (this.scroll) {
      this.scroll.kill();
      gsap.set(vnode.dom, { clearProps: 'transform', opacity: 1 });
    }

    const parentPadding = 2 * parseInt(window.getComputedStyle(vnode.dom.parentElement).paddingLeft, 10);
    const parentWidth = vnode.dom.parentElement.clientWidth - parentPadding;

    const textWidth = vnode.dom.clientWidth;

    if (parentWidth >= textWidth) {
      return;
    }

    const diff = textWidth - parentWidth;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to({}, 2, {});
    tl.to(vnode.dom, { x: `-=${diff}`, ease: 'none', duration: diff / 10,});
    tl.to(vnode.dom, { opacity: 0 });
    tl.set(vnode.dom, { clearProps: 'transform', opacity: 1 });

    this.scroll = tl;
  }
}

export default class CurrentSongComponent {
  view(vnode) {
    const { name, artist, albumArt } = vnode.attrs;

    return m('.current-song-container', [
      m('.current-song-art-container',[
        (albumArt) ? m('img.current-song-art', { src: albumArt }) : null,
      ]),
      m('.current-song-details', [
        m('.current-song-name', name),
        m(ScrollText, { cls: '.current-song-artist', txt: artist }),
        m('.current-song-details-clip .left'),
        m('.current-song-details-clip .right'),
      ]),
    ]);
  }
}
