import React, { Component } from 'react';

import {Dropdown,
        RingaComponent} from '../../src/index';

import {alphaSortKey} from 'ringa-fw-core';

import {routeMap, routeMapInverted} from '../routes';
import {depend, dependency} from 'react-ringa';

import './Header.scss';

import LOGO from '../images/ringa.png';

class Header extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render(props) {
    const {location} = this.props;
    const options = [];

    let selectedItem;
    for (let key in routeMap) {
      let o = {
        value: routeMap[key],
        label: key
      };

      if (o.value == location.pathname) {
        selectedItem = o;
      }

      options.push(o);
    }

    options.sort(alphaSortKey('label'));

    return <header className="app-header">
        <div className="header-inner">
          <div className="flex-start">
            <div className="title">
              <img src={LOGO} width={120} height={21} />
              <div className="subtitle">React Framework</div>
            </div>
          </div>
          <div className="links flex-end">
            <Dropdown items={options}
                      onChange={this.links_changeHandler}
                      value={selectedItem} />
          </div>
        </div>
      </header>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  links_changeHandler(route) {
    this.props.history.push(route.value);
  }
}

export default Header;
