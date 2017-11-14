import React from 'react';
import RingaComponent from './RingaComponent';

import I18NModel from '../models/I18NModel';
import I18NController from '../controllers/I18NController';

import ScreenController from '../controllers/ScreenController';
import BrowserCheck from './complex/BrowserCheck';

import EN from '../assets/i18n/en/pack.json';
import SV from '../assets/i18n/sv/pack.json';

export default class DefaultApplicationRoot extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.i18NModel = new I18NModel();

    this.i18NModel.mergeLanguagePack('en', EN);
    this.i18NModel.mergeLanguagePack('sv', SV);

    this.attach(new ScreenController());
    this.attach(new I18NController(undefined, undefined, this.i18NModel));
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  render(children) {
    return <BrowserCheck>{children}</BrowserCheck>;
  }
}
