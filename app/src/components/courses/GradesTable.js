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

        console.log(this.props);

        const courseMetadata = await getTableMetadata(this.props.courseId, this.props.userInfo);

        const columns = courseMetadata.components;

        this.setState({
            columns,
            loadingColumns: false
        });
    }

    onFetchData = async (state, instance) => {
        //get all the information you need on pagination (page, pageSize), sorting, filtering  from state and call server to get data
        console.log(state);
        console.log(instance);

        this.setState({
            loadingData: true
        });

        const data = await getTableData(); //pass needed information here

        this.setState({
            data,
            loadingData: false
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

        if(serverSideColumnMetadata.displayExpression) {
            header = <Popup position="bottom center" content={serverSideColumnMetadata.expressionDisplay} trigger={header} />
        }

        return header;
    }

    getUIColumnMetadata = serverSideColumnMetadata => {

        let uiColumnMetadata = {
            Header: this.getColumnHeaderRenderer(serverSideColumnMetadata),
            id: serverSideColumnMetadata.id
        };

        //should move this part in a separate module
        if(serverSideColumnMetadata.expression) {
            uiColumnMetadata.accessor = row => {
                const expression = serverSideColumnMetadata.expression;
                const regexp = '(:)([^:]+)(:)';
                const formattedIds = [...expression.matchAll(regexp)];
                console.log(formattedIds);
                let exp = expression;
                formattedIds.forEach(formattedId => {
                    exp = exp.replace(formattedId[0], row[formattedId[2]]);
                });
                return eval(exp);
            }
        } else {
            uiColumnMetadata.accessor = row => row[serverSideColumnMetadata.id];
            uiColumnMetadata.Cell = this.renderEditable;
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