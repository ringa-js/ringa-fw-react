import {Controller} from 'ringa';
import ScreenModel from '../models/ScreenModel';

/**
 * ScreenController
 */
export default class ScreenController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(options) {
    super('ScreenController', undefined, options);

    this.addModel(new ScreenModel());
  }
}
