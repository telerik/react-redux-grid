import * as React from 'react';

import { Grid, GridColumn } from '@progress/kendo-grid-react-wrapper';

export default class ReduxGrid extends React.Component<any, any> {
    private widgetInstance: kendo.ui.Grid = null;
    private options: any = null;

    constructor(props: any) {
        super(props);

        this.widgetRef = this.widgetRef.bind(this);

        this.options = {
            selectable: true,
            filterable: true,
            groupable: true,
            sortable: {
                mode: 'multiple',
                allowUnsort: true,
                showIndexes: true
            },
            pageable: true,
            widgetRef: this.widgetRef,
            sort: this.props.onSort,
            group: this.props.onGroup,
            page: this.props.onPage,
            editable: 'popup',
            toolbar: ['create'],
            save: this.props.onSave,
            remove: this.props.onRemove,
            filter: this.props.onFilter
        };
    }

    widgetRef(widget: kendo.ui.Grid) {
        this.widgetInstance = widget;
    }

    render() {
        const { products, sort, group, page, filter, pageSize } = this.props;
        const serverSorting = true;
        const serverGrouping = true;
        const serverPaging = true;
        const serverFiltering = true;

        const dataSource = new kendo.data.DataSource({
            data: products,
            sort, group, page, filter,
            serverSorting, serverGrouping, serverPaging, serverFiltering, pageSize,
            schema: {
                model: {
                    id: 'ProductID',
                    fields: {
                        ProductID: { editable: false, nullable: true },
                        ProductName: { validation: { required: true } },
                        UnitPrice: { type: 'number', validation: { required: true, min: 1 } },
                        UnitsInStock: { type: 'number', validation: { min: 0, required: true } },
                        Discontinued: { type: 'boolean' }
                    }
                },
                total: 'total'
            }
        });

        return (
            <div style={{ 'marginBottom': '30px' }}>
                <Grid dataSource={dataSource} {...this.options}>
                    <GridColumn field="ProductID" title="ID" filterable={false} key={1} />
                    <GridColumn field="ProductName" title="Product Name" key={2} />
                    <GridColumn field="UnitPrice" title="Unit Price" format="{0:c}" width="130px" key={3} />
                    <GridColumn field="UnitsInStock" title="Units In Stock" width="130px" key={4} />
                    <GridColumn field="Discontinued" width="130px" key={5} />
                    <GridColumn command={[{'name': 'edit'}, {'name': 'destroy'}]} title="&nbsp;" width="250px" key={6}/>
                </Grid>
            </div>
        );
    }
}
