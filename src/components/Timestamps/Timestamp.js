import React from 'react' 
import {setStart, setEnd, swapPlaces} from "../../actions/timestamps"
import styleModule from "./style.module.css"
export default (props) => { 

    //when we get dropped on 
    const onDrop = (ev) => { 
        const draggedPlace = ev.dataTransfer.getData("place");
        //props.changePlace(draggedPlace, props.place)
        swapPlaces(draggedPlace, props.place)
    }
    //when we get dragged
    const onStartDrag = (ev) => { 
        ev.dataTransfer.setData("place", props.place);
    }

    const onDragOver = (e) => { 
        e.preventDefault()
    }

    const startChange = (e) => { 
        //props.changeStart(props.place, e.target.value)
        setStart(props.place, e.target.value)
    }

    const endChange = (e) => { 
        //props.changeEnd(props.place, e.target.value)
        setEnd(props.place, e.target.value)
    }
    console.log("::", props.data.active)

    const classes = props.data.active ? (
        [styleModule.timestamp, styleModule.active].join(" ")
    ) : (
        [styleModule.timestamp].join(" ")
    );

    return(<div onDragOver={onDragOver} onDragStart={onStartDrag} onDrop={onDrop} draggable="true" className={classes}>
        <input onChange={startChange} value={props.data.start}/> to
        <input onChange={endChange} value={props.data.end}/>
    </div>);
}