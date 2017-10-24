import { connect } from 'react-redux';
import { sort, group, page, filter, remove, add, update } from './../redux/actions';
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
    setTimeout(function () { dispatch(sort(event.sort)); }, 100);
  },
  onGroup: (event: any) => {
    event.preventDefault();
    setTimeout(function () { dispatch(group(event.groups)); }, 100);
  },
  onPage: (event: any) => {
    event.preventDefault();
    setTimeout(function () { dispatch(page(event.page)); }, 100);
  },
  onRemove: (event: any) => {
    event.preventDefault();
    setTimeout(function () {  dispatch(remove(event.model.ProductID)); }, 100);
  },
  onSave: (event: any) => {
    event.preventDefault();
    setTimeout(function () { dispatch(event.model.id ? update(event.model) : add(event.model)); }, 100);
  },
  onFilter: (event: any) => {
    event.preventDefault();
    setTimeout(function () { dispatch(filter(event.filter)); }, 100);
  }
});

const ReduxGridCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxGrid);

export default ReduxGridCont;
