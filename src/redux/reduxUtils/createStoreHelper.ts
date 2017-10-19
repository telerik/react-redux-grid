import { createStore, applyMiddleware } from 'redux';

import reducer from './../reducers';
import { createInitialState } from './createState';
import * as actionNames from './../actions/names';

// The ProductsMiddleware:
// - handles CUD operations
// - assigns all available products to each action
function createProductsMiddleware(products: any) {
    return store => next => action => {
        switch (action.type) {
            case actionNames.REMOVE:
                products.splice(products.findIndex(pr => pr.ProductID === action.ProductID), 1);
                break;
            case actionNames.ADD:
                let product = action.model.toJSON();
                product.ProductID = Math.max(...products.map(pr => pr.ProductID));
                product.ProductID++;
                products.unshift(product);
                break;
            case actionNames.UPDATE:
                products[products.findIndex(el => el.ProductID === action.model.ProductID)] = action.model.toJSON();
                break;
            default:
                break;
        }

        action.allProducts = products;

        return next(action);
    };
}

export function createStoreHelper(products: any): any {
    return createStore(
        reducer,
        createInitialState(products),
        applyMiddleware(createProductsMiddleware(products)));
}