import ValidatorBase from './ValidatorBase';

export default class ValidatorFunction extends ValidatorBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(validatorFunction, name, options = {}, values) {
    super(name, values);

    this.options = options;

    this.validatorFunction = validatorFunction;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  validate(value, i18NModel) {

    let message = this.validatorFunction(value, i18NModel, this);

    this.valid = !message;

    if (this.valid) {
      return false;
    }

    return {
      valid: this.valid,
      message
    };
  }
}