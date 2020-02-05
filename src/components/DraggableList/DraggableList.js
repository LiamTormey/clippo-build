import React, { useState, useEffect } from 'react' 
import styleModule from './style.module.css'
import { DraggableItem } from '.';

/*
    This list is probably so much more complicated than it needs to be, in efforts 
    to make this element flexible. The element should be able to handle its own state 
    of items passed down through props.children, but also has the option for a parent to 
    handle its state, or options. Set props.rerender = true if you want the list to 
    handle its own state and rerender itself if that state changes, or props.rerender = false 
    if you want the list to not rerender when changes are made to state (items dragged), and will then call 
    props.newData(data) so that the parent can handle state and change accordingly
    
    This element should also automatically rerender if parent sends in new props, regardless of props.rerender
*/
export default (props) => { 

    //set the state of the list when initial props come in from parent 
    let [data, setData] = useState(props.children.map( (c, i) => {
        return {place:c.props.place, children:c.props.children}
    }))
    
    //faster than using useEffect 
    //if props.children change from our data (parent has sent in new props) then we rerender with the new data 
    if(props.children.length != data.length) { 
        setData(props.children.map( (c, i) => {
            return {place:c.props.place, children:c.props.children}
        }))  
        //might be better to use another variable after this point thats a duplicate of data, 
        //or something along those lines to get the first render correct, and 
        //avoidng the need for a rerender. but this works for now .
    }

    //called from an item when it needs to change its place with some other item. 
    const changePlace = (a,b) => {
        let newData = [...data] 
        let aIndex = undefined 
        let bIndex = undefined 
        newData.forEach( (d, i) => { 
            if(d.place == a) { 
                bIndex = i 
            }
            if(d.place == b) { 
                aIndex = i 
            }
        })
        if(aIndex != undefined && bIndex != undefined) { 
            newData[aIndex].place = a 
            newData[bIndex].place = b
            //if we want to rerender, rerender
            if( Boolean(props.rerender) == true || props.rerender == undefined ) { 
                setData(newData) 
            } 
            //else dont rerender and call the props.newData() 
            else { 
                let newDataFunc = props.newData || ((data) => {})
                newDataFunc(newData) 
            }
        }
    }

    //we cant use the props.children, because we might be changing what children we have based on our own rerenders. 
    //therefore, because props.children sometimes changes what data we generate in the data state, and that the same data 
    //state might change based on our own rerenders, we can just regenerate our DraggableItem elements based on the data 
    let newItems = []
    data.forEach(d=>{
        newItems.push(
            <DraggableItem changePlace={changePlace} place={d.place}>{d.children}</DraggableItem>
        );
    })

    return(<div changePlace={changePlace} className={styleModule.draggableList}>
        {/*Here we are just sorting everything for display*/}
        {newItems.sort((a,b)=>{
            if(a.props.place > b.props.place) { 
                return 1;
            } else if(a.props.place < b.props.place) { 
                return -1;
            } else { 
                return 0;
            }
        })}
    </div>);
}