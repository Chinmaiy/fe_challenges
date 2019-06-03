import React from 'react';
import { connect } from 'react-redux';
import { Card, Image, Dropdown } from 'semantic-ui-react';

import { logout } from '../../actions';

class Profile extends React.Component {

    render() {

        const { imageSrc, name, description } = this.props;
 
        return (
            <Card>
                <Image src={imageSrc} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Joined in 2015</span>
                    </Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Dropdown text="More" item>
                        <Dropdown.Menu>
                            <Dropdown.Item icon='edit' text='Edit Profile' />
                            <Dropdown.Item icon='sign out' text='Logout' onClick={this.props.logout}/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(null, { logout })(Profile);
