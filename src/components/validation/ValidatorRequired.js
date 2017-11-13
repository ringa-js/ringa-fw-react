import ValidatorBase from './ValidatorBase';

export default class ValidatorRequired extends ValidatorBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, options, values) {
    super(name,values);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  validate(value, i18NModel) {
    this.valid = value !== undefined && value !== null && value !== '';

    if (this.valid) {
      this.message = undefined;
      this.details = undefined;

      return false;
    }

    this.message = i18NModel ? i18NModel.i18n('validator.required') : `${options.name || 'This field'} is required`;
    this.details = {};

    return {
      valid: this.valid,
      message: this.message,
      details: this.details
    };
  }
}