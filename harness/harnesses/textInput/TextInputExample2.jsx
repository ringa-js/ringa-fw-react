import React from 'react';

import {Model} from 'ringa';
import {watch} from 'react-ringa';

import {TextInput, RingaComponent} from '../../../src/index';

const TextModel = Model.construct('TextModel', ['text']);

class TextInputExample2 extends RingaComponent {
  constructor() {
    super();

    watch(this, new TextModel(), ['text']);
  }

  render() {
    const {textModel} = this.state;

    return <div>
      <TextInput model={textModel} modelField="text" placeholder="Data will automatically set the model..." />
      Looks like the text is: {textModel.text}
    </div>;
  }
}

export default TextInputExample2;
