import React from 'react' 
export default (props) => { 

    //when we get dropped on 
    const onDrop = (ev) => { 
        const draggedPlace = ev.dataTransfer.getData("place");
        props.changePlace(draggedPlace, props.place)
    }
    //when we get dragged
    const onStartDrag = (ev) => { 
        ev.dataTransfer.setData("place", props.place);
    }

    const onDragOver = (e) => { 
        e.preventDefault()
    }

    const startChange = (e) => { 
        props.changeStart(props.place, e.target.value)
    }

    const endChange = (e) => { 
        props.changeEnd(props.place, e.target.value)
    }

    return(<div onDragOver={onDragOver} onDragStart={onStartDrag} onDrop={onDrop} draggable="true">
        <input onChange={startChange} value={props.data.data.start}/> to
        <input onChange={endChange} value={props.data.data.end}/>
    </div>);
}