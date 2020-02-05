import React, { useState } from 'react' 
import styleModule from './style.module.css'
import YoutubeVideo from "../../components/YoutubeVideo/YoutubeVideo"
import Timestamps from "../../components/Timestamps/Timestamps"
import {setTimestamps} from "../../actions/timestamps"
export default () => { 

    const [data, setData] = useState([
        {place: 1, data:{start:5, end: 8}},
        {place: 2, data:{start:20, end: 22}},
        {place: 3, data:{start:20, end: 22}},
        {place: 4, data:{start:20, end: 22}},
        {place: 5, data:{start:20, end: 22}},
        {place: 6, data:{start:20, end: 22}},
        {place: 7, data:{start:20, end: 22}},
        {place: 8, data:{start:20, end: 22}},
        {place: 9, data:{start:20, end: 22}},
        {place: 10, data:{start:20, end: 22}},
        {place: 11, data:{start:20, end: 22}},
        {place: 12, data:{start:20, end: 22}},
        {place: 13, data:{start:20, end: 22}},
        {place: 14, data:{start:20, end: 22}},
        {place: 15, data:{start:20, end: 22}},
        {place: 16, data:{start:20, end: 22}},
    ]) 

    const change = (event) => {
        if(event.event=='placeswap') {
            let a = event.data.a 
            let b = event.data.b
            let newData = [...data] 
            let aElement = newData.findIndex( d => d.place == a)
            let bElement = newData.findIndex( d => d.place == b)
            
            let newBElement = newData[aElement]
            let newAElement = newData[bElement]
    
            newData[aElement] = newAElement
            newData[bElement] = newBElement
    
            setData(newData)
        }
        if(event.event == "timechange") { 
            let newData = [...data] 
            let placeIndex = newData.findIndex(d=>{
                return d.place == event.data.place
            })
            newData[placeIndex].data.start = event.data.start || newData[placeIndex].data.start
            newData[placeIndex].data.end = event.data.end || newData[placeIndex].data.end
            setData(newData)
        }
    }

    const getActiveTimestamp = () => { 
        
        let active = data.find( d => {
            return d.data.active == true
        })

        if(active == undefined) { 
            active = data.sort( (a, b) => {
                if(a > b) return 1; 
                if(a < b) return -1;
                else {return 0}
            })[0]
            active.data.active = true; 
           
            let newData = [...data]
            newData[newData.findIndex( d => d.place == active.place)] = active 
            setData(newData)
        } else { 
            return active; 
        }
    }

    const nextActive = (player) => { 
        let newData = [...data]

        let activeIndex = newData.findIndex( d => {
            return d.data.active == true
        })
        let active = newData[activeIndex]

        

        let isLastActive = newData.every(d => {
            return d.place <= active.place
        })

        if(isLastActive) { 
            newData[activeIndex].data.active = false 

            let firstElementIndex = newData.findIndex( d => d.place == 1)
            newData[firstElementIndex].data.active = true 
            
            player.seekTo(newData[firstElementIndex].data.start)
            setData(newData);
            return;
        }

        

        

        //will create an active;
        if(active == undefined) { 
            let active = getActiveTimestamp()
            return active; 
        }

        let newActiveIndex = newData.findIndex( d => d.place == active.place + 1)
        let newActive = newData[newActiveIndex]
       
        if(newActive != undefined) { 
            active.data.active = false; 
            newActive.data.active = true; 
            player.seekTo(newData[newActiveIndex].data.start)
            setData(newData); 
        }

        
    }



    return (<>
        <div className={styleModule.editor}> 
            <div className={styleModule.left}> 
                <div className={styleModule.upperLeft}>
                    <YoutubeVideo
                        videoId='K9k2GJgtRCw'
                        events={{
                            'onStateChange': (e) => {
                                console.log('state change')
                            },
                            'onError': (e) => {
                                console.log('error')
                            },
                            'onReady': (e, player) => {
                                setInterval(()=>{
                                    let time = Math.floor(player.getCurrentTime())
                                    let active = getActiveTimestamp() 
                                    if(active != undefined) { 
                                        let time1 = active.data.start 
                                        let time2 = active.data.end 

                                        if(time < time1) { 
                                            player.seekTo(time1, true)
                                        }
                                        if(time > time2) { 
                                            nextActive(player); 
                                            //player.seekTo(time1, true)
                                        }
                                    } else { 
                                        console.log("ACTIVE IS UNDEFINED", active)
                                    }

                                }, 100)
                            }
                        }}
                    ></YoutubeVideo>
                </div>
                <div className={styleModule.lowerLeft}> 
                    <div>
                        
                    </div> 
                    <div>
                        mhm
                    
                    </div>
                    
                </div>
            </div> 
            <div className={styleModule.right}> 
                <Timestamps data={data} change={(a,b)=>{change(a,b)}}>
                </Timestamps>
                <button onClick={(e) => {
                    setTimestamps(['haha'])
                }}>add</button>
                <button>remove</button>
            </div> 
        </div>  
    </>);
}
