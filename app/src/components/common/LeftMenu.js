import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import Profile from './Profile';

class LeftMenu extends React.Component {

    state = {
        activeItem: null
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Menu vertical fixed="left" stackable>

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
                            name='all'
                            active={activeItem === 'all'}
                            onClick={this.handleItemClick}
                        >
                            All
                        </Menu.Item>

                        <Menu.Item name='own' active={activeItem === 'own'} onClick={this.handleItemClick}>
                            Own
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        );
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(LeftMenu);