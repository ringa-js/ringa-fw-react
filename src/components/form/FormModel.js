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
  getElement(elementId) {
    return this.elements.find(element => element.id === elementId);
  }

  setValue(elementId, value) {
    let element = this.getElement(elementId);

    if (element) {
      try {
        element.value = value;
        return element;
      } catch (error) {
        console.warn(`FormModel: attempted to set value on ${elementId} but received error`, error);
      }
    }

    console.warn(`FormModel ${this.name} does not have an elements with id ${elementId}`);
  }

  clear() {
    this.elements.forEach(element => {
      try {
        if (element.clear) {
          element.clear();
        } else {
          element.value = undefined;
        }
      } catch (error) {
        console.warn(`FormModel: attempted to set value on ${elementId} but received error`, error);
      }
    });
  }
}
