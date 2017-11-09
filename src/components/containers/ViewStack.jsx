import React from 'react';
import RingaComponent from '../RingaComponent';

export default class ViewStack extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.state = {
      sticky: false
    };
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children, index} = this.props;

    return <div className={this.calcClassnames('viewstack')}>
      {children[index]}
    </div> ;
  }
}
