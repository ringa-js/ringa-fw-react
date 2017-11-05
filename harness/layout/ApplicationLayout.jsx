import React, { Component } from 'react';

import './ApplicationLayout.scss';

import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import AppController from '../controllers/AppController';

import {Route, Redirect} from 'react-router-dom';

import Home from '../Home';

import ListHarness from '../harnesses/list/ListHarness';

import {TooltipContainer,
        OverlayContainer,
        ModalContainer,
        DefaultApplicationRoot} from '../../src/index';

import {attach} from 'react-ringa';

export default class ApplicationLayout extends DefaultApplicationRoot {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    attach(this, new AppController());
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <Body>
      <div className="fill">
        <OverlayContainer global={true} classes="fill">
          <ModalContainer global={true} classes="fill">
            <Header {...this.props} />
            <Route path="/list" component={ListHarness} />
            <Route path="/home" component={Home} />
            <Redirect from="/" to="/home" />
            <Footer />
          </ModalContainer>
        </OverlayContainer>
        <TooltipContainer />
      </div>
    </Body>;
  }
}
