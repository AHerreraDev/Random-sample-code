import React from 'react';
import {Link} from 'react-router-dom';

// Props is allArtists from Home.js
const Artistlists = (props) => {

    const list = ({allArtists}) => {

        if(allArtists){
            return allArtists.map((item) => {

                const style = {
                    background: `url('/images/covers/${item.cover}.jpg') no-repeat`
                }

                return(
                    <Link key={item.id} to={`/artist/${item.id}`} className="artist_item" style={style}>
                    <div>{item.name}</div>


                    </Link>
                )
            })
        }


    }

    return(
        <div className="artists_list">
            <h4>Browse List</h4>
            {list(props)}
        </div>
)




}

export default Artistlists;
