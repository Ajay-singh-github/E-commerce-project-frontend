import { Grid, Input, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
export default function Footer(){
  const theme = useTheme();
  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

   const [email,setEmail] =useState('');
   const [facebook,setFacebook] = useState() 
   const [youtube,setYoutube] = useState()
   const [instagram,setInstagram] = useState()
   const [linkedin,setLinkedin] = useState()
   const [twitter,setTwitter] = useState()
   const [link,setLink] = useState({0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:'',10:'',11:'',12:'',13:'',14:''})
   const [link1,setLink1] = useState({0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:'',10:'',11:'',12:'',13:'',14:''})
   const youtubecall = ()=>
   {
    setYoutube(true)
   }

   const leaveYoutube = ()=>
   {
    setYoutube(false)
   }
   
    return(<div style={{backgroundColor:matches_sm?'black':'white',width:'100%',height:300,background:'red'}}>
        
        {matches_sm?<></>:
        <div style={{display:'flex',justifyContent:'space-between',background:'black'}}>
           <div style={{width:matches_md?300:400,display:'flex',justifyContent:'center',height:matches_md?'auto':350,background:'black'}}>
              
              
              <div style={{alignItems:'center',fontWeight:'bold',marginTop:50,marginLeft:matches_md?0:120}}>
                <Grid container>
                  <Grid xs={12} style={{fontWeight:'bold',color:'white'}}>CONNECT WITH US</Grid>
                  <Grid item xs={12}  style={{fontWeight:'bold',color:'white'}}>
              <OutlinedInput
           placeholder="Enter Email Id"
           type="email"
           
           style={{color:'black',width:matches_md?200:300,background:'white',borderRadius:10}}
            id="outlined-adornment-weight"
            onChange={(event)=>setEmail(event.target.value)}
            endAdornment={<InputAdornment position="end" style={{cursor:'pointer'}}  ><EastIcon style={{color:'black'}}/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          /> 
          </Grid>
          <Grid item xs={12} style={{display:'flex',color:'white',marginTop:15,marginLeft:15}}>
            <Grid item xs={2.4} style={{marginRight:0.1}}>
               <YouTubeIcon  style={{cursor:'pointer',color:youtube?'red':"white"}}   onMouseEnter={youtubecall}   onMouseLeave={leaveYoutube}/>
            </Grid>
            <Grid item xs={2.4}>
              <FacebookIcon style={{cursor:'pointer',color:facebook?'blue':"white"}} onMouseEnter={()=>setFacebook(true)}   onMouseLeave={()=>setFacebook(false)}/>
            </Grid>

            
            <Grid item xs={2.4}>
              <InstagramIcon style={{cursor:'pointer',color:instagram?'#fccc63':"white"}} onMouseEnter={()=>setInstagram(true)}   onMouseLeave={()=>setInstagram(false)}/>
            </Grid>
            <Grid item xs={2.4}>
              <LinkedInIcon style={{cursor:'pointer',color:linkedin?'#0077b5':"white"}} onMouseEnter={()=>setLinkedin(true)}   onMouseLeave={()=>setLinkedin(false)}/>
            </Grid>
            <Grid item xs={2.4} style={{marginRight:60}}>
              <TwitterIcon style={{cursor:'pointer',color:twitter?'blue':"white"}} onMouseEnter={()=>setTwitter(true)}   onMouseLeave={()=>setTwitter(false)}/>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{marginTop:30,color:'white'}}>
          <text>© Copyright 2023 Croma. All rights</text> 
          </Grid>
          <Grid item xs={12} style={{color:'white',marginBottom:0.2}}>
          <text> reserved </text>
          </Grid>
          </Grid>
              </div>

              

           </div>

           <div style={{width:2,height:matches_md?300:250,marginTop:50,borderRadius:5, background:'white'}}></div>

           <div style={{width:500,height:matches_md?'auto':350,background:'black'}}>
            <Grid container style={{color:'white',fontWeight:'bold',marginLeft:50,marginTop:20}}>
              <Grid item xs={12} style={{fontSize:18,marginBottom:7}}>USEFUL Link</Grid>
              <Grid item xs={6} style={{margin:2,marginBottom:10,cursor:'pointer',color:link[0]?'#6c5ce7':'white'}} ><text onMouseEnter={()=>setLink({0:true})} onMouseLeave={()=>setLink({0:false})}> About Croma</text></Grid>
              <Grid item xs={6} style={{marginBottom:10,cursor:'pointer',color:link[1]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({1:true})} onMouseLeave={()=>setLink({1:false})}> Franchise Opportunity </text></Grid>

              <Grid item xs={6} style={{marginBottom:10,cursor:'pointer',color:link[2]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({2:true})} onMouseLeave={()=>setLink({2:false})}> Help And Support</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[3]?'#6c5ce7':'white'}}> <text onMouseEnter={()=>setLink({3:true})} onMouseLeave={()=>setLink({3:false})}>Site Map</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[4]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({4:true})} onMouseLeave={()=>setLink({4:false})}>FAQs</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[5]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({5:true})} onMouseLeave={()=>setLink({5:false})}>Careers At Croma </text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[6]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({6:true})} onMouseLeave={()=>setLink({6:false})}> Buying Guide</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[7]?'#6c5ce7':'white'}}> <text onMouseEnter={()=>setLink({7:true})} onMouseLeave={()=>setLink({7:false})}>Terms Of Use</text> </Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[8]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({8:true})} onMouseLeave={()=>setLink({8:false})}> Return Policy/</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[9]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({9:true})} onMouseLeave={()=>setLink({9:false})}> Disclaimer </text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[10]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({10:true})} onMouseLeave={()=>setLink({10:false})}>B2B Orders</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[11]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({11:true})} onMouseLeave={()=>setLink({11:false})}>Privacy Policy</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[12]?'#6c5ce7':'white'}}><text  onMouseEnter={()=>setLink({12:true})} onMouseLeave={()=>setLink({12:false})}>Store Locator</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[13]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({13:true})} onMouseLeave={()=>setLink({13:false})}>Unboxed</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[14]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({14:true})} onMouseLeave={()=>setLink({14:false})}>E-Waste</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[15]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({15:true})} onMouseLeave={()=>setLink({15:false})}>Gift Card</text></Grid>
            </Grid>
           </div>

           <div style={{width:2,height:matches_md?300:250,marginTop:50,borderRadius:5, background:'white'}}></div>

           <div style={{width:500,height:matches_md?'auto':350,background:'black'}}> 
           
           <Grid container style={{color:'white',fontWeight:'bold',marginLeft:50,marginTop:20,marginRight:50}}>
              <Grid item xs={12} style={{fontSize:18,marginBottom:7}}>PRODUCTS</Grid>
              <Grid item xs={6} style={{margin:2,marginBottom:10,cursor:'pointer',color:link1[0]?'#6c5ce7':'white'}} ><text onMouseEnter={()=>setLink1({0:true})} onMouseLeave={()=>setLink1({0:false})}> Televisions & Accessories</text></Grid>
              <Grid item xs={6} style={{marginBottom:10,cursor:'pointer',color:link1[1]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({1:true})} onMouseLeave={()=>setLink1({1:false})}> Grooming & Personal Care </text></Grid>

              <Grid item xs={6} style={{marginBottom:10,cursor:'pointer',color:link1[2]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({2:true})} onMouseLeave={()=>setLink1({2:false})}> Home Appliances</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[3]?'#6c5ce7':'white'}}> <text onMouseEnter={()=>setLink1({3:true})} onMouseLeave={()=>setLink1({3:false})}>Cameras & Accessories</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[4]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({4:true})} onMouseLeave={()=>setLink1({4:false})}>Phones & Wearables</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[5]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({5:true})} onMouseLeave={()=>setLink1({5:false})}>Smart Devices </text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[6]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({6:true})} onMouseLeave={()=>setLink1({6:false})}> Buying Guide</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[7]?'#6c5ce7':'white'}}> <text onMouseEnter={()=>setLink1({7:true})} onMouseLeave={()=>setLink1({7:false})}>Terms Of Use</text> </Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[8]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({8:true})} onMouseLeave={()=>setLink1({8:false})}> Return Policy/</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[9]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({9:true})} onMouseLeave={()=>setLink1({9:false})}> Disclaimer </text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[10]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({10:true})} onMouseLeave={()=>setLink1({10:false})}>B2B Orders</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[11]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({11:true})} onMouseLeave={()=>setLink1({11:false})}>Privacy Policy</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[12]?'#6c5ce7':'white'}}><text  onMouseEnter={()=>setLink1({12:true})} onMouseLeave={()=>setLink1({12:false})}>Store Locator</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[13]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({13:true})} onMouseLeave={()=>setLink1({13:false})}>Unboxed</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[14]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({14:true})} onMouseLeave={()=>setLink1({14:false})}>E-Waste</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[15]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({15:true})} onMouseLeave={()=>setLink1({15:false})}>Gift Card</text></Grid>
            </Grid>
           </div> 

         </div>
          }
        






        {matches_sm? <div style={{background:'black'}}>
        <div style={{alignItems:'center',fontWeight:'bold',marginTop:10,marginLeft:15,marginRight:5}}>
                <Grid container>
                  <Grid xs={12} style={{fontWeight:'bold',color:'white'}}>CONNECT WITH US</Grid>
                  <Grid item xs={12}  style={{fontWeight:'bold',color:'white',paddingRight:10}}>
              <OutlinedInput
           placeholder="Enter Email Id"
           type="email"
           
           style={{color:'black',width:'100%',background:'white',borderRadius:10}}
            id="outlined-adornment-weight"
            onChange={(event)=>setEmail(event.target.value)}
            endAdornment={<InputAdornment position="end" style={{cursor:'pointer'}}  ><EastIcon style={{color:'black'}}/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          /> 
          </Grid>
          <Grid item xs={12} style={{display:'flex',color:'white',marginTop:15,marginLeft:15}}>
            <Grid item xs={2} style={{marginRight:0.1}}>
               <YouTubeIcon  style={{cursor:'pointer',color:youtube?'red':"white"}}   onMouseEnter={youtubecall}   onMouseLeave={leaveYoutube}/>
            </Grid>
            <Grid item xs={2}>
              <FacebookIcon style={{cursor:'pointer',color:facebook?'blue':"white"}} onMouseEnter={()=>setFacebook(true)}   onMouseLeave={()=>setFacebook(false)}/>
            </Grid>

            
            <Grid item xs={2}>
              <InstagramIcon style={{cursor:'pointer',color:instagram?'#fccc63':"white"}} onMouseEnter={()=>setInstagram(true)}   onMouseLeave={()=>setInstagram(false)}/>
            </Grid>
            <Grid item xs={2}>
              <LinkedInIcon style={{cursor:'pointer',color:linkedin?'#0077b5':"white"}} onMouseEnter={()=>setLinkedin(true)}   onMouseLeave={()=>setLinkedin(false)}/>
            </Grid>
            <Grid item xs={2} style={{marginRight:60}}>
              <TwitterIcon style={{cursor:'pointer',color:twitter?'blue':"white"}} onMouseEnter={()=>setTwitter(true)}   onMouseLeave={()=>setTwitter(false)}/>
            </Grid>
          </Grid>

          </Grid>
              </div>
    
              <div style={{marginTop:10}}>
             <Divider sx={{ backgroundColor: 'white', height: 1 }}  /> 
      <Accordion defaultExpanded  style={{background:'black',color:'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>USEFUL Link</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
             <Grid container>
              <Grid item xs={6} style={{margin:2,marginBottom:10,cursor:'pointer',color:link[0]?'#6c5ce7':'white'}} ><text onMouseEnter={()=>setLink({0:true})} onMouseLeave={()=>setLink({0:false})}> About Croma</text></Grid>
              <Grid item xs={6} style={{marginBottom:10,cursor:'pointer',color:link[1]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({1:true})} onMouseLeave={()=>setLink({1:false})}> Franchise Opportunity </text></Grid>

              <Grid item xs={6} style={{marginBottom:10,cursor:'pointer',color:link[2]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({2:true})} onMouseLeave={()=>setLink({2:false})}> Help And Support</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[3]?'#6c5ce7':'white'}}> <text onMouseEnter={()=>setLink({3:true})} onMouseLeave={()=>setLink({3:false})}>Site Map</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[4]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({4:true})} onMouseLeave={()=>setLink({4:false})}>FAQs</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[5]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({5:true})} onMouseLeave={()=>setLink({5:false})}>Careers At Croma </text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[6]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({6:true})} onMouseLeave={()=>setLink({6:false})}> Buying Guide</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[7]?'#6c5ce7':'white'}}> <text onMouseEnter={()=>setLink({7:true})} onMouseLeave={()=>setLink({7:false})}>Terms Of Use</text> </Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[8]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({8:true})} onMouseLeave={()=>setLink({8:false})}> Return Policy/</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[9]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({9:true})} onMouseLeave={()=>setLink({9:false})}> Disclaimer </text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[10]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({10:true})} onMouseLeave={()=>setLink({10:false})}>B2B Orders</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[11]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({11:true})} onMouseLeave={()=>setLink({11:false})}>Privacy Policy</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[12]?'#6c5ce7':'white'}}><text  onMouseEnter={()=>setLink({12:true})} onMouseLeave={()=>setLink({12:false})}>Store Locator</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[13]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({13:true})} onMouseLeave={()=>setLink({13:false})}>Unboxed</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[14]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({14:true})} onMouseLeave={()=>setLink({14:false})}>E-Waste</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link[15]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink({15:true})} onMouseLeave={()=>setLink({15:false})}>Gift Card</text></Grid>
            </Grid>
          </Typography>
         
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ backgroundColor: 'white', height: 1 }}  /> 

      <Accordion style={{background:'black',color:'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>PRODUCTS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid container>
          <Grid item xs={6} style={{margin:2,marginBottom:10,cursor:'pointer',color:link1[0]?'#6c5ce7':'white'}} ><text onMouseEnter={()=>setLink1({0:true})} onMouseLeave={()=>setLink1({0:false})}> Televisions & Accessories</text></Grid>
              <Grid item xs={6} style={{marginBottom:10,cursor:'pointer',color:link1[1]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({1:true})} onMouseLeave={()=>setLink1({1:false})}> Grooming & Personal Care </text></Grid>

              <Grid item xs={6} style={{marginBottom:10,cursor:'pointer',color:link1[2]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({2:true})} onMouseLeave={()=>setLink1({2:false})}> Home Appliances</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[3]?'#6c5ce7':'white'}}> <text onMouseEnter={()=>setLink1({3:true})} onMouseLeave={()=>setLink1({3:false})}>Cameras & Accessories</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[4]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({4:true})} onMouseLeave={()=>setLink1({4:false})}>Phones & Wearables</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[5]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({5:true})} onMouseLeave={()=>setLink1({5:false})}>Smart Devices </text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[6]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({6:true})} onMouseLeave={()=>setLink1({6:false})}> Buying Guide</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[7]?'#6c5ce7':'white'}}> <text onMouseEnter={()=>setLink1({7:true})} onMouseLeave={()=>setLink1({7:false})}>Terms Of Use</text> </Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[8]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({8:true})} onMouseLeave={()=>setLink1({8:false})}> Return Policy/</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[9]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({9:true})} onMouseLeave={()=>setLink1({9:false})}> Disclaimer </text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[10]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({10:true})} onMouseLeave={()=>setLink1({10:false})}>B2B Orders</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[11]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({11:true})} onMouseLeave={()=>setLink1({11:false})}>Privacy Policy</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[12]?'#6c5ce7':'white'}}><text  onMouseEnter={()=>setLink1({12:true})} onMouseLeave={()=>setLink1({12:false})}>Store Locator</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[13]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({13:true})} onMouseLeave={()=>setLink1({13:false})}>Unboxed</text></Grid>

              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[14]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({14:true})} onMouseLeave={()=>setLink1({14:false})}>E-Waste</text></Grid>
              <Grid item xs={6}  style={{marginBottom:10,cursor:'pointer',color:link1[15]?'#6c5ce7':'white'}}><text onMouseEnter={()=>setLink1({15:true})} onMouseLeave={()=>setLink1({15:false})}>Gift Card</text></Grid>
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ backgroundColor: 'white', height: 1 }}  /> 

    </div>
    <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
    <div style={{background:'black',color:'white'}}>© Copyright 2023 Croma. All rights reserved</div>
          </div>
     </div> :<></>}

    </div>)
}



