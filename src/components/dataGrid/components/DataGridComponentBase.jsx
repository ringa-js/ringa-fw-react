import React from 'react';

import DataGridModel from '../models/DataGridModel';
import I18NModel from '../../../models/I18NModel';

import RingaComponent from '../../RingaComponent';

import {dependency} from 'react-ringa';

export default class DataGridComponentBase extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props, dataGridModelPropertyWatches) {
    super(props);

    this.depend(
      dependency(DataGridModel, dataGridModelPropertyWatches),
      dependency(I18NModel, 'language'));
  }
}
