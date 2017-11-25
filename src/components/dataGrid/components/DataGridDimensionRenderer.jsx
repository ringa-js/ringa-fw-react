import React from 'react';

import DataGridComponentBase from './DataGridComponentBase';

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
    const {context} = this.props;

    let children = [this.renderHeader(), this.renderItems(), this.renderFooter()];

    if (!wrap) {
      return children;
    }

    const cn = this.calcClassnames('data-grid-dimension', context.dimension.direction);

    return <div className={cn}>
      {children}
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderHeader() {
    const {context} = this.props;
    const HeaderRenderer = context.dimension.headerRenderer;

    if (HeaderRenderer) {
      return <HeaderRenderer context={context}/>;
    }

    return undefined;
  }

  renderItems() {
    const {context} = this.props;

    let renderedItems = [];

    context.iterate(iteratee => {
      let ItemRenderer = iteratee.itemRenderer;

      renderedItems.push(<ItemRenderer key={iteratee.key}
                                       context={iteratee.context}
                                       item={iteratee.item} />);
    });

    let WrapperRenderer = context.dimension.wrapperRenderer;

    if (WrapperRenderer) {
      return <WrapperRenderer context={context}>{renderedItems}</WrapperRenderer>;
    }

    return renderedItems;
  }

  renderFooter() {
    const {context} = this.props;
    const FooterRenderer = context.dimension.footerRenderer;

    if (FooterRenderer) {
      return <FooterRenderer context={context}/>;
    }

    return undefined;
  }
}
