import Dispatcher from '../dispatcher'
import EventEmitter from 'events'

class VideoStore extends EventEmitter { 
    constructor() { 
        super() 
        this._videoPlayer = undefined 
    }


    _setVideoPlayer(player) { 
        this._videoPlayer = player; 
        this.emit('change')
    }

    _setVideoID(id) { 
        if(this._videoPlayer == undefined) { console.error("THERE IS NOT VIDEO PLAYER IN STORE"); return }
        this._videoPlayer.loadVideoById(id)
        this.emit('change')
    }

    handleAction(action) { 
        console.log("GOT ACTION?11", action)
        switch(action.type) { 
            case "SET_VIDEO_PLAYER": { 
                this._setVideoPlayer(action.player)
                break; 
            }
            case "SET_VIDEO_ID": { 
                this._setVideoID(action.id)
                break; 
            }
            default: { 

                break; 
            }
        }
    }
}

const videoStoreInstance = new VideoStore
window.getVideoStore = () => {return videoStoreInstance} 
Dispatcher.register(videoStoreInstance.handleAction.bind(videoStoreInstance))
export default videoStoreInstance; 