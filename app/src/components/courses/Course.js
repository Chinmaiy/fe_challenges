import React from 'react';
import { Card, Image} from 'semantic-ui-react';

class Course extends React.Component {


    render() {

        const imgSrc = this.props.imgSrc || '/img/img_na.png';
        const { name, description } = this.props;

        return (
            <Card>
                <Image src={imgSrc} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Description>
                        {description}
                    </Card.Description>
                    </Card.Content>
            </Card>
        );
    }
}

export default Course;