import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import * as actionNames from '../actions/names';
import createState from '../reduxUtils/createState';

function mergeSortDescriptors(sourceDescriptors: any, newDesciptor: any) {
  let result = [];
  let matchFound = false;

  sourceDescriptors.forEach(element => {
    if (element.field === newDesciptor.field) {
      // If the field was already sorted
      matchFound = true;
      if (newDesciptor.dir !== undefined) {
        // and the sorting is not removed, add the new descriptor.
        result.push(newDesciptor);
      }
    } else {
      // Preserve the not affected desciptors.
      result.push(element);
    }
  });

  if (!matchFound) {
    // If the field was not already sorted, add the new descriptor.
    result.push(newDesciptor);
  }

  return result;
}

export function mergeFilters(sourceFilters: any, newFilter: any): CompositeFilterDescriptor {
  let result: CompositeFilterDescriptor = { logic: 'and', filters: [] };
  // If a filter is presented
  if (sourceFilters.length || (sourceFilters.filters && sourceFilters.filters.length && newFilter)) {
    let isNewFilterInserted = false;
    // If a filter with the same target exists
    sourceFilters.filters.forEach((currentFilter) => {
      // If the current filter doesnt have nested filters and has the same target
      if (currentFilter.field === newFilter.filters[0].field) {
        let tmp: CompositeFilterDescriptor = { logic: newFilter.logic, filters: [] };
        newFilter.filters.forEach((fltr) => {
          // Insert all new filters
          tmp.filters.push(fltr);
        });
        result.filters.push(tmp);
      } else {
        // If the current filter DOES have nested filters and those filter has the same target
        if (currentFilter.filters && currentFilter.filters[0].field === newFilter.filters[0].field) {
          result.filters.push.apply(result.filters, newFilter);
        } else {
          // Copy all filters that does not have the same target into result
          result.filters.push(currentFilter);
        }
      }
    });
    // If the new filter hasnt been inserted into result
    if (!isNewFilterInserted) {
      result.filters.push(newFilter);
    }
  } else {
    // If the new filter is null, return empty array
    if (newFilter) {
      result.filters.push(newFilter);
    }
  }
  return result;
}

export default (state, action) => {
  switch (action.type) {
    case actionNames.SORT:
      return createState(
        action.allProducts,
        state.page,
        mergeSortDescriptors(state.sort, action.sort),
        state.group,
        state.filter);
    case actionNames.GROUP:
      return createState(action.allProducts, state.page, state.sort, action.group, state.filter);
    case actionNames.PAGE:
      return createState(action.allProducts, action.page, state.sort, state.group, state.filter);
    case actionNames.FILTER:
      return createState(
        action.allProducts,
        state.page,
        state.sort,
        state.group,
        mergeFilters(state.filter, action.filter));
    case actionNames.REMOVE:
    case actionNames.ADD:
    case actionNames.UPDATE:
      return createState(action.allProducts, state.page, state.sort, state.group, state.filter);
    default:
      return state;
  }
};

export const pageSize = 10;
