import m from 'mithril';
import gsap from 'gsap';

import '../common.css';
import './nextRuns.css';

export const nextRuns = (currentRun, allRuns) => {
  if (!currentRun) {
    return allRuns;
  }

  const currentIdx = allRuns.findIndex((run) => (run.id === currentRun.id));

  return allRuns.slice(currentIdx + 1);
};

export class NextRunsComponent {
  view(vnode) {
    return m('.next-runs-container', [
      m('.next-runs-label','SCHEDULE'),
      (vnode.attrs.nextRuns.length === 0) ? m('.next-runs-label', 'NO RUNS!') : null,
      ...vnode.attrs.nextRuns.map(run => m(NextRun, { run: run })),
    ]);
  }

  onremove(vnode) {
    if (this.anim) {
      this.anim.kill();
    }
  }

  oncreate(vnode) {
    if (this.anim) {
      this.anim.kill();
    }

    if (vnode.attrs.nextRuns.length === 0) {
      return;
    }

    const wasdPink = '#FF71E6';

    const items = Array.from(vnode.dom.children).slice(1);

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 30 });

    tl.to(items, {
      duration: 0.5,
      backgroundColor: wasdPink,
      ease: 'circ.inOut',
      stagger: {
        each: 0.05,
        from: 'start',
        yoyo: true,
        repeat: 1,
      },
    });

    this.anim = tl;
  }
}

class NextRun {
  view(vnode) {
    return m('.next-run', [
      m('.next-run-game', vnode.attrs.run.game),
      m('.next-run-details', [
        m('.next-run-category', vnode.attrs.run.category),
        m('.next-run-runner', vnode.attrs.run.teams[0].players.map(p => p.name).join(', ')),
      ]),
    ]);
  }
}
