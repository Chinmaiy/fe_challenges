import React from 'react';
import 
{
    Image,
    Icon,
    Header
} from 'semantic-ui-react';

const Logo = props => {

    return (
        <Header icon textAlign='center' 
                size="huge">
            <Icon>
                <Image src="/img/logo.png" size="small" circular/>
            </Icon>
            <Header.Content>FiiGrade</Header.Content>
        </Header>
    );
};

export default Logo;