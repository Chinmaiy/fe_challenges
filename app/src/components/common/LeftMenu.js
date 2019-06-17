import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Profile from './Profile';

import { leftMenuClicked } from '../../actions';

class LeftMenu extends React.Component {

    render() {
    
        return (
            <Menu vertical fixed="left" color="teal">

                <Menu.Item>
                    <Profile userInfo={this.props.userInfo}/>
                </Menu.Item>

                <Menu.Item>
                    Courses
                    <Menu.Menu>

                        {this.renderCoursesMenuItems()}
                        
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        );
    }

    renderCoursesMenuItems() {
        const { roles } = this.props.userInfo;
        const { activeItem } = this.props;

        const menuItems = [];
        menuItems.push(
            <Menu.Item
                as={Link}
                to='/courses'
                name='all'
                key='all'
                active={activeItem === 'all'}
                onClick={this.handleItemClick}
            >
                All
            </Menu.Item>);

        menuItems.push(
            <Menu.Item 
                as={Link}
                to={`/${this.props.userInfo.username}/courses`}
                name='own'
                key='own' 
                active={activeItem === 'own'} 
                onClick={this.handleItemClick}>
                Own
            </Menu.Item>);

        if(roles && roles.includes("PROFESSOR")) {
            
            menuItems.push(
                <Menu.Item
                    as={Link}
                    to={`/courses/create`}
                    name='create-course'
                    key='create-course'
                    active={activeItem === 'create-course'}
                    onClick={this.handleItemClick}
                >
                    Create
                </Menu.Item>
            );
        }

        return (
            <React.Fragment>
                {menuItems}
            </React.Fragment>
        )
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