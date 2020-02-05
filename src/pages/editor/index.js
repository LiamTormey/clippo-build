import React, { useState } from 'react' 
import styleModule from './style.module.css'
import YoutubeVideo from "../../components/YoutubeVideo/YoutubeVideo"
import Timestamps from "../../components/Timestamps/Timestamps"
import {setTimestamps, addTimestamp, nextActive} from "../../actions/timestamps"
import TimestampsStore from "../../stores/timestamps"
import {setVideoID, setVideoPlayer} from "../../actions/video"
import ControlPanel from '../../components/ControlPanel/ControlPanel'

export default () => { 

    setTimestamps([
        {start: 10, end: 15},
        {start: 40, end: 45},
        {start: 80, end: 85},
    ])
    

    return (<>
        <div style={{padding: '1em', backgroundColor:'var(--color-primary)'}}>
            <div style={{fontWeight:"700"}}> Clippy </div> 
        </div> 
        <div className={styleModule.editor}> 
            <div className={styleModule.left}> 
                <div className={styleModule.upperLeft}>
                    <YoutubeVideo
                        events={{
                            'onStateChange': (e) => {
                                console.log('state change')
                            },
                            'onError': (e) => {
                                console.log('error')
                            },
                            'onReady': (e, player) => {
                                setVideoPlayer(player)
                                setInterval(()=>{
                                    let time = Math.floor(player.getCurrentTime())
                                        
                                    if(TimestampsStore._active == undefined) { 
                                        console.log("No active index")
                                        return; 
                                    }

                                    const active = TimestampsStore._active
                                    if(time < active.start) { 
                                        player.seekTo(active.start)
                                    }
                                    if(time >= active.end) { 
                                        nextActive() 
                                        player.seekTo(TimestampsStore._active.start)
                                        
                                    }
                                    console.log('state?')
                                    if(player.getPlayerState() == 0) { 
                                        console.log('ended')
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
