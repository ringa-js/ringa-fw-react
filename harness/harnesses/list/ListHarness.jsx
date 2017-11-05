import React from 'react';
import {List} from '../../../src/index';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';

import './ListHarness.scss';

import Example1 from './Example1.txt';
import Example2 from './Example2.txt';

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
        <h1>List Component</h1>
        <div className="super-group">
          <h2>Basic</h2>
          <CodeExample code={Example1}>
            <List items={this.items} />
          </CodeExample>
        </div>
        <div className="super-group">
          <h2>Multi-select</h2>
          <CodeExample code={Example1}>
            <List multiSelect={true}
                  items={this.multiSelectItems} />
          </CodeExample>
        </div>
      </div>
    </div>;
  }
}

export default ListHarness;
