import React from 'react';
import RingaComponent from '../RingaComponent';

import highlight from 'highlight.js';
import js from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/sunburst.css';

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
