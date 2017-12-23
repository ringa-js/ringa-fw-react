import React from 'react';
import {Button, RingaComponent, Alert} from '../../../src/index';

class AlertExample1 extends RingaComponent {
  constructor() {
    super();
  }

  render() {
    return <div>
      <Button label="Show Ok/Cancel" onClick={this.showOkCancelClickHandler}/>
      <Button label="Show Ok" onClick={this.showOkClickHandler}/>
      <Button label="Show Yes/No" onClick={this.showYesNoClickHandler}/>
    </div>;
  }

  showOkCancelClickHandler() {
    Alert.show('Ok/Cancel', Alert.OK_CANCEL, {}, this.rootDomNode).then(result => {
      console.log(result);
    });
  }

  showOkClickHandler() {
    Alert.show('Ok', Alert.OK, {}, this.rootDomNode).then(result => {
      console.log(result);
    });
  }

  showYesNoClickHandler() {
    Alert.show('Yes/No', Alert.YES_NO, {}, this.rootDomNode).then(result => {
      console.log(result);
    });
  }
}

export default AlertExample1;
