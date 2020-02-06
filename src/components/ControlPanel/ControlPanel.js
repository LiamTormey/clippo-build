import React, { useState, useEffect } from 'react' 
import {setVideoID} from '../../actions/video'
import FieldInput from "../common/FieldInput"
import Panel from "./Panel"
import {setTimestampsEnabled} from "../../actions/timestamps"
import TimestampStore from "../../stores/timestamps"
import VideoStore from "../../stores/video"
import { unstable_renderSubtreeIntoContainer } from 'react-dom'

export default (props) => { 

    //https://www.youtube.com/watch?v=pxw-5qfJ1dk&t=5914s
    const [url, setURL] = useState("")
    const [stampsEnabled, setStampsEnabled] = useState(TimestampStore.getEnabled())

    function updateEnabled(){
        setStampsEnabled(TimestampStore.getEnabled())
    }

    function changeVideo(url) { 
        //dont reload the video url if its already what we're playing
        try {
            if(VideoStore.getVideoID() == (new URL(url)).searchParams.get('v')) {
                console.log("Tried to refresh but video id is the same")
                return; 
            }    
        } catch(e) { 

        }
        
        try {
            const theURL = new URL(url)
            const videoID = theURL.searchParams.get('v')
            if(videoID) { 
                setVideoID(videoID)
            }
        } catch(e) {
            console.error("wow we got an errorr", Object.keys(e))
        }
    }

    useEffect(()=>{
        TimestampStore.on('change', updateEnabled)
        VideoStore.on('change', ()=>{/*changeVideo(url)*/})
        //changeVideo(url)
        return function cleanUp() { 
            TimestampStore.removeListener('change', updateEnabled);
        }
    })
    changeVideo(url)
    
    

    function change(e) { 
        setURL(e.target.value)
    }

    function playTimestampsEnabledChange(e) { 
        setTimestampsEnabled(e.target.checked)
    }
    
    return(<> 
        <FieldInput title={"URL"} value={url} onChange={change}></FieldInput>
        <div> 
            Play Timestamps <input checked={TimestampStore.getEnabled()} onChange={playTimestampsEnabledChange}type="checkbox"/>
            Repeat Timestamp <input type="checkbox"/>
        </div> 
    </>);
}