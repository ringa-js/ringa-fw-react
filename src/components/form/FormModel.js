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
  'message',
  'error'
]);