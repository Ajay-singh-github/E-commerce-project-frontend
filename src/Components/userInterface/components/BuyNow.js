import { Button, useMediaQuery } from "@mui/material"
import { serverURL } from "../../../Services/FetchNodeServices"

function BuyNow() {
    const matches = useMediaQuery('(max-width:800px)')
    const matches_sm = useMediaQuery('(max-width:400px)')

    return (
        <div style={{ width: '100%', height: matches?'':'10vh', color: 'white', background: '#191919', display: 'flex', alignItems: 'center', boxShadow: '0 6px 20px 0 gray' }}>
            {matches ? <></>
                : <div style={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5%' }}>
                    <img src={`${serverURL}/images/ps1.webp`} height="50%" width="50%"></img>
                </div>
            }

            {matches ? <></>
                : <div>
                    <div>OnePlus 11R 5G (8GB RAM, 128GB, Sonic Black)</div>
                    <div>&#8377;39,999.00</div>
                </div>}

            {matches ? <></>
                : <div style={{ marginLeft: 'auto', marginRight: '8%' }}>
                    <Button style={{ color: '#191919', borderColor: '#353535', background: '#12daa8', borderRadius: 10, fontWeight: 'bold', padding: '6px 40px 6px 40px', textTransform: 'none' }} variant="outlined">Buy Now</Button>
                    <Button style={{ color: '#fff', borderColor: '#353535', borderRadius: 10, marginLeft: '10px', background: '#353535', borderColor: '#fff', padding: '6px 40px', textTransform: 'none', fontWeight: 'bold' }} variant="outlined">Add to Cart</Button>
                </div>}

            {matches ?
                <div style={{width:'100%',display:'flex',}}>
                    <div style={{width:'50%'}}><Button style={{textTransform:'none',background: '#12daa8',color:"#191919",fontWeight:'bolder',fontSize:'14px',height:'10vh'}} fullWidth>Buy Now</Button></div>
                    <div style={{width:'50%'}}><Button style={{textTransform:'none',background:'#353535',color:'#fff',height:'10vh',fontSize:'14px',fontWeight:'bold'}} fullWidth>Add to Cart</Button></div>
                </div>
                : <></>}
        </div>
    )
}

export default BuyNow