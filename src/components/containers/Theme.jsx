import React from 'react';
import RingaComponent from '../RingaComponent';

import {Controller, Model} from 'ringa';
import {depend, dependency, attach} from 'react-ringa';

export class ThemeController extends Controller {
  constructor(name, options) {
    super(name, options);
  }
}

export const ThemeModel = Model.construct('ThemeModel', [{
  name: 'theme',
  default: 'classic'
}]);

export default class Theme extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.themeController = new ThemeController();

    this.themeController.addModel(new ThemeModel());

    attach(this, this.themeController);
    depend(this, dependency(ThemeModel, 'theme'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    let {children, theme} = this.props;

    // Props first, then the Model
    theme = theme || this.state.theme;

    return <div className={this.calcClassnames('theme', theme)}>{children}</div>;
  }
}
