import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import { enroll, isEnrolled } from '../../actions';

class Course extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCurrentUserEnrolled: null,
            isCurrentUserOwner: props.ownerId === props.userInfo.id,
            isStudent: props.userInfo.roles.includes('STUDENT'),
            isProfessor: props.userInfo.roles.includes('PROFESSOR')
        };
    }

    async componentDidMount() {
        if(this.state.isStudent) {
            const isCurrentUserEnrolled = await isEnrolled(this.props.userInfo, this.props.courseId);
            this.setState({
                isCurrentUserEnrolled
            });
        }
    }

    render() {

        const imgSrc = this.props.imgSrc || '/img/img_na.png';
        const { name, description, ownerId, ownerName, ownerUsername } = this.props;

        return (
            <Card color="teal">
                <Image size="tiny" src={imgSrc} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        <span>
                            Professor: 
                            <Link to={{
                                pathname: `/${ownerUsername}`,
                                state: {
                                    userId: `${ownerId}`
                                }
                            }}>
                                {ownerName}
                            </Link>
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
                {
                    this.renderNavigationButtons()
                }
                
            </Card>
        );
    }

    renderNavigationButtons() {

        const { courseId } = this.props;

        return (
            <Card.Content extra textAlign="center">

                <Button as={Link} to={`/courses/${courseId}`} color="teal">View</Button> 
                {this.renderEnrollButton()}
                
            </Card.Content>
        );
    }

    renderEnrollButton() {
        if(this.state.isStudent) {
            const enrolled = this.state.isCurrentUserEnrolled;
            if(enrolled !== null && !enrolled) {
                return  <Button color="teal" onClick={this.onEnrollBtnClick}>Enroll</Button>
            }
        }
    }

    onEnrollBtnClick = async (event, btnProps) => {
        const { success } = await enroll(this.props.userInfo, this.props.courseId);

        toast({
            title: `${success ? '' : 'Not '}Enrolled in ${this.props.name}`,
            type: success ? 'info' : 'error',
            color: success ? 'teal' : 'red',
            size: 'small',
            time: 5000,
            animation: 'slide left'
        });

        this.setState({
            isCurrentUserEnrolled: success
        });
    }
}

export default Course;