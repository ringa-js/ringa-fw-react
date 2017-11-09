import React, { Component } from 'react';

import './ApplicationLayout.scss';

import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import AppController from '../controllers/AppController';

import {Route, Redirect} from 'react-router-dom';

import Home from '../Home';

import ListHarness from '../harnesses/list/ListHarness';
import TextInputHarness from '../harnesses/textInput/TextInputHarness';
import FormHarness from '../harnesses/form/FormHarness';
import TabNavigatorHarness from '../harnesses/tabNavigator/TabNavigatorHarness';
import ScrollContainerHarness from '../harnesses/scrollContainer/ScrollContainerHarness';
import ThemeHarness from '../harnesses/theme/ThemeHarness';

import Theme from '../../src/components/containers/Theme';

import {TooltipContainer,
        OverlayContainer,
        ModalContainer,
        DefaultApplicationRoot} from '../../src/index';

import {attach} from 'react-ringa';

import EN from '../assets/en.json';

export default class ApplicationLayout extends DefaultApplicationRoot {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.i18NModel.mergeLanguagePack('en', EN);

    attach(this, new AppController());
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <Body>
      <div classes="fill">
        <Theme classes="fill">
          <OverlayContainer global={true} classes="fill">
            <ModalContainer global={true} classes="fill">
              <Header {...this.props} />
              <Route exact path="/" component={Home} />
              <Route path="/list" component={ListHarness} />
              <Route path="/textInput" component={TextInputHarness} />
              <Route path="/form" component={FormHarness} />
              <Route path="/tabNavigator" component={TabNavigatorHarness} />
              <Route path="/scrollContainer" component={ScrollContainerHarness} />
              <Route path="/theme" component={ThemeHarness} />
              <Footer />
            </ModalContainer>
          </OverlayContainer>
          <TooltipContainer />
        </Theme>
      </div>
    </Body>;
  }
}
