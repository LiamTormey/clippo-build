import React from 'react' 
import Timestamp from './Timestamp';
export default (props) => { 

    const changePlace = (a, b) => {
        props.change({event:"placeswap", data:{a,b}})
    }

    const changeStart = (place, time) => { 
        props.change({event:"timechange", data:{place: place, start:time}})
    }
    const changeEnd = (place, time) => { 
        props.change({event:"timechange", data:{place, end:time}})
    }
    return(<>
        {props.data.map( (d) => {
            console.log('d', d)
            return (<Timestamp data={d} place={d.place} changePlace={changePlace} changeStart={changeStart} changeEnd={changeEnd}>
                
            </Timestamp>)
        })}
    </>);
}