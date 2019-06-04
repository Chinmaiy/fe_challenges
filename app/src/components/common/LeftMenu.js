import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Profile from './Profile';

import { leftMenuClicked } from '../../actions';

class LeftMenu extends React.Component {

    render() {
        const { activeItem } = this.props;

        return (
            <Menu vertical fixed="left" color="teal">

                <Menu.Item>
                    <Profile
                        imageSrc="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                        name={this.props.userInfo.name}
                        description="Some more info about the user here."
                    />
                </Menu.Item>

                <Menu.Item>
                    Courses
                    <Menu.Menu>

                        <Menu.Item
                            as={Link}
                            to='/courses/all'
                            name='all'
                            active={activeItem === 'all'}
                            onClick={this.handleItemClick}
                        >
                            All
                        </Menu.Item>

                        <Menu.Item 
                            as={Link}
                            to="/courses/own"
                            name='own' 
                            active={activeItem === 'own'} 
                            onClick={this.handleItemClick}>
                            Own
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        );
    }

    handleItemClick = (e, { name }) => {
        this.props.leftMenuClicked(name);
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        activeItem: state.leftMenu.activeItem
    }
}

export default connect(mapStateToProps, { leftMenuClicked })(LeftMenu);