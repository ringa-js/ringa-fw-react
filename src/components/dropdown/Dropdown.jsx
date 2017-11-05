import React from 'react';
import RingaComponent from '../RingaComponent';
import OverlayModel from '../overlay/OverlayModel';
import {getBoundingClientRect} from '../../utils/DisplayUtils';

import classnames from 'classnames';

export default class Dropdown extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedItem: props.value,
      parentWidth: props.parentWidth || false
    };
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get buttonRenderer() {
    return this.props.buttonRenderer;
  }

  get selectedItem() {
    return this.state ? this.state.selectedItem : undefined;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        selectedItem: nextProps.value
      });
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    if (this.overlayModel) {
      this.overlayModel.remove(true);
    }
  }

  render() {
    let {renderArrow, value, placeholder = 'Select...', global, classes, internalButtonRenderer} = this.props;
    let {selectedItem, open} = this.state;

    value = value || selectedItem;

    let selectedText = this.itemToLabel(value);

    let positionTop = open && this.overlayModel && this.overlayModel.positionOptions && this.overlayModel.positionOptions.alternate;
    let children = this.props.children;
    let arrow = null;
    let classNames;

    if (!children && this.buttonRenderer) {
      return this.buttonRenderer(this, value);
    } else if (!children && internalButtonRenderer) {
      classNames = this.calcClassnames('dropdown default', open && 'open', positionTop ? 'position-top' : undefined);

      children = internalButtonRenderer(this, value);

      renderArrow = renderArrow || this.defaultRenderArrow;

      arrow = renderArrow(open);
    } else if (!children) {
      classNames = this.calcClassnames('dropdown default', open && 'open', positionTop ? 'position-top' : undefined);

      if (selectedText) {
        children = <div className="dropdown-selected">{selectedText}</div>;
      } else {
        children = <div className="dropdown-placeholder">{placeholder}</div>;
      }

      renderArrow = renderArrow || this.defaultRenderArrow;

      arrow = renderArrow(open);
    } else {
      classNames = this.calcClassnames('dropdown', open && 'open', positionTop ? 'position-top' : undefined);
    }

    return <div onClick={this.onClickHandler}
                ref="dropdownButton"
                onMouseEnter={this.onMouseEnterHandler}
                className={classNames}>
      {children}
      {arrow}
    </div> ;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderDropdown() {
    let {itemRenderer, items, filterOutSelected = true, children} = this.props;
    const {selectedItem} = this.state;

    itemRenderer = itemRenderer || this.defaultItemRenderer;
    itemRenderer = itemRenderer.bind(undefined, this.item_selectHandler);

    let filteredItems, renderedItems;

    items = this.actualItems || items;

    if (items) {
      filteredItems = filterOutSelected ? items.filter(item => item !== selectedItem) : items;
      renderedItems = filteredItems ? filteredItems.map(itemRenderer) : null;
    } else {
      console.warn('Dropdown: no items provided!');
    }

    let borderColor;

    if (this.refs.dropdownButton) {
      borderColor = window.getComputedStyle(this.refs.dropdownButton);

      return <div className="dropdown-list">
        {!children ? <div className="filler-line"
                          style={{position: "absolute", top: 0, left: getBoundingClientRect(this.refs.dropdownButton).width, right: 0, height: 1, background: borderColor.borderLeftColor}}/> : undefined}
        {renderedItems}
      </div>;
    }

    return <div className="dropdown-list">
      {renderedItems}
    </div>;
  }

  itemToLabel(item) {
    let {labelField, labelFunction} = this.props;

    if (!item) {
      return '';
    }

    if (!labelField && typeof item === 'object' && item.label) {
      labelField = 'label';
    }

    return labelFunction ? labelFunction(item, this) : (labelField ? item[labelField] : item);
  }

  defaultItemRenderer(itemSelectHandler, item) {
    const {labelClassesFunction} = this.props;

    let text = this.itemToLabel(item);

    let cn = classnames('item', labelClassesFunction ? labelClassesFunction(item) : undefined);

    return <div className={cn}
                key={item.id ? item.id : (item.value ? item.value : text)}
                onClick={itemSelectHandler.bind(undefined, item)}>
      {text}
    </div>;
  }

  defaultRenderArrow(open) {
    return <div className={`arrow ${open ? 'open' : 'closed'}`} />;
  }

  open() {

    const {parentWidth} = this.props;

    if (this.state.open) {
      return;
    }

    let calculatedWidth = 300;

    if(parentWidth){
      calculatedWidth = getBoundingClientRect(this.refs.dropdownButton).width - 2
    }

    const {global, classes,
           position = 'bottom', align = 'left', shift,
           positionAlternate = 'top', alignAlternate = 'left', shiftAlternate,width=calculatedWidth,
           maxHeight = 300, maxWidth,
           overflowX = 'hidden', overflowY = 'scroll',
           openTimeout = 250, closeTimeout = 0,
           singleton,
           forceInViewport = true,
           onOpen} = this.props;

    this.overlayModel = OverlayModel.show({
      renderer: this.renderDropdown.bind(this),
      target: this.rootDomNode,
      global,
      position,
      align,
      shift,
      positionAlternate,
      alignAlternate,
      shiftAlternate,
      width,
      maxWidth,
      maxHeight,
      overflowX,
      overflowY,
      openTimeout,
      closeTimeout,
      singleton,
      forceInViewport,
      removeHandler: this.dropdown_removeHandler,
      onPositionUpdateHandler: this.dropdown_onPositionUpdateHandler,
      mouseDownOutsideHandler: this.dropdown_mouseDownOutsideHandler,
      mouseLeaveHandler: this.dropdown_mouseLeaveHandler,
      classes: classnames('dropdown-overlay', {default: this.props.children ? false : true}, classes)
    }, this.rootDomNode);

    this.overlayModel.addEventListener('positionOptionsChange', () => {
      this.forceUpdate();
    });

    this.setState({
      open: true
    });

    if (onOpen) {
      onOpen();
    }
  }

  close(immediate = false) {
    const {onClose} = this.props;

    if (!this.overlayModel) {
      console.warn('Close was called on a dropdown that apparently was already closed. Looks like a dangling event handler!.');
      return;
    }

    this.overlayModel.remove(immediate);
    this.overlayModel = undefined;

    this.setState({
      open: false
    });

    if (onClose) {
      onClose();
    }
  }

  toggle() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  }

  getDropdownWidth() {
    return undefined;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  item_selectHandler(item) {

    const {onChange,
           model, modelField,
           items,
           stateParent, stateField,
           autoSetSelectedItem = true, autoCloseOnSelect = true} = this.props;

    if (autoCloseOnSelect) {
      this.close();
    }

    if (autoSetSelectedItem) {
      this.setState({
        selectedItem: item
      });
    }

    if (stateParent && stateField) {
      stateParent.setState({
        [stateField]: item
      });
    }

    if (model && modelField) {
      model[modelField] = item;
    }

    if (onChange) {
      let ix = items.indexOf(item);

      onChange(item, ix, this);
    }
  }

  onMouseEnterHandler() {
    const {hoverOpens} = this.props;

    if (hoverOpens) {
      this.open();
    }
  }

  onClickHandler() {
    
    const {hoverOpens} = this.props;

    if (!hoverOpens) {
      this.toggle();
    }
  }

  dropdown_mouseDownOutsideHandler() {
    this.close();
  }

  dropdown_mouseLeaveHandler() {
    const {hoverOpens} = this.props;

    if (hoverOpens && this.state.open) {
      this.close();
    }
  }

  dropdown_onPositionUpdateHandler(model) {
    if (model.positionOptions.alternate) {
      this.forceUpdate();
    }
  }

  dropdown_removeHandler(overlayModel) {

  }
}
