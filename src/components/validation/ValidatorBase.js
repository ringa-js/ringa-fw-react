import {Model} from 'ringa';

export default class ValidatorBase extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);
    
    this.addProperty('options');
    this.addProperty('valid');
    this.addProperty('message');
    this.addProperty('details');
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  validate(value, options) {
    console.warn(`ValidatorBase::validate() should be overridden by ${this.constructor.name}::validate()!`);

    return {
      valid: false,
      message: options.i18n ? options.i18n('invalid') : 'Invalid value',
      details: {}
    };
  }
}