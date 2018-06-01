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
    let {children, renderTabContent = this.defaultRenderTab, renderTabButton = this.defaultRenderTabButton, controls} = this.props;

    if (!children) {
      return <div>Please provide some children to the TabNavigator!</div>;
    }

    children = children instanceof Array ? children : [children];

    children = children.filter(child => child.props.visible !== false);

    const curTab = children[this.selectedIx];
    const tabContent = renderTabContent(curTab);

    const tabButtons = children ? children.map(renderTabButton) : undefined;

    return <div className={this.calcClassnames("tab-navigator")}>
      <div className="tabs"><span>{tabButtons}</span>{controls}</div>
      <div className="content">{tabContent}</div>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  defaultRenderTab(tab) {
    return tab.content ? tab.content : tab;
  }

  defaultRenderTabButton(tab, ix) {
    let label = tab.label ? tab.label : tab.props.label;

    return <Button label={label} onClick={this.tabButton_onClickHandler.bind(this, ix)} classes={{
      tab: true,
      selected: ix === this.selectedIx
    }} key={label} />;
  }

  tabButton_onClickHandler(ix) {
    const {onChange} = this.props;

    if (this.props.selectedIx === undefined) {
      this.setState({
        selectedIx: ix
      });
    }

    if (onChange) {
      onChange(ix);
    }
  }
}

export default TabNavigator;
