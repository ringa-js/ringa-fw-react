import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import TabNavigator from '../../../src/components/containers/TabNavigator';
import Tab from '../../../src/components/containers/Tab';

import './ListHarness.scss';

import ListExample1 from './ListExample1';
import ListExample1Code from './ListExample1.txt';
import ListExample2 from './ListExample2';
import ListExample2Code from './ListExample2.txt';

class ListHarness extends HarnessBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();

    this.items = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ];

    this.multiSelectItems = this.items.map(label => ({label}));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <div className="harness-wrapper">
      <div className="list-harness">
        {this.renderHeader('list.title', '^0.0.7', 'list.description', 'import {List} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/input/List.jsx')}
        <TabNavigator classes="fill">
          <Tab label="Basic">
            <CodeExample code={ListExample1Code} classes="fill">
              <ListExample1 />
            </CodeExample>
          </Tab>
          <Tab label="Multi-Select">
            <CodeExample code={ListExample2Code} classes="fill">
              <ListExample2 />
            </CodeExample>
          </Tab>
        </TabNavigator>
      </div>
    </div>;
  }
}

export default ListHarness;
