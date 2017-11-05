import React from 'react';
import RingaComponent from '../src/components/RingaComponent';
import Markdown from '../src/components/complex/Markdown';

import './Home.scss';
import HOME_MD from './Home.md';

export default class Home extends RingaComponent {
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
    let cn = this.calcClassnames('home');

    return <div className={cn}>
      <div className="left-column"></div>
      <div className="right-column">
        <Markdown markdown={HOME_MD} />
      </div>
    </div>;
  }
}
