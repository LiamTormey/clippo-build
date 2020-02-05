import Dispatcher from '../dispatcher'

export const setTimestamps = (timestamps) => { 
    Dispatcher.dispatch({
        type: "SET_TIMESTAMPS", 
        timestamps
    })
}