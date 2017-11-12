import React from 'react';
import RingaComponent from '../RingaComponent';

import highlight from 'highlight.js/lib/highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

class Code extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDidMount() {
    highlight.registerLanguage('javascript', javascript);

    highlight.highlightBlock(this.refs.code);
  }

  render() {
    const {code} = this.props;

    return <div className={this.calcClassnames("code")}>
      <pre><code ref="code">{code}</code></pre>
    </div>;
  }
}

export default Code;
