import React from 'react';

import {I18NSwitcher, RingaComponent} from '../../../src/index';

export default class I18NExample4 extends RingaComponent {
  constructor() {
    super();
  }

  render() {
    // Setting white to true (default) makes the switcher pretty on a dark background.
    return <I18NSwitcher white={false} />;
  }
}
