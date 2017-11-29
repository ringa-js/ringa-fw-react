import React from 'react';
import ModalHeader from './ModalHeader.jsx';
import PositionableComponent from '../PositionableComponent';
import I18NModel from '../../models/I18NModel';

import {watch, depend, dependency} from 'react-ringa';

import classnames from 'classnames';

export default class Modal extends PositionableComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    watch(this, props.modal);

    if (props.modal.$ringaAlternateParentComponent) {
      this.$ringaAlternateParentComponent = props.modal.$ringaAlternateParentComponent;
    }
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  set positionStyle(value) {
    super.positionStyle = this.props.modal.style = value;
  }

  get positionStyle() {
    return this._positionStyle;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    let {modal} = this.props;

    let cn = this.calcClassnames('modal', modal.classes);

    let children;

    if (!modal.renderer) {
      console.error('Modal::render(): modalModel.renderer is undefined');
    } else if (modal.renderer.prototype instanceof React.Component) {
      let Renderer = modal.renderer;

      children = <Renderer {...modal.rendererProps} />;
    } else if (typeof modal.renderer === 'function') {
      children = modal.renderer(this);
    }

    let contentsCN = classnames('modal-contents', {
      'show-header': modal.showHeader
    });

    return <div className={cn}
                style={this.positionStyle}
                ref="positionable"
                id={this.id}>
      {modal.showHeader ? <ModalHeader modalModel={modal} /> : undefined}
      <div className={contentsCN}>
        {children}
      </div>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  getPositionableModel() {
    return this.props.modal;
  }
}
