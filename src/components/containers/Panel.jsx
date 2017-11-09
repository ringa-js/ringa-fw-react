import React from 'react';
import RingaComponent from '../RingaComponent';

class Panel extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get label() {
    return this.props.label || '[no label]';
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children} = this.props;

    return <div className={this.calcClassnames("panel")}>
      <div className="header">
        <div className="label">{this.label}</div>
      </div>
      <div className="content">
        {children}
      </div>
    </div>;
  }
}

export default Panel;
