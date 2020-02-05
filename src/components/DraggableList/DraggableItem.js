import React from 'react' 
import styleModule from './style.module.css'
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

    return(<div onDragOver={onDragOver} onDragStart={onStartDrag} onDrop={onDrop} draggable="true" className={styleModule.draggableItem}>
        {props.children}
    </div>);
}