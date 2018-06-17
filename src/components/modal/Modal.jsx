import React from 'react';
import ModalHeader from './ModalHeader.jsx';
import PositionableComponent from '../PositionableComponent';

import {watch} from 'react-ringa';

import classnames from 'classnames';

export default class Modal extends PositionableComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    watch(this, props.modal);

    props.modal.component = this;

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
    let cnWrapper = this.calcClassnames('modal-wrapper', modal.wrapperClasses);

    let children;

    if (!modal.renderer) {
      console.error('Modal::render(): modalModel.renderer is undefined');
    } else if (modal.renderer.prototype instanceof React.Component) {
      let Renderer = modal.renderer;

      children = <Renderer {...modal.rendererProps} modal={modal} />;
    } else if (typeof modal.renderer === 'function') {
      children = modal.renderer(this);
    }

    let contentsCN = classnames('modal-contents', {
      'show-header': modal.showHeader
    });

    let rendered = <div className={cn}
                     style={this.positionStyle}
                     ref="positionable"
                     id={this.id}>
      {modal.showHeader ? <ModalHeader modalModel={modal}/> : undefined}
      <div className={contentsCN}>
        {children}
      </div>
    </div>;

    return modal.showWrapper ? <div className={cnWrapper}>{rendered}</div> : rendered;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  getPositionableModel() {
    return this.props.modal;
  }
}
