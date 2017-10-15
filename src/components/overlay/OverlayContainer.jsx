import React from 'react';
import OverlayContainerController from './OverlayContainerController';
import RingaComponent from '../RingaComponent';
import OverlayContainerModel from './OverlayContainerModel';
import Overlay from './Overlay';

import classnames from 'classnames';

import {attach, depend, dependency} from 'react-ringa';

import './OverlayContainer.scss';

export default class OverlayContainer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    let controller = new OverlayContainerController(undefined, undefined, this);

    if (props.controllerId) {
      controller.id = props.controllerId;
    }

    attach(this, controller, {
      bus: props.global ? document : undefined
    });

    depend(this, dependency(OverlayContainerModel, ['overlays']));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children, classes, global, zIndex, height} = this.props;
    let {overlays} = this.state.overlayContainerModel;

    overlays = overlays.map(this.renderOverlay);

    let cn = classnames({
      'overlay-container-wrapper': true
    }, classes);

    let style = {
      zIndex: global ? 10000 : zIndex
    };

    return <div className={cn} style={{height}}>
      {children}
      <div className="overlay-container" style={style}>
        {overlays}
      </div>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderOverlay(overlay) {
    return <Overlay key={overlay.id}
                    overlay={overlay}
                    manager={this}/>;
  }
}
