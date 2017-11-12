import React from 'react';
import RingaComponent from '../RingaComponent';
import I18NModel from '../../models/I18NModel';
import Dropdown from '../dropdown/Dropdown';

import {dependency} from 'react-ringa';

const LANGUAGE_TO_COUNTRY = {
  sv: 'se',
  en: 'us'
};

class I18NSwitcher extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(dependency(I18NModel, 'language'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {white = true} = this.props;
    const {i18NModel, dropdownClasses = `borderless ${white ? 'white' : ''} i18n-switcher`} = this.state;

    let items = i18NModel.languageKeys.map(key => ({
      key,
      label: i18NModel.i18n(`i18n.${key}`),
      iconClass: `flag-icon flag-icon-${LANGUAGE_TO_COUNTRY[key]}`
    }));

    return <div className={this.calcClassnames('i18n-switcher')}>
      <Dropdown value={items.find(item => item.key === i18NModel.language)}
                maxWidth={150}
                internalButtonRenderer={this.dropdownInternalButtonRenderer}
                itemRenderer={this.dropdownItemRenderer}
                classes={dropdownClasses}
                onChange={this.dropdown_onChangeHandler}
                items={items}/>
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  dropdownInternalButtonRenderer(dropdown, selectedItem) {
    return <div className="dropdown-selected language-item"><span className={selectedItem ? selectedItem.iconClass : undefined} /><span className="name">{selectedItem ? selectedItem.label : undefined}</span></div>;
  }

  dropdownItemRenderer(itemSelectHandler, item) {
    return <div className="item language-item" onClick={() => {itemSelectHandler(item);}}><span className={item.iconClass} /><span className="name">{item.label}</span></div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  dropdown_onChangeHandler(item) {
    const {i18NModel} = this.state;

    i18NModel.language = item.key;
  }
}

export default I18NSwitcher;
