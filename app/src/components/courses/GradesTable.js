import React from 'react';
import { Input, Header, Popup } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { getTableMetadata, getTableData } from '../../actions';
import Spinner from '../common/Spinner';

class GradesTable extends React.Component {

    state = {
        loadingData: true,
        loadingColumns: true,
        data: [],
        columns: [],
        totalPages: 0
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
            loadingData: true
        });

        const responsePage = await getTableData(this.props.courseId, this.props.userInfo, page, pageSize, state.sorted[0]); //pass needed information here

        this.setState({
            data: this.extractRowData(responsePage),
            loadingData: false
        });
    }

    extractRowData = (responsePage) => {
        return responsePage.content.map(obj => obj.values);
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
                        data[cellInfo.index][cellInfo.column.id] = value;
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
            sortable: false
        };

        //should move this part in a separate module
        if(serverSideColumnMetadata.expression) {
            uiColumnMetadata.accessor = row => {
                const expression = serverSideColumnMetadata.expression;
                const regexp = '(:)([^:]+)(:)';
                const formattedIds = [...expression.matchAll(regexp)];
                let exp = expression;
                formattedIds.forEach(formattedId => {
                    let replacement = row[formattedId[2]] ? row[formattedId[2]] : 0;
                    exp = exp.replace(formattedId[0], replacement);
                });
                return eval(exp);
            }
        } else {
            uiColumnMetadata.accessor = row => row[serverSideColumnMetadata.id];
            if(serverSideColumnMetadata.type !== 'STUDENT') {
                uiColumnMetadata.Cell = this.renderEditable;
            } else {
                uiColumnMetadata.sortable = true;
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
                defaultPageSize={10}
                className="-striped -highlight"
            />
        );
    }
}

export default GradesTable;