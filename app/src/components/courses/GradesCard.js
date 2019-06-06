import React from 'react';
import { Segment, Label, Header } from 'semantic-ui-react';

import _ from 'lodash';

import { getGradesCardData } from '../../actions';
import Spinner from '../common/Spinner';

const LabeledInfo = ({ label, detail, value }) => (

    <Header as="h1">
        <Label size="medium" color='teal' pointing='right'>
            {label}
        </Label>
        {value}
    </Header>
);

class GradesCard extends React.Component {

    state = {}

    async componentDidMount() {
        console.log(this.props);
        const { courseName, data } = await getGradesCardData(this.props.courseId);
        this.setState({
            courseName,
            data: data
        });
    }

    render() {

        if(!this.state.data) {
            return <Spinner/>
        }

        return (
            <Segment compact raised>
                <Label color='red' ribbon>
                    {this.state.courseName}
                </Label>

                

                {this.state.data.map(component => <LabeledInfo key={component.name} label={component.name} value={component.value}/>)}
            </Segment>
        );
    }
}

export default GradesCard;