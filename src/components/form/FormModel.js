import {Model} from 'ringa';

export default class FormModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.addProperty('valid', true);
    this.addProperty('elements', []);
    this.addProperty('rerunValidationsOnTouchedElements', false);
    this.addProperty('message');
    this.addProperty('error');
    this.addProperty('invalidReasons');
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get values() {
    let ret = {};

    this.elements.forEach(element => {
      ret[element.id] = element.value;
    });

    return ret;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  setValue(elementId, value) {
    this.elements.forEach(element => {
      if (element.id === elementId) {
        try {
          element.value = value;
        } catch (error) {
          console.warn(`FormModel: attempted to set value on ${elementId} but received error`, error);
        }
      }
    });
  }

  clear() {
    this.elements.forEach(element => {
      try {
        element.value = undefined;
      } catch (error) {
        console.warn(`FormModel: attempted to set value on ${elementId} but received error`, error);
      }
    });
  }
}
