import React, { useState, useEffect } from 'react' 
import styleModule from './style.module.css'
import YoutubeVideo from "../../components/YoutubeVideo/YoutubeVideo"
import Timestamps from "../../components/Timestamps/Timestamps"
import {setTimestamps, addTimestamp, nextActive} from "../../actions/timestamps"
import TimestampsStore from "../../stores/timestamps"
import {setVideoID, setVideoPlayer} from "../../actions/video"
import ControlPanel from '../../components/ControlPanel/ControlPanel'

let oldActive = {}

export default () => { 

    let PAGEURL = new URL(window.location.href)
    let videoID = PAGEURL.searchParams.get('v')
    if(videoID) { 
        setVideoID(videoID)
    }

    let timestampJSON = PAGEURL.searchParams.get('t')
    try { 
        let loadedTimestamps = JSON.parse(timestampJSON)
        setTimestamps(loadedTimestamps.map( stamp => {
            return {start:stamp[0], end:stamp[1]}
        }))
    } catch(e) { 
        //window.alert("invalid json")
        setTimestamps([
            {start: 10, end: 15},
            {start: 40, end: 45},
            {start: 80, end: 85},
        ])
    }

    
    
    return (<>
        <div style={{padding: '1em', backgroundColor:'var(--color-primary)'}}>
            <div style={{fontWeight:"700"}}> Clippy (this is under development. not all features work) </div> 
        </div> 
        <div className={styleModule.editor}> 
            <div className={styleModule.left}> 
                <div className={styleModule.upperLeft}>
                    <YoutubeVideo
                        events={{
                            'onStateChange': (e) => {
                                //console.log('state change')
                            },
                            'onError': (e) => {
                               // console.log('error')
                            },
                            'onReady': (e, player) => {
                                setVideoPlayer(player)
                                setInterval(()=>{
                                    if(TimestampsStore.getEnabled() == false) return;
                                    let time = Math.floor(player.getCurrentTime())
                                        
                                    if(TimestampsStore._active == undefined) { 
                                        console.log("No active index")
                                        return; 
                                    }

                                    const active = TimestampsStore._active
                                    if(active != oldActive) {
                                        player.seekTo(TimestampsStore._active.start)
                                        console.log('new active')
                                        oldActive = active
                                        return; 
                                    }

                                    if(time < active.start) { 
                                        player.seekTo(active.start)
                                        console.log('start')
                                    }
                                    if(time >= active.end) { 
                                        nextActive() 
                                        oldActive = TimestampsStore._active
                                        player.seekTo(TimestampsStore._active.start)
                                        console.log('start2')
                                    }
                                    if(player.getPlayerState() == 0) { 
                                        nextActive() 
                                        player.seekTo(TimestampsStore._active.start)
                                        player.playVideo()
                                    }

                                    
                                }, 500)
                            }
                        }}
                    ></YoutubeVideo>
                </div>
                <div className={styleModule.lowerLeft}> 
                    <ControlPanel></ControlPanel>
                </div>
            </div> 
            <div className={styleModule.right}> 
                <button onClick={(e) => {
                    addTimestamp({place:99999, start:12, end: 15})
                }}>add</button>
                <button>remove</button>
                <Timestamps>
                </Timestamps>
            </div> 
        </div>  
    </>);
}
