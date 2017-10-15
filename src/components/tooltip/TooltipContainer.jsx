import React, { Component } from 'react';
import RingaComponent from '../RingaComponent';
import TooltipController from './TooltipController';
import TooltipContainerModel from './TooltipContainerModel';
import Tooltip from './Tooltip';
import {attach, depend, dependency} from 'react-ringa';

import './TooltipContainer.scss';

export default class TooltipContainer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    attach(this, new TooltipController(), {
      bus: document
    });

    depend(this, dependency(TooltipContainerModel, ['tooltips']));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  renderTooltip(tooltip) {
    return <Tooltip key={tooltip.id}
                    tooltip={tooltip}
                    manager={this}/>;
  }

  render() {
    let {tooltips} = this.state.tooltipContainerModel;

    tooltips = tooltips.map(this.renderTooltip);

    return <div className="tooltip-container">
      {tooltips}
    </div>;
  }
}
