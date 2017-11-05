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
  // Properties
  //-----------------------------------
  get selectedIx() {
    return (this.state && this.state.selectedIx !== undefined ? this.state.selectedIx : this.props.selectedIx) || 0;
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {tabs, renderTabContent = this.defaultRenderTabContent, renderTabButton = this.defaultRenderTabButton} = this.props;

    const curTab = tabs[this.selectedIx];
    const tabContent = renderTabContent(curTab);

    const tabButtons = tabs ? tabs.map(renderTabButton) : undefined;

    return <div className={this.calcClassnames("tab-navigator")}>
      <div className="tabs">{tabButtons}</div>
      <div className="content">{tabContent}</div>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  defaultRenderTabContent(tab) {
    return tab.content;
  }

  defaultRenderTabButton(tab, ix) {
    return <Button label={tab.label} onClick={this.tabButton_onClickHandler.bind(this, ix)} classes={{
      tab: true,
      selected: ix === this.selectedIx
    }} />;
  }

  tabButton_onClickHandler(ix) {
    this.setState({
      selectedIx: ix
    });
  }
}

export default TabNavigator;
