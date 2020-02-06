import React from 'react' 
import styleModule from "./style.module.css"
export default (props) => { 
    return (<div className={styleModule.inputField}>
        <div className={styleModule.inputTitle}>
            <div className={styleModule.tag}> 
                {props.title}
            </div>     
        </div> 
        <input className={styleModule.inputValue} value={props.value} onChange={props.onChange}/>
        
    </div>); 
}