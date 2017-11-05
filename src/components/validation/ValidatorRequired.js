import ValidatorBase from './ValidatorBase';

export default class ValidatorRequired extends ValidatorBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name,values);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  validate(value, options = {}) {
    this.valid = value !== undefined && value !== null && value !== '';

    if (this.valid) {
      this.message = undefined;
      this.details = undefined;

      return false;
    }

    this.message = options.i18n ? options.i18n('required') : `${options.name || 'This field'} is required`;
    this.details = {};

    return {
      valid: this.valid,
      message: this.message,
      details: this.details
    };
  }
}