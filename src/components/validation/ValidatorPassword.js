import ValidatorBase from './ValidatorBase';

import owasp from 'owasp-password-strength-test';

export default class ValidatorPassword extends ValidatorBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, options = {}, owaspConfig = {allowPassphrases: false,
      maxLength: 14,
      minLength: 8,
      minOptionalTestsToPass: 2}, values) {
    super(name, values);

    owasp.config(this.owaspConfig = owaspConfig);
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  validate(value, i18NModel) {
    /*
        var result = {
          errors              : [],
          failedTests         : [],
          passedTests         : [],
          requiredTestErrors  : [],
          optionalTestErrors  : [],
          isPassphrase        : false,
          strong              : true,
          optionalTestsPassed : 0,
        };
     */
    let owaspResult = value ? owasp.test(value) : {
      strong: false
    };

    this.valid = owaspResult.strong;

    if (this.valid) {
      this.message = undefined;
      this.details = undefined;

      return false;
    }

    return {
      valid: this.valid,
      message: this.message = i18NModel ? i18NModel.i18n('ringa-fw.validator.passwordInvalid', this.owaspConfig) : 'Invalid password provided, does not pass strength test',
      details: this.details = {}
    };
  }
}