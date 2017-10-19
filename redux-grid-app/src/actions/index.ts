import { SortDescriptor, CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import * as n from './names';

export const sort = function (sortDesc: SortDescriptor) {
    return {
        type: n.SORT,
        sort: sortDesc
    };
};

export const group = function (groupDesc: [SortDescriptor]) {
    return {
        type: n.GROUP,
        group: groupDesc
    };
};

export const page = function (pageNumber: number) {
    return {
        type: n.PAGE,
        page: pageNumber
    };
};

export const remove = function (productID: number) {
    return {
        type: n.REMOVE,
        ProductID: productID
    };
};

export const add = function (model: any) {
    return {
        type: n.ADD,
        model
    };
};

export const update = function (model: any) {
    return {
        type: n.UPDATE,
        model
    };
};

export const filter = function (filterDesc: CompositeFilterDescriptor | FilterDescriptor) {
    return {
        type: n.FILTER,
        filter: filterDesc
    };
};
