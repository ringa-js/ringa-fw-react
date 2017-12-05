import ValidatorBase from './ValidatorBase';
import {EMAIL_REGEX} from './regex';

export default class ValidatorEmail extends ValidatorBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, options, values) {
    super(name, values);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  validate(value, i18NModel) {
    this.valid = !value || EMAIL_REGEX.test(value);

    if (this.valid) {
      this.message = undefined;
      this.details = undefined;

      return false;
    }

    return {
      valid: this.valid,
      message: this.message = i18NModel ? i18NModel.i18n('ringa-fw.validator.emailInvalid') : 'Invalid email provided',
      details: this.details = {}
    };
  }
}