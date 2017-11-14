import React from 'react';
import RingaComponent from '../RingaComponent';

export default class BrowserCheck extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.isIE10 = false;
    /*@cc_on
        if (/^10/.test(@_jscript_version)) {
            this.isIE10 = true;
        }
    @*/
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    if (this.isIE10) {
      return <div className="ie-10-warning">
        <h1>Browser not Supported</h1>
        <p><strong>You are using a browser that is unsupported or not safe.</strong></p>
        <p>We recommend using <a href="https://www.google.com/chrome/browser/desktop/index.html">Chrome</a> or <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>.</p>
        <p>Additionally you can also use the latest Microsoft Browsers <a href="https://www.microsoft.com/en-us/download/internet-explorer.aspx">IE 11 or Edge</a>.</p>
      </div>;
    }

    return this.props.children;
  }
}
