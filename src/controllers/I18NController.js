import I18NModel from '../models/I18NModel';
import {Controller} from 'ringa';

/**
 * APIController
 */
export default class I18NController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, bus, i18NModel, options) {
    super(name, bus, i18NModel, options);

    this.addModel(i18NModel || new I18NModel());
  }
}
