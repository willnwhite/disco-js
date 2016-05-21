'use babel';

import DiscoJsView from './disco-js-view';
import { CompositeDisposable } from 'atom';

export default {

  discoJsView: null,
  rightPanel: null,
  subscriptions: null,

  activate(state) {
    this.discoJsView = new DiscoJsView(state.discoJsViewState);
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.discoJsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'disco-js:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.rightPanel.destroy();
    this.subscriptions.dispose();
    this.discoJsView.destroy();
  },

  serialize() {
    return {
      discoJsViewState: this.discoJsView.serialize()
    };
  },

  toggle() {
    console.log('DiscoJs was toggled!');
    return (
      this.rightPanel.isVisible() ?
      this.rightPanel.hide() :
      this.rightPanel.show()
    );
  }

};
