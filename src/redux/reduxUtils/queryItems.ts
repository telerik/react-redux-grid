import { groupBy, orderBy, filterBy } from '@progress/kendo-data-query';

function getItemsPerPage(items: any, page: number, pageSize: number) {
    return items.slice((page - 1) * pageSize, page * pageSize);
}

function parseDiscontinued(filter: any) {
    if (filter.filters) {
        filter.filters = filter.filters.map((fltr) => {
            return parseDiscontinued(fltr);
        });
    } else {
        if (filter.field === 'Discontinued') {
            filter.value = filter.value === 'true' || filter.value === true;
        }
    }
    return filter;
}

export default function (
    items: any,
    page: number,
    pageSize: number,
    sortDescriptors: any,
    groupDescriptors: any,
    filter: any) {
    if (filter) {
        filter = parseDiscontinued(filter);
    }

    let result: any = filterBy(items, filter);
    const itemsLength = result.length;
    result = orderBy(result, groupDescriptors.concat(sortDescriptors));
    result = getItemsPerPage(result, page, pageSize);
    result = groupBy(result, groupDescriptors);
    result = toGroupable(result);
    result.total = itemsLength;

    return result;
}

export function toGroupable(data: any) {
    if (Array.isArray(data)) {
        data = data.map(tmp => {
            if (tmp.items) {
                tmp.items = tmp.items.map((item) => {
                    if (item.items) {
                        tmp.hasSubgroups = true;
                    }
                    return toGroupable(item);
                });
            }
            return tmp;
        });
    } else {
        if (data.items) {
            data.items = data.items.map(item => {
                if (item.items) {
                    data.hasSubgroups = true;
                }
                return toGroupable(item);
            });
        }
    }

    return data;
}
