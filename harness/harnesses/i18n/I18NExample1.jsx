import React from 'react';
import {RingaComponent} from '../../../src/index';

class I18NExample1 extends RingaComponent {
  constructor() {
    super();
  }

  render() {
    return <div>
      See 'Code' for example of how to access the default I18NModel used in your application. In most cases you
      will only use one I18NModel instance in your entire application, although using the Ringa tree structure you
      might want to provide more than one in different contexts.
    </div>;
  }
}

export default I18NExample1;
