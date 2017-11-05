import React from 'react';
import RingaComponent from '../RingaComponent';

import Button from '../../components/input/Button';

class TabNavigator extends RingaComponent {
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
    const {tabs, curTabIx = 0, renderTabContent = this.defaultRenderTabContent, renderTabButton = this.defaultRenderTabButton} = this.props;

    const curTab = tabs[curTabIx];
    const tabContent = renderTabContent(curTab);

    const buttons = tabs ? tabs.forEach(this.defaultRenderTabButton) : undefined;

    return <div className={this.calcClassnames("tab-navigator")}>
      <div className="tabs">{tabs}</div>
      <div className="content">{tabContent}</div>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  defaultRenderTabContent(tab) {
    return tab.content;
  }

  defaultRenderTabButton(tab) {
    return <Button label={tab.label} />;
  }
}

export default TabNavigator;
