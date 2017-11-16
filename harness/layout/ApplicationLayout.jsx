import React, { Component } from 'react';

import './ApplicationLayout.scss';

import Header from './Header';
import Footer from './Footer';
import AppController from '../controllers/AppController';

import {Route} from 'react-router-dom';

import Home from '../Home';

import ListHarness from '../harnesses/list/ListHarness';
import TextInputHarness from '../harnesses/textInput/TextInputHarness';
import FormHarness from '../harnesses/form/FormHarness';
import TabNavigatorHarness from '../harnesses/tabNavigator/TabNavigatorHarness';
import ScrollContainerHarness from '../harnesses/scrollContainer/ScrollContainerHarness';
import ThemeHarness from '../harnesses/theme/ThemeHarness';
import NumberInputHarness from '../harnesses/numberInput/NumberInputHarness';
import CheckboxHarness from '../harnesses/checkbox/CheckboxHarness';
import RadioButtonHarness from '../harnesses/radioButton/RadioButtonHarness';
import I18NHarness from '../harnesses/i18n/I18NHarness';
import ScreenHarness from '../harnesses/screen/ScreenHarness';
import DebugInspectorHarness from '../harnesses/debugInspector/DebugInspectorHarness';

import {DefaultApplicationRoot} from '../../src/index';

import {setup as setupI18N} from '../i18n.js';

export default class ApplicationLayout extends DefaultApplicationRoot {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    setupI18N(this.i18NModel);

    this.attach(new AppController());
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return super.render(<div className="fill">
      <Header {...this.props} />
      <Route exact path="/" component={Home} />
      <Route path="/list" component={ListHarness} />
      <Route path="/textInput" component={TextInputHarness} />
      <Route path="/form" component={FormHarness} />
      <Route path="/tabNavigator" component={TabNavigatorHarness} />
      <Route path="/scrollContainer" component={ScrollContainerHarness} />
      <Route path="/theme" component={ThemeHarness} />
      <Route path="/numberInput" component={NumberInputHarness} />
      <Route path="/checkbox" component={CheckboxHarness} />
      <Route path="/radioButton" component={RadioButtonHarness} />
      <Route path="/i18n" component={I18NHarness} />
      <Route path="/screen" component={ScreenHarness} />
      <Route path="/debugInspector" component={DebugInspectorHarness} />
      <Footer />
    </div>);
  }
}
