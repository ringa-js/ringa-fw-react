import React from 'react';

import DataGridComponentBase from './DataGridComponentBase';
import DataGridNodeContext from "../models/DataGridNodeContext";

export default class DataGridDimensionRenderer extends DataGridComponentBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render(wrap = true) {
    const {nodeContext} = this.props;

    let children = [
      this.renderHeader(),
      this.renderItems(),
      this.renderFooter()
    ];

    if (!wrap) {
      return children;
    }

    const cn = this.calcClassnames('data-grid-dimension', nodeContext.dimension.direction);

    return <div className={cn}>
      {children}
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderHeader() {
    const {nodeContext} = this.props;
    const HeaderRenderer = nodeContext.dimension.headerRenderer;

    if (HeaderRenderer) {
      return <HeaderRenderer nodeContext={nodeContext}/>;
    }

    return undefined;
  }

  renderItems() {
    const {nodeContext} = this.props;

    let renderedItems = [];

    nodeContext.filteredDataIterate(iteratee => {
      let ItemRenderer = nodeContext.dimension.getItemRendererFor(iteratee);

      renderedItems.push(<ItemRenderer key={iteratee.id}
                                       nodeContext={iteratee.data instanceof DataGridNodeContext ? iteratee.data : iteratee} />);
    });

    let WrapperRenderer = nodeContext.dimension.wrapperRenderer;

    if (WrapperRenderer) {
      return <WrapperRenderer nodeContext={nodeContext}>{renderedItems}</WrapperRenderer>;
    }

    return renderedItems;
  }

  renderFooter() {
    const {nodeContext} = this.props;
    const FooterRenderer = nodeContext.dimension.footerRenderer;

    if (FooterRenderer) {
      return <FooterRenderer nodeContext={nodeContext}/>;
    }

    return undefined;
  }
}
