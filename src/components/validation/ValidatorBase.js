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
  validate(value, options, i18NModel) {
    console.warn(`ValidatorBase::validate() should be overridden by ${this.constructor.name}::validate()!`);

    return {
      valid: false,
      message: i18NModel.i18n ? i18NModel.i18n('invalid') : 'Invalid value',
      details: {}
    };
  }
}