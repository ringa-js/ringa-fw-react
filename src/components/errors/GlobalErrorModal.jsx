import React from 'react';
import Container from '../containers/Container';
import ScreenModel from '../../models/ScreenModel';
import ModalToggleContainer from '../modal/ModalToggleContainer';
import I18NModel from '../../models/I18NModel';
import Button from '../../components/input/Button';

import {Controller, Model} from 'ringa';
import {depend, dependency, attach} from 'react-ringa';

import moment from 'moment';

function copyTextToClipboard(text) {
  let textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    let successful = document.execCommand('copy');
    let msg = successful ? 'successful' : 'unsuccessful';
  } catch (err) {
  }

  document.body.removeChild(textArea);
}

const GlobalErrorModel = Model.construct('GlobalErrorModel', [{
  name: 'errors',
  default: []
}]);

export class GlobalErrorController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super('globalErrorController', document);

    this.addModel(new GlobalErrorModel());

    this.addListener(Controller.THREAD_FAIL_ERROR, (globalErrorModel, error, kill) => {
      if (!kill) {
        return;
      }

      while (error.error) {
        error = error.error;
      }

      globalErrorModel.errors.push({
        message: error.message || `${error.request.url} ${error.request.body || 'NO BODY'} ${error.response.response}`,
        source: error.source,
        lineNumber: error.lineNumber,
        columnNumber: error.columnNumber,
        stack: error.stack
      });

      if (globalErrorModel.errors.length > 10) {
        globalErrorModel.errors.shift();
      }

      globalErrorModel.notify('errors');
    });

    this.addListener('globalError', (globalErrorModel, message) => {
      globalErrorModel.errors.push({
        message: message.toString()
      });

      if (globalErrorModel.errors.length > 10) {
        globalErrorModel.errors.shift();
      }

      globalErrorModel.notify('errors');
    });
  }
}

export default class GlobalErrorModal extends Container {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    window.onpopstate = this.browserBack.bind(this);

    window.onerror = (messageOrEvent, source, lineno, colno, error) => {
      let obj = {
        message: messageOrEvent,
        source: source,
        lineNumber: lineno,
        columnNumber: colno,
        stack: error ? error.stack : undefined
      };

      this.state.globalErrorModel.errors.push(obj);
      this.state.globalErrorModel.notify('errors');

      if (window.Bugsnag) {
        window.Bugsnag.notify("Uncaught Error", obj);
      }
    };

    attach(this, new GlobalErrorController(), {
      bus: document
    });

    depend(this, [
      dependency(ScreenModel, 'curBreakpointIx'),
      dependency(I18NModel, 'language'),
      dependency(GlobalErrorModel, 'errors')
    ]);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {classes} = this.props;
    const {curBreakpointIx, i18NModel, errors, language} = this.state;

    return <div className={this.calcClassnames('global-error-container', classes)}>
      <ModalToggleContainer show={errors.length}
                            maxWidth={curBreakpointIx < 2 ? 320 : 250}
                            showHeader={false}
                            classes="global-error-handler-modal"
                            onClose={this.modal_onCloseHandler}
                            blockMouseEvents={true}
                            position="centered">
        <div className="detail">{i18NModel.i18n('errors.modal.detail')}</div>
        {__DEV__ ? <div className="errors">{errors.map(error => <div className="error">{error.message}</div>)}</div> : undefined}
        <Button label={i18NModel.i18n('errors.modal.copyToClipboard')}
                onClick={this.copyToClipboard_onClickHandler}/>
        <Button label={i18NModel.i18n('errors.modal.continue')}
                classes="red"
                onClick={this.continue_onClickHandler}/>
      </ModalToggleContainer>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  reset() {
    const {globalErrorModel} = this.state;

    globalErrorModel.errors = [];
  }

  browserBack() {
    this.reset();
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  copyToClipboard_onClickHandler() {
    const {errors, loggedIn, bpAuthModel} = this.state;

    copyTextToClipboard(JSON.stringify({
      url: window.location.href,
      version: __BUILD__.package.version,
      date: moment(new Date()).format('LLL'),
      session: bpAuthModel.session,
      token: bpAuthModel.tokenSession,
      errors
    }, null, 2));
  }

  modal_onCloseHandler() {
    this.state.globalErrorModel.errors = [];
  }

  continue_onClickHandler() {
    this.state.globalErrorModel.errors = [];
  }

  home_onClickHandler() {
    window.location = '/';
  }
}
