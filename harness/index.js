import React from 'react';
import { render } from 'react-dom';
import 'react-router';
import { BrowserRouter } from 'react-router-dom';

import routes from './routes';

render(<BrowserRouter>{routes}</BrowserRouter>, document.querySelector('.react-app'));
