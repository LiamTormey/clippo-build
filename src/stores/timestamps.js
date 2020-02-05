import EventEmitter from 'events'
import Dispatcher from "../dispatcher"

class TimestampStore extends EventEmitter { 

    constructor() { 
        super();
        this._timestamps = []  
    }

    _setTimestamps(ar) { 
        this._timestamps = [...ar]
    }

    getTimestamps() { 
        return [...this._timestamps]
    }


    handleAction(action) {
        switch(action.type) { 
            case "SET_TIMESTAMPS": { 
                this._setTimestamps(action.timestamps)
            }
            default: { 
                
            }
        }
    }

}

const ourTimestampsStore = new TimestampStore
Dispatcher.register(ourTimestampsStore.handleAction.bind(ourTimestampsStore))
export default ourTimestampsStore;