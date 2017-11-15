import React from 'react';
import {ScreenModel, RingaComponent} from '../../../src/index';

import {dependency} from 'react-ringa';

export default class ScreenExample1 extends RingaComponent {
  constructor() {
    super();

    this.depend(dependency(ScreenModel, 'curBreakpointIx'));
  }

  render() {
    let {curBreakpointIx} = this.state;

    return <div>
      <div>Current Breakpoint Index is: {curBreakpointIx}</div>

      {curBreakpointIx === 0 ? <div>Tiny Mobile Device</div> : undefined}
      {curBreakpointIx === 1 ? <div>Mobile Device</div> : undefined}
      {curBreakpointIx === 2 ? <div>iPad-Mini-like Device</div> : undefined}
      {curBreakpointIx === 3 ? <div>iPad-like Device</div> : undefined}
      {curBreakpointIx === 4 ? <div>Desktop Device</div> : undefined}
    </div>;
  }
}
