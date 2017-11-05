import React from 'react';
import RingaComponent from '../RingaComponent';
import TextInput from '../input/TextInput';
import I18NModel from '../../models/I18NModel';
import TrieSearch from 'trie-search';
import Checkbox from '../input/Checkbox';

import {depend, dependency} from 'react-ringa';

import classnames from 'classnames';

export default class List extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.rebuildIndex(props);

    depend(this, dependency(I18NModel, 'language'));
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get selectedItem() {
    const {items} = this.props;

    if (!items || !items.length) {
      return undefined;
    }

    return items.find(item => item.selected);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentWillUpdate(nextProps, nextState) {
    this.rebuildIndex(nextProps);
  }

  render() {
    let {label, id, items, itemRenderer, emptyListMessage, autoSort = true, multiSelect = false, maxHeight = undefined, emptyLabel, enableSearch = true, searchPlaceholder} = this.props;
    const {i18NModel} = this.state;

    let children;

    let searchNoItemsMessage = null;
    let filteredItems = this.getFilteredItems(items);

    if (!itemRenderer) {
      itemRenderer = multiSelect ? this.multiSelectItemRenderer : this.defaultItemRenderer;
    }

    if (items.length !== 0 && filteredItems.length === 0) {
      searchNoItemsMessage = <div className="search-no-items">{i18NModel.i18n('list.noItemsForSearch')}</div>;
    }

    if (filteredItems && filteredItems.length) {
      if (multiSelect) {
        if (autoSort) {
          filteredItems.sort(this.multiSelectSort);
        }
        children = filteredItems.map(itemRenderer.bind(undefined, this.item_clickHandler, this.checkbox_onChangeHandler));
      } else {
        children = filteredItems.map(itemRenderer.bind(undefined, this.item_clickHandler));
      }
    } else if (emptyLabel) {
      children = <div className="empty">{emptyLabel}</div>;
    }

    let cn = this.calcClassnames('list');

    return <div className={cn}
                style={{maxHeight: maxHeight === -1 ? '' : maxHeight}}>
      {items.length ? <div>
        {enableSearch ? <TextInput ref="search"
                                   classes="search"
                                   placeholder={searchPlaceholder || i18NModel.i18n('list.search', {count: items ? items.length : ''})}
                                   onChange={this.search_onChangeHandler} /> : undefined}
        <div className="contents">
          {children}
          {searchNoItemsMessage}
        </div>
      </div>:
      <div className="empty-list-msg" dangerouslySetInnerHTML={{__html : emptyListMessage}}></div>
    }
    </div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  multiSelectSort(a, b) {
    if (a.selected && !b.selected) {
      return -1;
    } else if (!a.selected && b.selected) {
      return 1;
    }

    return this.getLabelFor(a) > this.getLabelFor(b) ? 1 : -1;
  }

  focus() {
    if(this.refs.search){
      this.refs.search.focus();
    }
  }

  getFilteredItems(items) {
    const {filterString} = this.state;

    if (this.trieSearch && filterString) {
      return this.trieSearch.get(filterString);
    }

    return items;
  }

  getLabelFor(item) {
    const {labelField = 'label', labelFunction} = this.props;

    if (labelFunction) {
      return labelFunction(item, this);
    }

    return typeof item === 'string' ? item : item[labelField];
  }

  defaultItemRenderer(itemClickHandler, item, ix, arr) {
    const {labelField = 'label', labelClassesFunction} = this.props;
    const label = this.getLabelFor(item);

    let cn = classnames('item-renderer', {
      selected: item.selected
    }, labelClassesFunction ? labelClassesFunction(item) : undefined);

    let key = item.id || label;

    return <div className={cn}
                onClick={this.item_clickHandler.bind(this, item)}
                key={key}>{label}</div>;
  }

  multiSelectItemRenderer(itemClickHandler, checkbox_onChangeHandler, item, ix, arr) {
    const {labelField = 'label', labelClassesFunction} = this.props;
    const label = this.getLabelFor(item);

    let cn = classnames('item-renderer checkbox', {
      selected: item.selected
    }, labelClassesFunction ? labelClassesFunction(item) : undefined);

    let key = item.id || label;

    return <div className={cn} key={key} onClick={checkbox_onChangeHandler.bind(this, item)}>
      <Checkbox checked={item.selected} />
      <div className="label">{label}</div>
    </div>;
  }

  rebuildIndex(props) {
    const {enableSearch = true, items, labelField = 'label', indexFunction} = props;

    if (enableSearch) {
      this.trieSearch = new TrieSearch();

      if (items) {
        items.forEach(item => {
          let str = indexFunction ? indexFunction(item) : this.getLabelFor(item);

          if (str) {
            this.trieSearch.map(str, item);
          } else {
            console.warn('List: attempting to index an empty label for', item, labelField);
          }
        });
      }
    }
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  item_clickHandler(item) {
    const {onChange, autoSelect = false, items} = this.props;

    if (autoSelect) {
      items.forEach(_item => {
        _item.selected = _item === item;
      });
    }

    if (onChange) {
      onChange(item, this);
    }

    this.forceUpdate();
  }

  search_onChangeHandler(event, value) {
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
    }

    this.searchDebounce = setTimeout(() => {
      this.setState({
        filterString: value
      });
    }, 150);
  }

  checkbox_onChangeHandler(item) {
    const {onSelect, onChange, autoSelect = false, items} = this.props;

    if (onSelect) {
      onSelect(item, this);
    } else {
      item.selected = !item.selected;

      this.forceUpdate();
    }

    if (onChange) {
      onChange(item, this);
    }
  }
}
