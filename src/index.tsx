import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@progress/kendo-ui';
import ReduxGrid from './Grid/ReduxGridCont';
import { Provider } from 'react-redux';
import { products } from './products';
import { createStoreHelper } from './redux/reduxUtils/createStoreHelper';

import '@progress/kendo-theme-default/dist/all.css';

ReactDOM.render(
<Provider store={createStoreHelper(products)}>
 <ReduxGrid />
</Provider>,
document.getElementById('root') as HTMLElement
);
