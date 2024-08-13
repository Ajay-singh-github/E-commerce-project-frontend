import list from "../../assets/list.png"
import { useNavigate } from "react-router-dom"
export default function Heading(props){
    var navigate=useNavigate()
  return(<div style={{display:'flex',flexDirection:'row'}}>
    <div>
        <img src={props.image} width="25"/>
    </div>
    <div style={{fontFamily:'dosis',fontSize:18,fontWeight:'bold',paddingLeft:5}}>
        {props.caption}

    </div>
    <div style={{marginLeft:'auto',cursor:'pointer'}} onClick={()=>navigate(props.link)} >
    <img src={list} width="25"/>
    </div>
    
  </div>)

}