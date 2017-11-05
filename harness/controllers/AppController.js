import {Controller} from 'ringa';

import AppModel from '../models/AppModel';

export default class AppController extends Controller {
  /**
   * Constructs the AppController. Constructed and attached in App.js.
   */
  constructor() {
    super('AppController');

    this.addModel(new AppModel());
  }
}
