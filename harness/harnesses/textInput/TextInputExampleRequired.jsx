import React from 'react';
import {TextInput, RingaComponent} from '../../../src/index';

export default class TextInputExampleRequired extends RingaComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <TextInput required={true} placeholder="Empty data will be invalid on blur..." />;
  }
}
