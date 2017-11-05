import React from 'react';
import RingaComponent from '../RingaComponent';
import DragListContainerItem from './DragListContainerItem';
import {getBounds} from '../../utils/DisplayUtils';

class DragListContainer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.state = {
      dropIndex: -1,
      dropData: undefined,
      dropAcceptHandler: item => true,
      dragActive: false
    };

    this.itemsUpdates = 0;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    let {items, renderer, renderEmpty = this.defaultRenderEmpty, renderDropItem, children, showHandles, id, idField, maxHeight} = this.props;
    const {dropIndex, dropData, dragActive} = this.state;

    if (!idField) {
      throw new Error('DragListContainer:: please specify an idField in the props for each of the items!');
    }

    items = items.filter(item => item !== dropData);

    let listChildren = items.map((item, ix) => <DragListContainerItem dragData={item}
                                                                      dragEnabled={!showHandles}
                                                                      showHandles={showHandles}
                                                                      onDragEnd={this.child_onDragEndHandler}
                                                                      ref={`item${item[idField]}`}
                                                                      key={item[idField]}>{renderer(item, false)}</DragListContainerItem>);

    // Insert the drop marker
    if (dropIndex >= 0) {
      let rdi = renderDropItem || this.defaultRenderDropItem;

      listChildren.splice(dropIndex, 0, rdi(dropData));
    }

    if (items.length === 0 && listChildren.length === 0) {
      listChildren = [renderEmpty()];
    }

    return <div className={this.calcClassnames('drag-list-container', {'drag-active': dragActive})} style={{maxHeight}}>
      {listChildren}
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  defaultRenderEmpty() {
    return <div className="empty" key="empty">List is empty</div>;
  }

  defaultRenderDropItem(item) {
    const {renderer} = this.props;

    return <div key={-1}>{renderer(item, true)}</div>;
  }

  dragActivated(data, mouseEvent) {
    if (super.dragActivated(data, mouseEvent)) {
      this.setState({
        dragActive: true
      });
    }
  }

  dragDeactivated(data, mouseEvent) {
    this.setState({
      dragActive: false
    });
  }

  dragEnter(data, mouseEvent) {
    if (this.dropAcceptHandler && !this.dropAcceptHandler(data, mouseEvent)) {
      return false;
    }

    let dropIndex = this.calcDropIndex(data, mouseEvent);

    this.setupDropPoint(dropIndex, data);

    return true;
  }

  dragLeave() {
    this.setState({
      dropIndex: -1
    });
  }

  dropMove(data, mouseEvent) {
    if (this.dropAcceptHandler && !this.dropAcceptHandler(data, mouseEvent)) {
      return;
    }

    let dropIndex = this.calcDropIndex(data, mouseEvent);

    this.setupDropPoint(dropIndex, data);
  }

  dragDrop(data, mouseEvent) {
    const {onChange, items} = this.props;

    let dropIndex = this.calcDropIndex(data, mouseEvent);

    if (dropIndex !== -1) {
      let oldIx = items.indexOf(data);

      if (!onChange) {
        if (oldIx !== -1) {
          items.splice(oldIx, 1); // Remove old one
          items.splice(dropIndex, 0, data); //Insert new one
        } else {
          items.splice(dropIndex, 0, data);
        }
      } else {
        onChange(oldIx, dropIndex, data, mouseEvent);
      }

      this.itemsUpdates += 1000;
    }

    this.setState({
      dropIndex: -1,
      dropData: undefined
    });
  }

  setupDropPoint(dropIndex, dropData) {
    if (dropIndex !== this.state.dropIndex) {
      this.setState({
        dropIndex,
        dropData
      });
    }
  }

  calcDropIndex(data, mouseEvent) {
    let {items, idField} = this.props;

    if (Object.keys(this.refs).length == 0) {
      return 0;
    }

    items = items.filter(item => item !== data);

    const renderers = items.map((item) => this.refs[`item${item[idField]}`]);
    const bounds = renderers.map(renderer => getBounds(renderer.rootDomNode || renderer));
    const centers = bounds.map(bound => bound.top + (bound.height / 2));

    // centers should be like [50, 100, 150...]
    let which = 0;

    while (centers[which] < mouseEvent.clientY && which < centers.length) which++;

    return which;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  child_onDragEndHandler(mouseEvent, dragData, dropTargetComponent) {
    const {items, removeOnDropOutside = true, onRemove} = this.props;

    let ix = items.indexOf(dragData);

    if (onRemove) {
      onRemove(ix, dragData, mouseEvent);
    } else if (dropTargetComponent && dropTargetComponent !== this && removeOnDropOutside) {
      if (ix !== -1) {
        items.splice(ix, 1);
      }
    }

    if (dropTargetComponent !== this) {
      // We don't clear this data here if the dropTargetComponent is ourself, because we will get
      // our dragDrop called shortly
      this.setState({
        dropIndex: -1,
        dropData: undefined
      });
    }
  }
}

export default DragListContainer;
