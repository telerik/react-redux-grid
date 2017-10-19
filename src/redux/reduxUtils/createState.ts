import queryItems from './queryItems';

export default function createState(products: any, page: number, sort: any, group: any, filter: any) {
    return {
        products: queryItems(products, page, 10, sort, group, filter),
        sort,
        group,
        filter,
        page,
        pageSize: 10
    };
}

export function createInitialState(products: any) {
    return createState(products, 1, [], [], []);
}