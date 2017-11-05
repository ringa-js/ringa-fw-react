import ValidatorBase from './ValidatorBase';
import {EMAIL_REGEX} from './regex';

export default class ValidatorEmail extends ValidatorBase {
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
    this.valid = !value || EMAIL_REGEX.test(value);

    if (this.valid) {
      this.message = undefined;
      this.details = undefined;

      return false;
    }

    return {
      valid: this.valid,
      message: this.message = options.i18n ? options.i18n('invalidEmail') : 'Invalid email provided',
      details: this.details = {}
    };
  }
}