import EventEmitter from 'events'
import Dispatcher from "../dispatcher"

class TimestampStore extends EventEmitter { 

    constructor() { 
        super();
        this._timestamps = []  
        this._active = undefined 
        this._enabled = true 
    }

    _cleanPlacement() { 
        this._timestamps = this._timestamps.sort( (a,b) => {
            if(a.place > b.place) { 
                return 1; 
            } else if(a.place < b.place) { 
                return -1;
            } else { 
                return 0; 
            }
        })
        
        this._timestamps = this._timestamps.map( (stamp, i) => { 
            let newStamp = {...stamp}
            newStamp.place = i + 1
            return newStamp; 
        })
    }

    _setTimestamps(ar) { 
        this._timestamps = [...ar]
        this._cleanPlacement()
        this._calculateActive()
        this.emit('change')
    }

    _setStart(place, time) { 
        time = Number(time)
        place = Number(place) 
        const index = this._timestamps.findIndex( (stamp) => {
            return stamp.place == place 
        })
        this._timestamps[index].start = time 
        this.emit('change')
    }

    _setEnd(place, time) { 
        time = Number(time)
        place = Number(place) 
        const index = this._timestamps.findIndex( (stamp) => {
            return stamp.place == place 
        })
        this._timestamps[index].end = time 
        this.emit('change')
    }

    _swapPlaces(p1, p2) { 
        const place1Index = this._timestamps.findIndex(stamp=>{return stamp.place == p1})
        const place2Index = this._timestamps.findIndex(stamp=>{return stamp.place == p2})
        this._timestamps[place1Index].place = p2 
        this._timestamps[place2Index].place = p1 

        //recalculate the _active 
        this._active = this._timestamps.find( (stamp) => stamp.active == true)

        this._cleanPlacement()
        this.emit('change')
    }

    _addTimestamp(timestamp) { 
        this._timestamps.push(timestamp)

        if(this._active == undefined) { 
            this._calculateActive()
        }

        this._cleanPlacement()
        this.emit('change')
    }

    getTimestamps() { 
        return [...this._timestamps]
    }

    _calculateActive() { 
        
        let activeIndex = this._timestamps.findIndex(stamp => stamp.active == true)
        
        //if no active, set the first one 
        if(activeIndex == -1) { 
            let firstIndex = this._timestamps.findIndex(stamp => stamp.place == 1)
            this._timestamps[firstIndex].active = true 
            this._active = this._timestamps[firstIndex]
        }

    }

    _setTimestampsEnabled(enabled) { 
        this._enabled = enabled; 
        this.emit('change')
    }

    getEnabled() { 
        return this._enabled;
    }

    _nextAcitve(change) { 
        this._cleanPlacement() 
        const lastPlace = this._timestamps[this._timestamps.length -1].place
        const currentPlace = this._active.place 

        //get rid of the current active 
        this._active = undefined 
        this._timestamps.forEach(element => {
            element.active = false; 
        });

        const nextActivePlace = ( (currentPlace) % (lastPlace) ) + 1

        this._active = this._timestamps.find( (stamp) => stamp.place == nextActivePlace)
        this._active.active = true 


        this._cleanPlacement()
        if(change == undefined || change == true) { 
            this.emit('change')
        }
        
    }

    _setTag(place, name, value) { 
        let unique = true 
        if(unique) { 
            this._timestamps.forEach( stamp => {
                delete stamp[name]
            })
        }

        let theTimeStamp = this._timestamps.find( stamp => stamp.place == place); 
        theTimeStamp[name] = value 
        console.log(this._timestamps)
        this.emit('change')
    }

    getWithTag(name, value) { 
        let theTimeStamp = this._timestamps.find( (stamp) => stamp[name] == value)
        return {...theTimeStamp}; 
    }

    _playTimestamp(place) { 
        //get rid of the current active 
        this._active = undefined 
        this._timestamps.forEach(element => {
            element.active = false; 
        });

        let newActive = this._timestamps.find( (stamp) => stamp.place === place)
        newActive.active = true;
        this._active = newActive
        this.emit('change')
    }

    _removeTimestamp(place) { 
        this._nextAcitve(false)
        const removeIndex = this._timestamps.findIndex( (stamp) => stamp.place === place) 
        this._timestamps.splice(removeIndex, 1) 
        this._cleanPlacement() 
        this.emit('change')
    }

    handleAction(action) {
        
        switch(action.type) { 
            case "SET_TIMESTAMPS": { 
                this._setTimestamps(action.timestamps)
                break; 
            }
            case "ADD_TIMESTAMP": { 
                this._addTimestamp(action.timestamp)
                break; 
            }
            case "SET_START": { 
                this._setStart(action.place, action.time)
                break; 
            }
            case "SET_END": { 
                this._setEnd(action.place, action.time)
                break; 
            }
            case "SWAP_PLACES": { 
                this._swapPlaces(action.place1, action.place2)
                break; 
            }
            case "NEXT_ACTIVE": { 
                this._nextAcitve();
                break; 
            }
            case "SET_TIMESTAMPS_ENABLED": { 
                this._setTimestampsEnabled(action.enabled); 
                break; 
            }
            case "SET_TIMESTAMP_TAG": { 
                this._setTag(action.place, action.name, action.value)
                break; 
            }
            case "TIMESTAMP_REMOVE": { 
                this._removeTimestamp(action.place); 
                break;
            }
            case "TIMESTAMP_PLAY": { 
                this._playTimestamp(action.place);
                break; 
            }
            default: { 
                break; 
            }
        }
    }

}

const ourTimestampsStore = new TimestampStore
window.getTimestampStore = () => { return ourTimestampsStore }
Dispatcher.register(ourTimestampsStore.handleAction.bind(ourTimestampsStore))
export default ourTimestampsStore;