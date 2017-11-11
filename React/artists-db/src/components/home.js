
import React, { Component } from 'react';

// components
import Banner from '../components/banner';
import Artistlists from './artistlist';


const URL_ARTISTS = 'http://localhost:3004/artists';


class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            artists: ''
        }
    }

// Fetch information from json file //
    componentDidMount(){
        fetch(URL_ARTISTS, {
            method:'GET'
        })
        .then(response => response.json())
        .then(json => {
            this.setState({
                artists: json
            })
        })
    }


    render(){
        return(
            <div>
                <Banner />
                <Artistlists allArtists={this.state.artists} />
            </div>
        )
    }
}

export default Home;
