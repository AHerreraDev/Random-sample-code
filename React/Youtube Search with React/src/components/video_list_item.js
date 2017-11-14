
import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
    const imageURL = video.snippet.thumbnails.default.url;

    return(
        <li onClick={()=> onVideoSelect(video)}  className='list_group_item'>
            <div className='video_list_media'>
                <div className='media_left'>
                    <img className='media-object' src={imageURL} />
                </div>

                <div className='media_body'>
                    <div className='media_heading'>{video.snippet.title} </div>
                </div>
            </div>
        </li>
)}

export default VideoListItem;
