import React from 'react';
import RingaComponent from './RingaComponent';

import BodyClassName from 'react-body-classname';

import I18NModel from '../models/I18NModel';
import I18NController from '../controllers/I18NController';

import ScreenController from '../controllers/ScreenController';
import BrowserCheck from './complex/BrowserCheck';

import Theme from './containers/Theme';
import OverlayContainer from './overlay/OverlayContainer';
import ModalContainer from './modal/ModalContainer';
import TooltipContainer from './tooltip/TooltipContainer';
import DebugInspector from './debugInspector/DebugInspector';

import EN from '../assets/i18n/en/pack.json';
import SV from '../assets/i18n/sv/pack.json';

export default class DefaultApplicationRoot extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props, options = {}) {
    super(props);

    this.options = options;

    if (!options.disableDefaultI18N) {
      this.i18NModel = new I18NModel();

      this.i18NModel.mergeLanguagePack('en', EN);
      this.i18NModel.mergeLanguagePack('sv', SV);

      this.attach(new I18NController(undefined, undefined, this.i18NModel));
    }

    if (!options.disableScreenController) {
      this.attach(new ScreenController());
    }
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  render(children) {
    const {bodyClasses = '', theme} = this.props;

    return <BodyClassName className={bodyClasses}>
      <BrowserCheck>
        <Theme classes="fill" theme={theme}>
          <div className="fill">
            <OverlayContainer global={true} classes="fill">
              <ModalContainer global={true} classes="fill no-scroll">
                {children}
                <DebugInspector />
              </ModalContainer>
            </OverlayContainer>
            <TooltipContainer />
          </div>
        </Theme>
      </BrowserCheck>
    </BodyClassName>;
  }
}
