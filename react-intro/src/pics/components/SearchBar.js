import React from 'react';

//make controlled elements i.e. move the source of truth from DOM to React (by using state)
class SearchBar extends React.Component {

    state = { 
        term: ''
    };

    //arrow functions automatically bind this 
    onFormSubmit = (event) => {
        event.preventDefault(); // do not refresh (default behavior for forms)
        this.props.onSubmit(this.state.term);
    }

    render() {
        return (
            <div className="search-bar ui segment" onSubmit={this.onFormSubmit}>
                <form className="ui form">
                    <div className="field">
                        <label htmlFor="search-input">Image Search</label>
                        <input 
                            type="text" name="search-input" id="search-input"
                            value={this.state.term}
                            onChange={e => this.setState({ term: e.target.value })}
                        />
                    </div>
                </form>
            </div>
        );
    }

};

export default SearchBar;