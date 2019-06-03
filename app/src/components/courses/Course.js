import React from 'react';
import { Card, Image} from 'semantic-ui-react';

class Course extends React.Component {


    render() {

        const imgSrc = this.props.imgSrc || '/img/img_na.png';

        return (
            <Card>
                <Image src={imgSrc} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>Course Name</Card.Header>
                    <Card.Description>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum sint voluptas illum aperiam perspiciatis. 
                        Asperiores dolores quisquam fugit assumenda molestias veniam, minus exercitationem libero commodi consequatur, 
                        itaque vitae temporibus deleniti!
                    </Card.Description>
                    </Card.Content>
            </Card>
        );
    }
}

export default Course;