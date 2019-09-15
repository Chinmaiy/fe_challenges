import React from 'react';

class GroupSelection extends React.Component {

    constructor(props) {
        super(props);
        this.defaultOption = {
            key: 0,
            text: 'All',
            value: ''
        }
        const options = this.props.groups.map(group => {
            return {
                key: group.id,
                text: group.name,
                value: group.id
            }
         });
        this.state = {
            options
        };
    }

    render() {
        return (
            
                <select
                  onChange={event => {
                    this.props.onChange(event.target.value);
                  }}
                  style={{ width: '100%'}}
                >
                    <option value={this.defaultOption.value}>{this.defaultOption.text}</option>
                    {
                        this.state.options.map(option => <option key={option.key} value={option.value}>{option.text}</option>)
                    }
                </select>
        )
    }
}

export default GroupSelection;