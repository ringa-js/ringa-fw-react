import React from 'react';

import DataGridComponentBase from "./DataGridComponentBase";
import ScrollContainer from '../../../components/containers/ScrollContainer';

export default class DataGridRowContentBody extends DataGridComponentBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children, nodeContext} = this.props;

    const cn = this.calcClassnames('data-grid-row-content-body', {
      scrollable: nodeContext.dimension.scrollable
    });

    let height = this.calculateHeight();
    let displayChildren = children;

    if (nodeContext.dimension.scrollable) {
      let {childStartIx, childDisplayCount, childOffset} = this.calculateView();
      let {scrollTopPx} = nodeContext;
      scrollTopPx = scrollTopPx === undefined ? 0 : scrollTopPx;

      let {defaultRowHeightPx} = nodeContext.dimension;

      displayChildren = children.slice(childStartIx, childStartIx + childDisplayCount);

      displayChildren = displayChildren.map((child, ix) => <div style={{
        position: 'absolute',
        top: -childOffset + scrollTopPx + (ix * defaultRowHeightPx),
        height: defaultRowHeightPx,
        width: '100%'
      }}>{child}</div>)
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
    const {children, nodeContext} = this.props;

    let {dimension, scrollTopPx} = nodeContext;

    let {defaultRowHeightPx, displayRowCount} = dimension;

    return defaultRowHeightPx * children.length;
  }

  calculateView() {
    const {children, nodeContext} = this.props;

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

    this.forceUpdate();
  }
}
