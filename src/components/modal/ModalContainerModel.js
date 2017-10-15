import {Model} from 'ringa';

export default class ModalContainerModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name) {
    super(name);

    this.addProperty('modals', []);
    this.addProperty('blockMouseEvents', false);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  clearSingletons(group = undefined, notify = false) {
    this.modals.concat().forEach((modal, ix) => {
      if ((group === undefined && modal.singleton) || modal.singletonGroup === group) {
        modal.remove();
      }
    });

    if (notify) {
      this.notify('modals');
    }
  }

  checkBlockMouseEvents() {
    this.blockMouseEvents = false;

    this.modals.forEach(modal => {
      if (modal.blockMouseEvents) {
        this.blockMouseEvents = true;
      }
    });
  }

  addModal(modal) {
    if (modal.singleton) {
      this.clearSingletons(modal.singletonGroup);
    }

    this.modals.push(modal);

    this.notify('modals');

    this.checkBlockMouseEvents();
  }

  removeModal(modal) {
    console.log(modal);
    const ix = this.modals.indexOf(modal);

    if (ix !== -1) {
      this.removeModalAt(ix);
    }

    this.notify('modals');
  }

  removeModalAt(ix) {
    this.modals.splice(ix, 1);

    this.notify('modals');

    this.checkBlockMouseEvents();
  }
}
