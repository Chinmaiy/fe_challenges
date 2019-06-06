import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import { enroll } from '../../actions';

class Course extends React.Component {

    state = {
        enrolled:  false
    }

    render() {

        const imgSrc = this.props.imgSrc || '/img/img_na.png';
        const { courseId, name, description } = this.props;

        return (
            <Card color="teal">
                <Image size="tiny" src={imgSrc} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
                {
                    
                    <Card.Content extra textAlign="center">
                            <Button as={Link} to={`/courses/${courseId}/grades`} color="teal">View</Button> 
                            { !this.state.enrolled ? (
                                <Button color="teal" onClick={this.onEnrollBtnClick}>Enroll</Button> 
                            ) : ''}
                            
                    </Card.Content> 
                }
                
            </Card>
        );
    }

    onEnrollBtnClick = async (event, btnProps) => {
        const { error, enrolled } = await enroll(this.props.courseId);
        //make api call wait for success response (could delete from state to not display it anymore)

        toast({
            title: `${error ? 'Not ' : ''}Enrolled`,
            type: error ? 'error' : 'info',
            color: error ? 'red' : 'teal',
            size: 'small',
            time: 5000,
            animation: 'slide left'
        });
        if(enrolled) {
            this.setState({
                enrolled
            });
        }
    }
}

export default Course;