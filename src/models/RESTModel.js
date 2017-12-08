import {Model} from 'ringa';

export default Model.construct('RESTModel', [{
    name: 'calls',
    default: 0
  },
  {
    name: 'activeCalls',
    default: 0
  }]);
