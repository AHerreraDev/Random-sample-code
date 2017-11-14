
import React, { Component } from 'react';

// Class based component
// ES6 Class
// Extend component includes functionality to our Class

class SearchBar extends Component {
    // state
    constructor(props) {
        super(props);

        this.state = {term: ''};
    }


    render() {
        return (
            <div>
                <input onChange={event => this.onInputChange(event.target.value)} placeholder='Seach for a video'/>
            </div>
        );
    }

    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}



export default SearchBar;
