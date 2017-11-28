import React from 'react';

import Dropdown from './Dropdown';
import TextInput from '../input/TextInput';
import Tags from '../complex/Tags';
import {hasAncestorWithId, hasAncestorWithClass, getInnerSize} from '../../utils/DisplayUtils';
import {calcLabel} from '../../utils/ComponentUtils';
import TrieSearch from 'trie-search';
import I18NModel from '../../models/I18NModel';

import {depend, dependency} from 'react-ringa';

export default class DropdownTypeahead extends Dropdown {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.updateTrie(props);

    this.state = {
      selectedItems: []
    };

    depend(this, dependency(I18NModel, 'language'));
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get buttonRenderer() {
    return () => {
      let {renderArrow, placeholder, selectedItems, labelField, labelFunction} = this.props;
      const {open, i18NModel} = this.state;

      selectedItems = selectedItems || this.state.selectedItems;

      placeholder = placeholder || i18NModel.i18n('ringa-fw.dropdownTypeahead.defaultPlaceholder');

      let positionTop = open && this.overlayModel && this.overlayModel.positionOptions && this.overlayModel.positionOptions.alternate;
      const classNames = this.calcClassnames('dropdown default typeahead', open && 'open', positionTop ? 'position-top' : undefined);

      renderArrow = renderArrow || this.defaultRenderArrow;

      const arrow = renderArrow(open);

      return <div className={classNames} id={this.id} onClick={this.onClickHandler}>
        <Tags items={selectedItems}
              labelField={labelField}
              labelFunction={labelFunction}
              onDelete={this.tags_onDeleteHandler}>
        <TextInput ref="input"
                   onPressKey={this.input_onPressKeyHandler}
                   placeholder={placeholder}
                   classes="typeahead-input"
                   onFocus={this.input_onFocusHandler}
                   onChange={this.textInput_onChangeHandler} />
        </Tags>
        {arrow}
      </div>;
    };
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  componentWillReceiveProps(nextProps) {
    this.updateTrie(nextProps);
    this.updateDisplayedItems();
  }

  componentDidUpdate() {
    super.componentDidUpdate();

    if (this.overlayModel) {
      let s = getInnerSize(this.rootDomNode);

      this.overlayModel.width = this.overlayModel.maxWidth = s.width;
    }
  }

  render() {
    return super.render();
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  getDropdownWidth() {
    return getSize(this.rootDomNode).width;
  }

  updateTrie(props) {
    const {items} = this.props;

    if (items) {
      items.forEach(item => {
        item.__searchLabel = calcLabel(item, this.props);
      });

      this.trie = new TrieSearch('__searchLabel');

      this.trie.addAll(items);
    }
  }

  updateDisplayedItems() {
    let ai;

    if (this.refs.input && this.refs.input.value) {
      ai = this.trie.get(this.refs.input.value);
    } else {
      ai = this.props.items;
    }

    let selectedItems = this.props.selectedItems || this.state.selectedItems;

    ai = ai.filter(item => selectedItems.indexOf(item) === -1);

    this.actualItems = ai;

    if (this.overlayModel) {
      this.overlayModel.dispatch('refresh');
    }
  }

  update(selectedItems) {
    const {onChange, autoSetSelectedItem, stateParent, stateField, model, modelField} = this.props;

    if (autoSetSelectedItem) {
      this.setState({selectedItems: selectedItems.concat()});
    }

    if (stateParent && stateField) {
      stateParent.setState({
        [stateField]: selectedItems
      });
    }

    if (model && modelField) {
      model[modelField] = selectedItems;
    }

    if (onChange) {
      onChange(selectedItems);
    }
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  textInput_onChangeHandler() {
    if (!this.state.open) {
      this.open();
    }

    this.updateDisplayedItems();

    if (this.overlayModel) {
      this.overlayModel.dispatch('refresh');
    }
  }

  input_onFocusHandler() {
    this.open();
  }

  dropdown_mouseLeaveHandler() {
    // noop
  }

  dropdown_mouseDownOutsideHandler(event) {
    if (!hasAncestorWithId(event.target, this.id) && !hasAncestorWithClass(event.target, 'tag') && !hasAncestorWithClass(event.target, 'item')) {
      this.close();
    }
  }

  onClickHandler(event) {
    if (!hasAncestorWithClass(event.target, 'tag')) {
      this.open();
    }
  }

  item_selectHandler(item) {
    const {onChange,
           model, modelField,
           items,
           multiSelect = true,
           stateParent, stateField,
           autoSetSelectedItem = true} = this.props;

    if (!multiSelect) {
      this.close();
    }

    let selectedItems = this.props.selectedItems || this.state.selectedItems;

    selectedItems.push(item);

    this.update(selectedItems);

    this.refs.input.value = '';
    this.refs.input.focus();

    this.updateDisplayedItems();
  }

  tags_onDeleteHandler(item) {
    const {autoSetSelectedItem = true, stateParent, stateField, model, modelField, onChange} = this.props;

    let selectedItems = this.props.selectedItems || this.state.selectedItems;

    selectedItems.splice(selectedItems.indexOf(item), 1);

    this.update(selectedItems);

    this.updateDisplayedItems();
  }

  input_onPressKeyHandler(event) {
    if (event.keyCode === 8) {
      let selectedItems = this.props.selectedItems || this.state.selectedItems;

      selectedItems.splice(selectedItems.length - 1, 1);

      this.update(selectedItems);
    }
  }
}