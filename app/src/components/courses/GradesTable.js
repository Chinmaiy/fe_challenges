import React from 'react';
import { Table } from 'semantic-ui-react';
import { getGradesTableData } from '../../actions';
import Spinner from '../common/Spinner';

class GradesTable extends React.Component {

    state = {}

    async componentDidMount() {
        const tableData = await getGradesTableData(this.props.courseId);
        this.setState({
            columns: tableData.columns 
        })
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

    render() {

        if(!this.state.columns) {
            return <Spinner/>
        }

        return (
            <Table celled columns={this.state.columns.length}>
                { this.renderTableHeader() }
            </Table>
        );
    }
}

export default GradesTable;