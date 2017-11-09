import React from 'react';
import RingaComponent from '../RingaComponent';

import {calcLabel} from '../../utils/ComponentUtils';

import I18NModel from '../../models/I18NModel';
import {depend, dependency} from 'react-ringa';

import DELETE from '../../images/close.svg';

export default class Tags extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    depend(this, dependency(I18NModel, 'language'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {items,children} = this.props;

    let itemsChildren = items.map(item => this.defaultRenderItem(item));

    return <div className={this.calcClassnames('tags')}>{itemsChildren} {children}</div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  defaultRenderItem(item) {
    const {enableDelete = true} = this.props;

    return <div className="tag">
      <div className="text">
        {calcLabel(item, this.props, this)}
      </div>
      {enableDelete ? <div className="delete" onClick={this.delete_clickHandler.bind(this, item)}>
          <img src={DELETE} />
        </div> : undefined }
      </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  delete_clickHandler(item) {
    const {onDelete} = this.props;

    if (onDelete) {
      onDelete(item);
    }
  }
}
