import { connect } from 'react-redux';
import { sort, group, page, filter, remove, add, update } from './actions';
import ReduxGrid from './ReduxGrid';


const mapStateToProps = (state) => ({
  products: state.products,
  sort: state.sort,
  group: state.group,
  filter: state.filter,
  page: state.page,
  pageSize: state.pageSize
});

const mapDispatchToProps = (dispatch) => ({
  onSort: (event: any) => {
    event.preventDefault();
    dispatch(sort(event.sort));
  },
  onGroup: (event: any) => {
    event.preventDefault();
    dispatch(group(event.groups));

  },
  onPage: (event: any) => {
    event.preventDefault();
    dispatch(page(event.page));
  },
  onRemove: (event: any) => {
    event.preventDefault();
    dispatch(remove(event.model.ProductID));
  },
  onSave: (event: any) => {
    event.preventDefault();
    dispatch(event.model.id ? update(event.model) : add(event.model));
  },
  onFilter: (event: any) => {
    event.preventDefault();
    dispatch(filter(event.filter));
  }
});

const ReduxGridCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxGrid);

export default ReduxGridCont;
