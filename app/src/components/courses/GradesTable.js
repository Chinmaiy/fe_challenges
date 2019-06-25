import React from 'react';
import { Input, Header, Popup } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { getTableMetadata, getTableData } from '../../actions';
import Spinner from '../common/Spinner';

class GradesTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loadingData: true,
            loadingColumns: true,
            data: [],
            columns: [],
            totalPages: 0
        }

        this.modifiedDataRowsIndexes = new Set();
    }

    async componentDidMount() {

        const courseMetadata = await getTableMetadata(this.props.courseId, this.props.userInfo);

        const columns = courseMetadata.components;

        this.setState({
            columns,
            loadingColumns: false
        });
    }

    onFetchData = async (state, instance) => {
        //get all the information you need on pagination (page, pageSize), sorting, filtering  from state and call server to get data

        const { page, pageSize } = state;

        this.setState({
            data: [],
            loadingData: true
        });

        const responsePage = await getTableData(this.props.courseId, this.props.userInfo, page, pageSize, state.sorted[0]);

        this.setState({
            data: responsePage.content,
            loadingData: false,
            totalPages: responsePage.totalPages
        });
    }

    renderEditable = cellInfo => {
        return (
            <Input 
                fluid
                type="number"
                min={0}
                onChange={(syntheticEvent, { value }) => {
                    if(value >= 0) {
                        const data = [...this.state.data];
                        data[cellInfo.index].values[cellInfo.column.id] = parseFloat(value);
                        //compute other row values
                        this.state.columns.forEach(column => {
                            if(column.expression) {
                                const row = cellInfo.original;
                                const expression = column.expression;
                                const regexp = '(:)([^:]+)(:)';
                                const formattedIds = [...expression.matchAll(regexp)];
                                let exp = expression;
                                formattedIds.forEach(formattedId => {
                                    let replacement = row.values[formattedId[2]] ? row.values[formattedId[2]] : 0;
                                    exp = exp.replace(formattedId[0], replacement);
                                });
                                data[cellInfo.index].values[column.id] = eval(exp);
                            }
                        });
                        this.modifiedDataRowsIndexes.add(cellInfo.index);
                        console.log(this.modifiedDataRowsIndexes);
                        this.setState({ data });
                    }
                }}
                value={this.state.data[cellInfo.index][cellInfo.column.id]}
            >
            </Input>
        );
    }

    getColumnHeaderRenderer = serverSideColumnMetadata => {

        let header = <Header color="teal">{serverSideColumnMetadata.name}</Header>

        if(serverSideColumnMetadata.expression) {
            header = <Popup position="bottom center" content={serverSideColumnMetadata.expressionDisplay} trigger={header} />
        }

        return header;
    }

    getUIColumnMetadata = serverSideColumnMetadata => {

        let uiColumnMetadata = {
            Header: this.getColumnHeaderRenderer(serverSideColumnMetadata),
            id: serverSideColumnMetadata.id,
            sortable: false,
            accessor: row => row.values[serverSideColumnMetadata.id]
        };

        if(!serverSideColumnMetadata.expression) {
            if(serverSideColumnMetadata.type === 'STUDENT') {
                uiColumnMetadata.sortable = true;
            } else {
                uiColumnMetadata.Cell = this.renderEditable;
            }
        }

        return uiColumnMetadata;
    };

    render() {

        if(this.state.loadingColumns) {
            return <Spinner/>
        }

        return (
            <ReactTable 
                loading={this.state.loadingData}
                data={this.state.data}
                pages={this.state.totalPages}
                onFetchData={this.onFetchData}
                manual
                columns={this.state.columns.map(this.getUIColumnMetadata)}
                pageSizeOptions={[10, 25, 50]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        );
    }
}

export default GradesTable;