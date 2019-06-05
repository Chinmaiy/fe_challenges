import React from 'react';
import LeftMenu from '../common/LeftMenu';

export class DashboardPage extends React.Component {

    render() {
        return (
            <div>
                <LeftMenu />
                <div className="right-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export const renderWithDashboard = (component) => props => {
    return (
        <DashboardPage>
            {
                React.cloneElement(component, {...props, key: props.location.pathname } )
            }
        </DashboardPage>
    );
};