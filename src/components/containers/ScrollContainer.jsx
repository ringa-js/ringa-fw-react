import React from 'react';
import {Controller, Model} from 'ringa';
import {attach, depend, dependency} from 'react-ringa';

import RingaComponent from '../RingaComponent';

export class ScrollContainerModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('scrollTarget', undefined);
    this.addProperty('scrollTimeMS', 500);
    this.addProperty('scrollType', 'quadEaseInOut');
    this.addProperty('maximumSpeed', 10);

    this.scrollContainer = undefined;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  quadEaseInOut() {
    // See: https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
    let easeInOutQuad = function (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    };

    let newVal = easeInOutQuad(this.time / 1000, this.startY, this.changeY, this.scrollTimeMS / 1000);

    this.scrollContainer.scrollTop = Math.ceil(newVal);
  }

  /**
   * Start an animation scrolling from the current scroll position to the scrollTarget
   */
  startAnimating() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    let tRect = this.scrollTarget.getBoundingClientRect();
    let cRect = this.scrollContainer.getBoundingClientRect();

    let tCenter = tRect.top + (tRect.bottom - tRect.top) / 2;
    let cCenter = cRect.top + (cRect.bottom - cRect.top) / 2;

    this.startY = this.scrollContainer.scrollTop;

    // We want tCenter (target) to arrive at cCenter (container) - if possible (it might not be)
    let deltaY = tCenter - cCenter;

    this.endY = this.scrollContainer.scrollTop + deltaY;
    this.changeY = this.endY - this.startY;

    this.time = 0;

    this.interval = setInterval((function () {
      this.time += 5;

      let scrollBefore = this.scrollContainer.scrollTop;

      this[this.scrollType]();

      if (this.time >= this.scrollTimeMS) {
        clearInterval(this.interval);
      }
    }).bind(this), 5);
  }
}

export class ScrollContainerController extends Controller {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();

    this.addModel(new ScrollContainerModel());

    this.addListener('scrollTo', (scrollContainerModel, target, $detail) => {
      scrollContainerModel.scrollTarget = target;

      scrollContainerModel.startAnimating();
    });
  }
}

export default class ScrollContainer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    attach(this, new ScrollContainerController());

    depend(this, dependency(ScrollContainerModel, 'scrollTarget'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentDidMount() {
    const {scrollContainerModel} = this.state;

    super.componentDidMount();

    scrollContainerModel.scrollContainer = this.rootDomNode;
  }

  render() {
    const {children, classes} = this.props;

    return <div className={this.calcClassnames('ringa-container', 'scroll-container', classes)}>{children}</div>;
  }
}
