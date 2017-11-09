import React from 'react';
import {ThemeModel, Dropdown, RingaComponent} from '../../../src/index';

import {find} from 'react-ringa';

/**
 * Note that this only works if the root of your application is wrapped in a <Theme> object, like the following example:
 *
 * import {Theme, OverlayContainer, ModalContainer, TooltipContainer} from 'ringa-fw-react';
 *
 * ...
 *
 * // In the root of your application layout...
 * render() {
 *  return <div classes="fill">
 *   <Theme classes="fill">
 *     <OverlayContainer global={true} classes="fill">
 *       <ModalContainer global={true} classes="fill">
 *         ... // Application content goes here
 *       </ModalContainer>
 *     </OverlayContainer>
 *     <TooltipContainer />
 *   </Theme>
 *  </Body>;
 *}
 */
class ThemeExample1 extends RingaComponent {
  constructor() {
    super();
  }

  render() {
    let items = [{
      label: 'Classic',
      value: 'classic'
    }, {
      label: 'Sunbeam',
      value: 'sunbeam'
    }];

    return <div className="fill">
      <h3>Select a Theme:</h3>
      <Dropdown items={items} onChange={this.dropdown_onChangeHandler} />
    </div>;
  }

  dropdown_onChangeHandler(item) {
    let theme = find(this, ThemeModel);

    theme.theme = item.value;
  }
}

export default ThemeExample1;
