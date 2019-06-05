import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';

class Course extends React.Component {

    state = {
        enrolled:  false
    }

    render() {

        const imgSrc = this.props.imgSrc || '/img/img_na.png';
        const { name, description } = this.props;

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
                    !this.state.enrolled ?
                        (<Card.Content extra textAlign="center">
                            <Button color="teal" onClick={this.onEnrollBtnClick}>Enroll</Button>
                        </Card.Content>) : ''
                }
                
            </Card>
        );
    }

    onEnrollBtnClick = (event, btnProps) => {
        toast({
            title: 'Enrolled',
            type: 'info',
            color: 'teal',
            size: 'small',
            time: 5000,
            animation: 'slide left'
        });
        //make api call wait for success response (could delete from state to not display it anymore)
        this.setState({
            enrolled: true
        });
    }
}

export default Course;