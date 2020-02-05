import React, { useState } from 'react' 
import {setVideoID} from '../../actions/video'

export default (props) => { 

    const [url, setURL] = useState("https://www.youtube.com/watch?v=pxw-5qfJ1dk&t=5914s")

    function changeVideo(url) { 
        try {
            const theURL = new URL(url)
            const videoID = theURL.searchParams.get('v')
            if(videoID) { 
                setVideoID(videoID)
            }
        } catch(e) {
            console.error("wow we got an error", e)
        }
    }
    
    changeVideo(url)
    

    function change(e) { 
        console.log('change event', e)
        setURL(e.target.value)
    }
    
    return(<> 
        
        <input style={{width:'100%'}}value={url} onChange={change} />
    </>);
}