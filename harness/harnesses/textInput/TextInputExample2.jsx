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

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {textModel} = this.state;

    return <div>
      <TextInput model={textModel} modelField="text" />
      Looks like the text is: {textModel.text}
    </div>;
  }
}

export default TextInputExample2;
