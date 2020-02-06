import Dispatcher from '../dispatcher'
import EventEmitter from 'events'

class VideoStore extends EventEmitter { 
    constructor() { 
        super() 
        this._videoPlayer = undefined 
    }


    getVideoID() { 
        if(this._videoPlayer == undefined) return undefined 
        try { 
            const theURL = new URL(this._videoPlayer.getVideoUrl())
            return theURL.searchParams.get('v')
        } catch(e) { 
            return undefined; 
        }
    }

    _setVideoPlayer(player) { 
        this._videoPlayer = player; 
        if(this._videoID) { 
            this._setVideoID(this._videoID)
            this._videoID = undefined; 
            return; //_setVideoID should emit change for us 
        }
        this.emit('change')
    }

    _setVideoID(id) { 
        this._videoID = id; 
        //if our player isnt ready, queue the video id and the video will load it on _setVideoPlayer(player) 
        if(this._videoPlayer == undefined) { 
            return; 
        }
        this._videoPlayer.loadVideoById(id)
        this.emit('change')
    }

    handleAction(action) { 
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