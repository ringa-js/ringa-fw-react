import React from 'react';
import {List} from '../../../src/index';

import HarnessBase from '../HarnessBase';

import './ListHarness.scss';

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
    return <div className="list-harness">
      <div className="super-group">
        <label>Basic</label>
        <div className="flex-space-between-wrap">
          <div className="group">
            <section>
              <List items={this.items} />
            </section>
          </div>
        </div>
      </div>
      <div className="super-group">
        <label>Multi-select</label>
        <div className="flex-space-between-wrap">
          <div className="group">
            <section>
              <List multiSelect={true}
                    items={this.multiSelectItems} />
            </section>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default ListHarness;
