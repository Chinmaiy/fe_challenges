import React from 'react';
import { Segment, Label, Header, Popup } from 'semantic-ui-react';

import { getGradesCardData } from '../../actions';
import Spinner from '../common/Spinner';

const LabeledInfo = ({ label, detail, value }) => {
    let labelNode = 
        <Label size="big" color='teal' pointing='right'>
            {label}
        </Label>;
    if(detail) {
        labelNode = <Popup content={detail} trigger={labelNode} />;
    }
    return (
        <Header as="h1">
            {labelNode}
            {value}
        </Header>
    );
}

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
                <Label color='blue' ribbon>
                    {this.state.courseName}
                </Label>

                {this.state.data.map(component => <LabeledInfo key={component.name} detail={component.formula} label={component.name} value={component.value}/>)}
            </Segment>
        );
    }
}

export default GradesCard;