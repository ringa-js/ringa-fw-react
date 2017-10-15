import React from 'react';
import RingaComponent from '../RingaComponent';

import './DragHandles.scss';
import DRAG_HANDLES from '../../images/drag_handles.svg';

class DragHandles extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.state = {
      dragInitiator: true
    };
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {visible = true} = this.props;

    return <div className={this.calcClassnames('drag-handles', {hide: !visible})}>
      <div>
        <img src={DRAG_HANDLES}/>
      </div>
    </div>;
  }
}

export default DragHandles;
