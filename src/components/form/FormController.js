import {Controller} from 'ringa';

import FormModel from './FormModel';

export default class FormController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(formModel, name, options) {
    super(formModel, name, options);

    this.addModel(formModel || new FormModel());

    this.addListener('registerFormElement', (formModel, element) => {
      if (formModel.elements.indexOf(element) !== -1) {
        console.error('Attempting to add the same element instance twice! This should never happen: ', element);
      }

      formModel.elements.push(element);

      if (element.id) {
        formModel[element.id] = element;
      }
    });

    this.addListener('unregisterFormElement', (formModel, element) => {
      let ix = formModel.elements.indexOf(element);

      if (ix !== -1) {
        formModel.elements.splice(ix, 1);

        if (element.id) {
          delete formModel[element.id];
        }
      }
    });

    this.addListener('unregisterAll', (formModel) => {
      formModel.elements = [];
    });

    this.addListener('validChanged', (formModel, element, invalidReasons, valid) => {
      formModel.valid = true;

      formModel.elements.forEach(element => {
        formModel.valid = formModel.valid && element.valid;
      });
    });
  }
}