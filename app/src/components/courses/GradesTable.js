import React from 'react';
import { Container, Input, Header, Popup, Button, Divider } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { toast } from 'react-semantic-toasts';

import { getTableMetadata, getTableData, saveTableData } from '../../actions';
import Spinner from '../common/Spinner';

class GradesTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            courseName: '',
            loadingData: true,
            loadingColumns: true,
            data: [],
            columns: [],
            totalPages: 0,
            isModified: false
        }

        this.modifiedDataRowsIndexes = new Set();
    }

    async componentDidMount() {

        const courseMetadata = await getTableMetadata(this.props.courseId, this.props.userInfo);

        const columns = courseMetadata.components;

        this.setState({
            courseName: courseMetadata.name,
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

    onClickSave = async () => {

        const modifiedRows = this.state.data.filter((row, idx) => this.modifiedDataRowsIndexes.has(idx));
        
        const response = await saveTableData(this.props.courseId, modifiedRows, this.props.userInfo);

        const { success } = response;

        toast({
            title: `${success ? 'S' : 'Not s'}aved data for ${this.state.courseName}`,
            type: success ? 'info' : 'error',
            color: success ? 'teal' : 'red',
            size: 'small',
            time: 3000,
            animation: 'slide left'
        });

        if(success) {
            this.modifiedDataRowsIndexes = new Set();
            this.setState({
                isModified: false
            });
        }
    }

    renderEditable = cellInfo => {
        console.log(cellInfo);
        console.log(this.state.data);
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
                        this.setState({ 
                            data,
                            isModified: true 
                        });
                    }
                }}
                value={this.state.data[cellInfo.index].values[cellInfo.column.id]}
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
            <Container>
                <Header
                    as="h1"
                    color="teal"
                    content={`Grades - ${this.state.courseName}`}
                />
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
                <Divider />
                <Button disabled={!this.state.isModified} color="teal" content="Save" floated="right" onClick={this.onClickSave}/>
            </Container>
        );
    }
}

export default GradesTable;