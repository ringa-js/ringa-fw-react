import {Controller} from 'ringa';

import FormModel from './FormModel';

export default class FormController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(formModel, name, options) {
    super(formModel, name, options);

    this.addModel(formModel || (formModel = new FormModel()));

    formModel.addEventListener('forceValidate', () => {
      this.validate(formModel);
    });

    this.addListener('registerFormElement', (formModel, element) => {
      if (formModel.elements.indexOf(element) !== -1) {
        console.error('Attempting to add the same element instance twice! This should never happen: ', element);
      }

      formModel.elements.push(element);

      if (element.id) {
        formModel[element.id] = element;
      }

      formModel.valid = formModel.valid && element.valid;
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

    this.addListener('validChanged', (formModel, element, valid, invalidReasons) => {
      this.validate(formModel);
    });

    this.addListener('valueChanged', (formModel) => {
      if (formModel.rerunValidationsOnTouchedElements) {
        formModel.elements.forEach(element => {
          if (element.value) {
            element.validate(element.value);
          }
        });
      }
    });
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  validate(formModel) {
    formModel.valid = true;
    formModel.invalidReasons = [];

    formModel.elements.forEach(element => {
      if (element.revalidate && typeof element.revalidate === 'function') {
        element.revalidate();
      }

      formModel.valid = formModel.valid && element.valid;

      if (element.invalidReasons) {
        formModel.invalidReasons = formModel.invalidReasons.concat(element.invalidReasons);
      }
    });
  }
}
