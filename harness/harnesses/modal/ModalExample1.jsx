import React from 'react';
import { Button, Modal } from '../../../src/index';
import RingaComponent from "../../../src/components/RingaComponent";

class ExampleModal extends RingaComponent {
  render() {
    const {text} = this.props;

    return <div>{text}</div>;
  }
}

class ModalExample1 extends RingaComponent {
  constructor() {
    super();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <Button onClick={this.button_onClickHandler}>Open Modal</Button>;
  }

  button_onClickHandler() {
    Modal.show({
      title: 'Example 1',
      renderer: ExampleModal,
      rendererProps: {
        text: 'This is some text passed as props'
      },
      position: 'centered',
      draggable: true,
      width: 300,
      height: 100
    });
  }
}

export default ModalExample1;
