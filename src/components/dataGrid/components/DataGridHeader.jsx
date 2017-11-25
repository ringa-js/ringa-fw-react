import React from 'react';

import DataGridComponentBase from './DataGridComponentBase';
import TextInput from '../../input/TextInput';

export default class DataGridHeader extends DataGridComponentBase {
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
    const {context} = this.props;

    let cn = this.calcClassnames('data-grid-header');

    let columnDimension = context.nextDimension;

    let headerCells = columnDimension.columns.map(column => {
      let HeaderCellRenderer = column.headerCellRenderer;

      return <HeaderCellRenderer key={column.id} column={column} />;
    });

    return <div className={cn}>
      {context.dimension.headerSettings.showFunctions ? this.renderFunctions() : undefined}
      <div className="cells horizontal">
        {headerCells}
      </div>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderFunctions() {
    const {context} = this.props;
    const {i18NModel} = this.state;

    return <div className="functions">
      <div className="title"></div>
      <div className="search">
        <TextInput placeholder={i18NModel.i18n('list.search')} onChange={this.search_onChangeHandler}/>
      </div>
    </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  search_onChangeHandler(event, value) {
    const {context} = this.props;

    context.dataGridModel.search(value);
  }
}
