import React from 'react';
import { Input } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { getGradesTableData } from '../../actions';
import Spinner from '../common/Spinner';

class GradesTable extends React.Component {

    state = {
        loading: false,
        data: [
            {
                "C1": 1,
                "C2": 2,
                "C3": 4
            },
            {
                "C1": 11,
                "C2": 12,
                "C3": 14
            }

        ],
        columns: [
            {
                id: 'C1',
                name: 'Component 1',
                type: 'NUMERIC'
            },
            {
                id: 'C2',
                name: 'Component 2',
                type: 'NUMERIC'
            },
            {
                id: 'C3',
                name: 'Total',
                type: 'NUMERIC',
                expression: ':C1: + :C2: + 1'
            }
        ]
    }

    async componentDidMount() {
        //get column data
        // const tableData = await getGradesTableData(this.props.courseId);
        // this.setState({
        //     columns: tableData.columns 
        // })
    }

    renderEditable = cellInfo => {
        return (
            <Input 
                fluid
                type="number"
                min={0}
                onChange={(e, { value }) => {
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

    render() {

        // if(!this.state.columns) {
        //     return <Spinner/>
        // }

        return (
            <ReactTable 
                loading={this.state.loading}
                data={this.state.data}
                columns={[
                    {
                        Header: 'Component 1',
                        id: this.state.columns[0].id,
                        accessor: d => d[this.state.columns[0].id],
                        Cell: this.renderEditable
                    },
                    {
                        Header: 'Component 2',
                        id: this.state.columns[1].id,
                        accessor: d => d[this.state.columns[1].id],
                        Cell: this.renderEditable
                    },
                    {
                        Header: 'Total',
                        id: 'C3',
                        accessor: d => {
                            const expression = this.state.columns[2].expression;
                            const regexp = '(:)([^:]+)(:)';
                            const formattedIds = [...expression.matchAll(regexp)];
                            let exp = expression;
                            formattedIds.forEach(formattedId => {
                                exp = exp.replace(formattedId[0], d[formattedId[2]]);
                            });
                            console.log(exp);
                            console.log(eval(exp));
                            return eval(exp);
                        }
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        );
    }
}

export default GradesTable;