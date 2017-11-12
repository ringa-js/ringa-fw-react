import React from 'react';

import {dependency} from 'react-ringa';

import {I18NModel, RingaComponent} from '../../../src/index';

export default class I18NExample2 extends RingaComponent {
  constructor() {
    super();

    this.depend(dependency(I18NModel, 'language'));
  }

  render() {
    const {i18NModel} = this.state;

    return <div>
      {i18NModel.i18n('i18n.example1')}
    </div>;
  }
}
