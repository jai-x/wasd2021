import m from 'mithril';
import { get } from 'lodash';

import '../common.css'
import './couch.css';

class CouchRow {
  view(vnode) {
    const { name, pronouns } = vnode.attrs;

    if (!name) {
      return null;
    }

    return m('.couch-row', [
      m('.couch-person', name),
      (pronouns) ? m('.couch-pronouns', pronouns) : null,
    ]);
  }
}

export default class CouchComponent {
  view(vnode) {
    const couch = [
      { name: get(vnode, 'attrs.customData.c1Name'), pronouns: get(vnode, 'attrs.customData.c1Pronouns') },
      { name: get(vnode, 'attrs.customData.c2Name'), pronouns: get(vnode, 'attrs.customData.c2Pronouns') },
    ];

    if (!(couch[0].name || couch[1].name)) {
      return null;
    }

    return m('.couch-container', [
      m('.couch-label', 'COUCH'),
      ...couch.map((c) => m(CouchRow, c)),
    ]);
  }
}
