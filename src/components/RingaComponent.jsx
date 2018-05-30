import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip/TooltipModel';
import OverlayModel from './overlay/OverlayModel';
import HashArray from 'hasharray';
import classnames from 'classnames';
import {isCoordWithin, getBounds} from '../utils/DisplayUtils';
import {dispatch, Model} from 'ringa';
import {depend, attach, watch} from 'react-ringa';

/**
 * Recursively walks the prototype chain to get all the available properties for a given Object.
 *
 * @param inst The object to walk.
 * @returns {Array} An array of all the property names
 */
export function getAllProperties(inst) {
  let props = [];

  while (inst) {
    props = props.concat(Object.getOwnPropertyNames(inst));
    inst = Object.getPrototypeOf(inst);
  }

  return props;
}

/**
 * Uses getAllProperties() and then filters it for all methods.
 *
 * @param inst The object to walk.
 * @returns {Array} An array of all the methods that can be called on the Object.
 */
export function getInstanceMethodNames(inst) {
  let blacklist = p => ['isMounted',
    'replaceState',
    'hasOwnProperty',
    'propertyIsEnumerable',
    'toString',
    'toLocaleString',
    'isPrototypeOf',
    '__defineGetter__',
    '__defineSetter__',
    '__lookupGetter__',
    '__lookupSetter__',
    'constructor',
    'valueOf'].indexOf(p) === -1;

  return getAllProperties(inst).filter(blacklist).filter(p => typeof inst[p] === 'function');
}

const classCounts = {};
const groups = {};

window.renderCounts = {};
window.RingaComponent_StartPerformanceCheck = () => {
  for (let key in window.renderCounts) {
    window.renderCounts[key] = 0;
  }
};

class RingaComponent extends Component {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  /**
   * Properties:
   *
   * * tooltip: contains the message text for a tooltip
   * * tooltipOptions: any custom options to pass into the Tooltip.show() method.
   * * tooltipSnapToComponent: by default this is false and the tooltip links to the mouse, but if true, the tooltip
   *   will snap to the component instead.
   *
   * @param props
   * @param id
   */
  constructor(props, id, doNotBindWhitelist = []) {
    super(props);

    let cname = this.constructor.name;
    let count;

    if (classCounts[cname]) {
      classCounts[cname]++;
      count = classCounts[cname];
    } else {
      count = classCounts[cname] = 1;
    }

    this.id = id || `${cname}${count}`;

    if (RingaComponent.idToComponent[this.id]) {
      console.warn(`RingaComponent::constructor(): setting an id of ${this.id} and it is already used! Make sure you call super() in componentWillUnmount().`);
    }

    RingaComponent.idToComponent[this.id] = this;

    this.tooltipTimeMS = 666;

    this.lastMouseClientX = this.lastMouseClientY = -1;

    // TODO optimize this to cache the filtered property names per class so it doesn't do it for every instance
    getInstanceMethodNames(this).filter(p => doNotBindWhitelist.indexOf(p) === -1).forEach(eventHandlerName => {
      try {
        this[eventHandlerName] = this[eventHandlerName].bind(this);
      } catch (error) {}
    });

    window.renderCounts[this.constructor.name] = 0;

    this.dragMove = this.dragMove.bind(this);

    this.enabled = true;

    if (this.watchMouseEvents) {
      this.state = Object.assign({
        mouseOver: false
      }, this.state);
    }
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  set enabled(value) {
    this._enabled = value;
  }

  get enabled() {
    return (this.props && this.props.enabled !== undefined) ? this.props.enabled : this._enabled;
  }

  set groups(value) {
    let oldGroups = this.groups;

    if (oldGroups) {
      oldGroups.forEach(group => {
        groups[group].remove(this);
      });
    }

    value = value instanceof Array ? value : [value];

    value.forEach(group => {
      groups[group] = groups[group] || new HashArray('id');
      groups[group].add(this);
    });

    this._groups = value;
  }

  get groups() {
    return this._groups;
  }

  set tooltip(value) {
    if (this._tooltip === value) {
      return;
    }

    this._tooltip = value;

    this.clearTriggerTooltip();
  }

  get tooltip() {
    return this._tooltip;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentWillUnmount() {
    delete RingaComponent.idToComponent[this.id];

    this.removeEvents();

    this.unmounted = true;
    this.mounted = false;

    if (this.dropAcceptHandler || this.dropHandler) {
      dispatch('unregisterDropTarget', {
        dropTargetComponent: this
      }, document);
    }

    if (this.dragInitiator) {
      dispatch('unregisterDragInitiator', {
        dragInitiator: this
      }, document);
    }

    this._unwatchProps();
  }

  componentDidMount() {
    if (this.unmounted) {
      console.warning('Remounting a component that has already been mounted!')
    }

    this.rootDomNode = ReactDOM.findDOMNode(this);

    this.mounted = true;

    if (!this.rootDomNode) {
      throw new Error('RingaComponent::componentDidMount(): could not find the rootDomNode!');
    }

    this.addEvents();

    this.dispatchReady = false;

    setTimeout(() => {
      this.dispatchReady = true;

      this.setupDragDrop(this.props, this.state);
      this.componentDispatchReady();
    });
  }

  componentDispatchReady() {
    // To be overridden
  }

  componentDidUpdate() {
    let oldDomNode = this.rootDomNode;

    this.rootDomNode = ReactDOM.findDOMNode(this);

    if (!this.rootDomNode) {
      throw new Error('RingaComponent::componentDidUpdate(): could not find the rootDomNode!');
    }

    if (oldDomNode !== this.rootDomNode) {
      this.addEvents();
    }

    window.renderCounts[this.constructor.name]++;

    this._watchProps();
  }

  render() {
    throw new Error('RingaComponent::render(): this should be overridden! See', this);
  }

  renderDrag() {
    return <div style={{opacity: 0}}></div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  depend(...dependencies) {
    depend(this, dependencies);
  }

  attach(controllerOrModel) {
    attach(this, controllerOrModel);
  }

  watchProps(props, handler) {
    this.propsToWatch = this.propsToWatch || {};

    props = props instanceof Array ? props : [props];
    props.forEach(prop => this.propsToWatch[prop] = {handler});

    this._watchProps();
  }

  _watchProps() {
    this.watchedModels = this.watchedModels || [];

    if (this.props && this.propsToWatch) {
      for (let prop in this.propsToWatch) {
        let model = this.props[prop];
        if (model && model instanceof Model && this.watchedModels.indexOf(model) === -1) {
          this.watchedModels.push(model);
          watch(this, model, undefined, this.propsToWatch[prop].handler);
        }
      }
    }
  }

  _unwatchProps() {
    // Unwatching is handled internal to the watch() method
    this.watchedModels = [];
  }

  dumpAncestors() {
    let n = this.rootDomNode;
    let r = [];

    while (n) {
      r.push(n);
      n = n.parentNode;
    }

    console.log(r);
  }

  setupDragDrop(nextProps, nextState) {
    if (this.dragDropSetup) {
      return false;
    }

    nextProps = nextProps || {};
    nextState = nextState || {};

    this.dropEnabled = nextProps.dropEnabled || nextState.dropEnabled;
    this.dragEnabled = nextProps.dragEnabled || nextState.dragEnabled;

    this.dropAcceptHandler = nextProps.dropAcceptHandler || nextState.dropAcceptHandler;
    this.dropHandler = nextProps.dropHandler || nextState.dropHandler;
    this.dragHoverHandler = nextProps.dragHoverHandler || nextState.dragHoverHandler;
    this.dragLeaveHandler = nextProps.dragLeaveHandler || nextState.dragLeaveHandler;

    this.dragData = nextProps.dragData || nextState.dragData;
    this.dragInitiator = nextProps.dragInitiator || nextState.dragInitiator;

    if (this.dropAcceptHandler || this.dropHandler) {
      dispatch('registerDropTarget', {
        dropTargetComponent: this,
        dropAcceptHandler: this.dropAcceptHandler,
        dropHandler: this.dropHandler,
        dragHoverHandler: this.dragHoverHandler,
        dragLeaveHandler: this.dragLeaveHandler
      }, document);
    }

    if (this.dragInitiator) {
      dispatch('registerDragInitiator', {
        dragInitiator: this
      }, document);
    }

    this.dragDropSetup = true;
  }

  calcClassnames() {
    const {classes} = this.props;

    let o = Array.prototype.slice.call(arguments);

    o.push({
      'ringa-component': true,
      'ringa-drop-hover': this.state && !!this.state.dropHoverData,
      'ringa-block-mouse': this.state && this.state.blockMouseEvents,
      'mouse-over': this.state && this.state.mouseOver,
      'hide': this.props.visible === false,
      'disabled': !this.enabled
    });

    o.push(classes);

    return classnames.apply(undefined, o);
  }

  addEvents() {
    if (this.rootDomNode && this.watchMouseEvents) {
      this.rootDomNode.addEventListener('mouseenter', this.rootDomNode_mouseEnterHandler);
      this.rootDomNode.addEventListener('mousemove', this.rootDomNode_mouseMoveHandler);
      this.rootDomNode.addEventListener('mouseleave', this.rootDomNode_mouseLeaveHandler);
      this.rootDomNode.addEventListener('click', this.rootDomNode_clickHandler);
    }
  }

  removeEvents() {
    if (this.rootDomNode && this.watchMouseEvents) {
      this.rootDomNode.removeEventListener('mouseenter', this.rootDomNode_mouseEnterHandler);
      this.rootDomNode.removeEventListener('mousemove', this.rootDomNode_mouseMoveHandler);
      this.rootDomNode.removeEventListener('mouseleave', this.rootDomNode_mouseLeaveHandler);
      this.rootDomNode.removeEventListener('click', this.rootDomNode_clickHandler);
    }
  }

  beginTriggerTooltip() {
    this.removeTooltip();
    this.clearTriggerTooltip();

    if (this.buildTooltipMessage()) {
      this.tooltipTimer = setTimeout(this.tooltipTimerHandler, this.tooltipTimeMS);
    }
  }

  clearTriggerTooltip() {
    this.removeTooltip();
    if (this.tooltipTimer) {
      clearInterval(this.tooltipTimer);
    }
  }

  removeTooltip() {
    if (this.tooltipModel) {
      this.tooltipModel.remove();
    }
  }

  buildTooltipOptions(message, target, x, y, options) {
    const {tooltipOptions = {}} = this.props;

    return Object.assign({}, this.getTooltipOptions ? this.getTooltipOptions() : {}, options, tooltipOptions, {
      position: 'auto',
      message,
      target,
      forceInViewport: true,
      x,
      y,
      offset: {
        x: 10,
        y: -30
      }
    });
  }

  buildTooltipMessage() {
    let message;

    if (this.getTooltipMessage) {
      message = this.getTooltipMessage();
    }

    if (!message) {
      message = message || this.tooltip || this.props.tooltip;
    }

    return message;
  }

  showTooltip(message, options) {
    let target, x, y;
    const {tooltipSnapToComponent = false} = this.props;

    if (tooltipSnapToComponent) {
      target = this.rootDomNode;
    } else {
      x = this.lastMouseClientX;
      y = this.lastMouseClientY;
    }

    message = message || this.buildTooltipMessage();

    this.tooltipModel = Tooltip.show(this.buildTooltipOptions(message, target, x, y, options));
  }

  showDebugTooltip() {
    this.clearTriggerTooltip();

    this.tooltipModel = this.showTooltip(JSON.stringify(this.props, undefined, 2), {
      pre: true,
      maxWidth: 500,
      classes: {
        debug: true
      }
    });
  }

  dispatch(eventType, detail, bubbles = true, cancellable = true, requireCatch = true, bus = undefined) {
    if (!this.dispatchReady) {
      throw new Error('RingaComponent::dispatch(): please use componentDispatchReady() as you attempted to dispatch an event before the component was fully mounted to the DOM!');
    }

    if (!this.rootDomNode) {
      throw new Error('RingaComponent::dispatch(): rootDomNode was undefined!');
    }

    return dispatch(eventType, detail, bus || this.rootDomNode, bubbles, cancellable, requireCatch);
  }

  dispatchLater(eventType, detail, bubbles = true, cancellable = true, requireCatch = true) {
    if (!this.rootDomNode) {
      throw new Error('RingaComponent::dispatch(): rootDomNode was undefined!');
    }

    return new Promise(resolve => {
      setTimeout(() => {
        dispatch(eventType, detail, this.rootDomNode, bubbles, cancellable, requireCatch).then($lastPromiseResult => resolve($lastPromiseResult));
      }, 0);
    });
  }

  dragStart(dragDropModel, mouseEvent) {
    this._render = this.render;
    this.render = this.renderDrag;

    this.dragBounds = getBounds(this.rootDomNode);

    this.dragOffset = {
      x: this.dragBounds.left - mouseEvent.clientX,
      y: this.dragBounds.top - mouseEvent.clientY
    };

    let bounds = getBounds(this.rootDomNode);
    let style = window.getComputedStyle(this.rootDomNode);

    let marginLeft = parseFloat(style.getPropertyValue('margin-left'));
    let marginRight = parseFloat(style.getPropertyValue('margin-right'));
    let marginTop = parseFloat(style.getPropertyValue('margin-top'));
    let marginBottom = parseFloat(style.getPropertyValue('margin-bottom'));

    this.dragOverlay = OverlayModel.show({
      renderer: this._render.bind(this),
      classes: {
        'ringa-block-mouse': true
      },
      maxWidth: 2500,
      x: mouseEvent.clientX + this.dragOffset.x,
      y: mouseEvent.clientY + this.dragOffset.y,
      // TODO setup width to properly calculate for border / padding / etc.
      width: bounds.width - marginLeft - marginRight,
      height: bounds.height - marginTop - marginBottom
    });

    this.setState({
      isDragging: true
    });

    const {onDragStart} = this.props;

    if (onDragStart) {
      onDragStart(this.dragData);
    }
  }

  dragMove(mouseEvent) {
    this.dragOverlay.x = mouseEvent.clientX + this.dragOffset.x;
    this.dragOverlay.y = mouseEvent.clientY + this.dragOffset.y;
  }

  dropMove(mouseEvent) {

  }

  dragEnd(mouseEvent, dragData, dropTargetComponent) {
    if (this.dragOverlay) {
      this.dragOverlay.remove();
    }

    const {onDragEnd} = this.props;

    if (onDragEnd) {
      onDragEnd(mouseEvent, dragData, dropTargetComponent);
    }

    if (this.unmounted) {
      return;
    }

    this.render = this._render || this.render;

    this.setState({
      isDragging: false,
      x: undefined,
      y: undefined
    });
  }

  dragActivated(data, mouseEvent) {
    if (this.dropAcceptHandler) {
      return this.dropAcceptHandler(data, mouseEvent);
    }

    return true;
  }

  dragEnter(data, mouseEvent) {
    let acceptDrop = true;

    if (this.dropAcceptHandler) {
      acceptDrop = this.dropAcceptHandler(data, mouseEvent);
    }

    if (acceptDrop) {
      this.setState({
        dropHoverData: data
      });
    }

    return acceptDrop;
  }

  dragLeave() {
    this.setState({
      dropHoverData: undefined
    });
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  rootDomNode_mouseEnterHandler(event) {
    this.setState({
      mouseOver: true
    });

    this.beginTriggerTooltip();

    if (this.mouseOverStopPropagation) {
      event.stopPropagation();
    }
  }

  rootDomNode_mouseMoveHandler(event) {
    this.lastMouseClientX = event.clientX;
    this.lastMouseClientY = event.clientY;

    if (!this.tooltipModel || !isCoordWithin(this.rootDomNode, event.clientX, event.clientY)) {
      this.beginTriggerTooltip();
    }
  }

  rootDomNode_mouseLeaveHandler(event) {
    this.setState({
      mouseOver: false
    });

    if (this.tooltipModel && this.tooltipModel.domNode) {
      if (isCoordWithin(this.tooltipModel.domNode, event.clientX, event.clientY)) {
        return;
      }
    }

    this.clearTriggerTooltip();

    if (this.mouseOverStopPropagation) {
      event.stopPropagation();
    }
  }

  rootDomNode_clickHandler(event) {
    if (event.altKey && !event.shiftKey) {
      this.showDebugTooltip();

      event.stopPropagation();
      event.preventDefault();
    }
  }

  tooltipTimerHandler() {
    this.showTooltip();
  }
}

RingaComponent.idToComponent = new WeakMap();

export default RingaComponent;
