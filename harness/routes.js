/* eslint-disable no-console */
import React from 'react';
import { Route } from 'react-router';

import ApplicationLayout from './layout/ApplicationLayout';

export const routeMap = {
  'Home': '/',
  'List': '/list',
  'TabNavigator': '/tabNavigator',
  'TextInput': '/textInput',
  'Form': '/form',
  'Scroll Container': '/scrollContainer',
  'Theme': '/theme',
  'NumberInput': '/numberInput',
  'Checkbox': '/checkbox',
  'RadioButton': '/radioButton',
  'I18N': '/i18n',
  'Screen / Devices': '/screen',
  'DebugInspector': '/debugInspector',
  'DataGrid': '/dataGrid',
  'Alert': '/alert',
  'Modal': '/modal'
};

const _routeMapInverted = {};

for (let key in routeMap) {
  _routeMapInverted[routeMap[key]] = key;
}

export const routeMapInverted = _routeMapInverted;

export default (
  <Route path="/" component={ApplicationLayout} />
);

/* eslint-enable no-console */
