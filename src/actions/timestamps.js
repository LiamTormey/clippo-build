import Dispatcher from '../dispatcher'

export const setTimestamps = (timestamps) => { 
    Dispatcher.dispatch({
        type: "SET_TIMESTAMPS", 
        timestamps
    })
}

export const addTimestamp = (timestamp) => { 
    Dispatcher.dispatch({
        type: "ADD_TIMESTAMP", 
        timestamp
    })
}

export const setStart = (place, time) => { 
    Dispatcher.dispatch({
        type: "SET_START", 
        place,
        time: time
    })
}

export const setEnd = (place, end) => { 
    Dispatcher.dispatch({
        type: "SET_END", 
        place, 
        time: end
    })
}

export const swapPlaces = (place1, place2) => { 
    Dispatcher.dispatch({
        type: "SWAP_PLACES", 
        place1,
        place2
    })
}

export const nextActive = () => { 
    Dispatcher.dispatch({
        type: "NEXT_ACTIVE"
    })
}

export const setTimestampsEnabled = (enabled) => { 
    Dispatcher.dispatch({
        type: "SET_TIMESTAMPS_ENABLED", 
        enabled
    })
}

export const setTag = (place, name, value) => { 
    Dispatcher.dispatch({
        type: "SET_TIMESTAMP_TAG", 
        place,
        name, 
        value 
    })
}

export const removeTimestamp = (place) => { 
    Dispatcher.dispatch({
        type: "TIMESTAMP_REMOVE", 
        place
    })
}

export const playTimestamp = (place) => { 
    Dispatcher.dispatch({
        type: "TIMESTAMP_PLAY", 
        place
    })
}