import ValidatorBase from './ValidatorBase';
import {EMAIL_REGEX} from './regex';

export default class ValidatorLength extends ValidatorBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name,values);

    this.addProperty('min', 0);
    this.addProperty('max', Number.MAX_SAFE_INTEGER);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  validate(value, options = {}, i18NModel) {
    if (value && value.length < this.min) {
      return {
        valid: this.valid = false,
        message: this.message = i18NModel.i18n ? i18NModel.i18n('tooShort') : `Text must be at least ${this.min} characters.`,
        details: this.details = {}
      };
    } else if (value && value.length > this.max) {
      return {
        valid: this.valid = false,
        message: this.message = i18NModel.i18n ? i18NModel.i18n('tooLong') : `Text must be at most ${this.max} characters.`,
        details: this.details = {}
      };
    }

    this.valid = true;
    this.message = undefined;
    this.details = undefined;

    return false;
  }
}