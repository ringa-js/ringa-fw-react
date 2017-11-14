import {Model} from 'ringa';

export default Model.construct('FormModel', [
  {
    name: 'valid',
    default: true
  },
  {
    name: 'elements',
    default: []
  },
  {
    name: 'rerunValidationsOnTouchedElements',
    default: false
  },
  'message',
  'error'
]);
