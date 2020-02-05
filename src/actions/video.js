import Dispatcher from "../dispatcher"

export const setVideoPlayer = (videoPlayer) => { 
    Dispatcher.dispatch({
        type: "SET_VIDEO_PLAYER", 
        player: videoPlayer
    })
}

export const setVideoID = (id) => { 
    Dispatcher.dispatch({
        type: "SET_VIDEO_ID", 
        id
    })
}