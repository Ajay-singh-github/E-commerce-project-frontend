
import { useState } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function DividerComponent()
{
    const [checked, setChecked] = useState();

    return(<div style={{maxWidth:"98%",background:'white',height:"100vh",color:"white"}}>
        <div style={{fontWeight:"bold",}}></div>
        
    
    </div>)
}