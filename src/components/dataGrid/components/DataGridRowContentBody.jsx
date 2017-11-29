import React from 'react';

import DataGridComponentBase from "./DataGridComponentBase";
import ScrollContainer from '../../../components/containers/ScrollContainer';

export default class DataGridRowContentBody extends DataGridComponentBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props, ['change']);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {items, nodeContext} = this.props;

    const cn = this.calcClassnames('data-grid-row-content-body', {
      scrollable: nodeContext.dimension.scrollable
    }, nodeContext.dimension.contentBodyClasses);

    let height = this.calculateHeight();
    let displayChildren = items;

    if (nodeContext.dimension.scrollable) {
      let {childStartIx, childDisplayCount, childOffset} = this.calculateView();
      let {scrollTopPx} = nodeContext;

      scrollTopPx = scrollTopPx === undefined ? 0 : scrollTopPx;

      let {defaultRowHeightPx} = nodeContext.dimension;

      displayChildren = items.slice(childStartIx, childStartIx + childDisplayCount);

      displayChildren = displayChildren.map((unrenderedItem, ix) => {
        let ItemRenderer = unrenderedItem.itemRenderer;

        return <div key={unrenderedItem.key} style={{
                    position: 'absolute',
                    top: -childOffset + scrollTopPx + (ix * defaultRowHeightPx),
                    height: defaultRowHeightPx,
                    width: '100%'
                  }}><ItemRenderer key={unrenderedItem.key}
                                   nodeContext={unrenderedItem.nodeContext} />
              </div>;
      });
    } else {
      displayChildren = displayChildren.map(unrenderedItem => {
        let ItemRenderer = unrenderedItem.itemRenderer;

        return <ItemRenderer key={unrenderedItem.key}
                             nodeContext={unrenderedItem.nodeContext} />
      });
    }

    return <ScrollContainer classes={cn} 
                            maxHeight={nodeContext.dimension.maxHeight} 
                            onScrollTopChange={this.scrollContainer_onScrollTopChangeHandler}>
      <div style={{height}}>
        {displayChildren}
      </div>
    </ScrollContainer>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  calculateHeight() {
    const {items, nodeContext} = this.props;

    let {dimension, scrollTopPx} = nodeContext;

    let {defaultRowHeightPx, displayRowCount} = dimension;

    return defaultRowHeightPx * items.length;
  }

  calculateView() {
    const {items, nodeContext} = this.props;

    let {dimension, scrollTopPx} = nodeContext;
    let {defaultRowHeightPx, displayRowCount} = dimension;

    if (scrollTopPx === undefined) {
      scrollTopPx = 0;
    }

    return {
      childStartIx: Math.floor(scrollTopPx / defaultRowHeightPx),
      childOffset: scrollTopPx % defaultRowHeightPx,
      childDisplayCount: displayRowCount
    };
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  scrollContainer_onScrollTopChangeHandler(scrollTop, type, event) {
    const {nodeContext} = this.props;

    nodeContext.scrollTopPx = scrollTop;

    if (this.scrollTimeout) {
      return;
    }

    this.scrollTimeout = setTimeout(() => {
      this.scrollTimeout = undefined;
      this.forceUpdate();
    }, 25);
  }
}
