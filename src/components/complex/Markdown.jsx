import React from 'react';
import RingaComponent from '../RingaComponent';

import showdown from 'showdown';

let converter = new showdown.Converter();

class Markdown extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {markdown} = this.props;

    return <div className={this.calcClassnames("markdown")} dangerouslySetInnerHTML={{__html: converter.makeHtml(markdown)}} />
  }
}

export default Markdown;
