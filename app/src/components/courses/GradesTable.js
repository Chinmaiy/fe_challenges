import React from 'react';
import { Table } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { getGradesTableData } from '../../actions';
import Spinner from '../common/Spinner';

class GradesTable extends React.Component {

    state = {
        data: [
            {
                C1: 1,
                C2: 2,
                C3: 4
            }

        ],
        columns: [
            {
                id: 1,
                name: 'Component 1',
                type: 'NUMERIC'
            },
            {
                id: 2,
                name: 'Component 2',
                type: 'NUMERIC'
            },
            {
                id: 3,
                name: 'Total',
                type: 'NUMERIC',
                expression: ':Component 1: + :Component 2: + 1'
            }
        ]
    }

    async componentDidMount() {
        // const tableData = await getGradesTableData(this.props.courseId);
        // this.setState({
        //     columns: tableData.columns 
        // })
    }

    renderTableHeader = () => {
        return (
            <Table.Header>
                <Table.Row>
                    {
                        this.state.columns.map(column => 
                            <Table.HeaderCell>{column.name}</Table.HeaderCell>
                        )
                    }
                </Table.Row>
            </Table.Header>
        );
    }

    renderEditable = cellInfo => {
        console.log(cellInfo);
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.data];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
            }}
          >
              {console.log(this.state.data)}
          {this.state.data[cellInfo.index][cellInfo.column.id]}
          </div>
        );
    }

    render() {

        // if(!this.state.columns) {
        //     return <Spinner/>
        // }

        // return (
        //     <Table celled columns={this.state.columns.length}>
        //         { this.renderTableHeader() }
        //     </Table>
        // );
        return (
            <ReactTable 
                data={this.state.data}
                columns={[
                    {
                        Header: 'Component 1',
                        id: 'C1',
                        accessor: d => d[1],
                        Cell: this.renderEditable
                    },
                    {
                        Header: 'Component 2',
                        id: 'C2',
                        accessor: d => d[2],
                        Cell: this.renderEditable
                    },
                    {
                        Header: 'Total',
                        id: 'C3',
                        accessor: d => d['C3'] //to do evaluate formula if the case
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        );
    }
}

export default GradesTable;