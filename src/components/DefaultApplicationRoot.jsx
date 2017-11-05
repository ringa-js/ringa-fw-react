import React from 'react';
import RingaComponent from './RingaComponent';

import I18NModel from '../models/I18NModel';
import I18NController from '../controllers/I18NController';

import ScreenController from '../controllers/ScreenController';

import {attach, depend, dependency} from 'react-ringa';

import EN from '../assets/i18n/en.json';

class DefaultApplicationRoot extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props, options) {
    super(props);

    this.i18NModel = new I18NModel();
    this.i18NModel.mergeLanguagePack('en', EN);

    attach(this, new ScreenController());
    attach(this, new I18NController(undefined, undefined, this.i18NModel));
  }
}

export default DefaultApplicationRoot;
