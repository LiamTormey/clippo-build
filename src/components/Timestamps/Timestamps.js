import React, { useState, useEffect } from 'react' 
import Timestamp from './Timestamp';
import TimestampsStore from "../../stores/timestamps"
import { setTimestamps } from "../../actions/timestamps"

export default (props) => { 

    const [timestamps, setTimestamps] = useState(TimestampsStore.getTimestamps())

    function changeListener() { 
        setTimestamps(TimestampsStore.getTimestamps())
    }


    useEffect(()=>{
        TimestampsStore.on('change', changeListener)
        return function cleanUp() { 
            TimestampsStore.removeListener('change', changeListener)
        }
    })

    function changeStart() { 

    }

    function changeEnd() { 

    }

    function changePlace() { 

    }

    return(<>
        {timestamps.map(ts => 
            <Timestamp place={ts.place} 
                changeStart={changeStart} 
                changeEnd={changeEnd} 
                changePlace={changePlace}
                data={ts}>
                hi
            </Timestamp>
        )}
    </>);
}