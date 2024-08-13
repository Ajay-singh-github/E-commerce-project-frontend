import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography, useMediaQuery } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Specification() {
    const matches = useMediaQuery('(max-width:800px)')
    const matches_sm = useMediaQuery('(max-width:500px)')

    return (
        <div style={{ width: matches ? '95%' : '80%' }}>
            <Accordion expanded style={{ background: '#191919', color: '#fff', border: '2px solid #353535', padding: "0px 10px 10px" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}>
                    <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>Specification</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: matches ? '14px' : '18px', fontWeight: 'bold' }}>MOBILE CATEGORY</Typography>
                    <div style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
                        <div style={{ width: matches ? '50%' : '35%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Mobile Type</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 500 }}>Android Smartphone</div>
                        </div>

                        <div style={{ width: matches ? '50%' : '35%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Mobile Form Factor</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 500 }}>Touch</div>
                        </div>

                        {matches ? <></> : <div style={{ width: '30%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Condition</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 500 }}>New</div>
                        </div>}
                    </div>

                    {matches ? <div style={{ width: '30%', marginTop: '3%' }}>
                        <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Condition</div>
                        <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 500 }}>New</div>
                    </div> : <></>}
                    <Divider style={{ background: 'white', opacity: '0.2', margin: '20px 0px' }} />

                    <Typography style={{ fontSize: matches ? '14px' : '18px', fontWeight: 'bold' }}>MANUFACTURE DETAILS</Typography>
                    <div style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
                        <div style={{ width: matches ? '50%' : '35%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Brand</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 450 }}>OnePlus</div>
                        </div>

                        <div style={{ width: matches ? '50%' : '35%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Model Series</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 450 }}>11R</div>
                        </div>

                        {matches ? <></> : <div style={{ width: '30%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Model Number</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 450 }}>5011102525</div>
                        </div>}
                    </div>
                    {matches ? <div style={{ width: '30%', marginTop: '3%' }}>
                        <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Model Number</div>
                        <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 450 }}>5011102525</div>
                    </div> : <></>}
                    <Divider style={{ background: 'white', opacity: '0.2', margin: '20px 0px' }} />

                    <Typography style={{ fontSize: matches ? '14px' : '1.5vw', fontWeight: 'bold' }}>STORAGE SPECIFICATIONS</Typography>
                    <div style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
                        <div style={{ width: matches ? '50%' : '35%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Internal Storage</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 500 }}>128GB</div>
                        </div>

                        <div style={{ width: matches ? '50%' : '35%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>Memory Card Supported</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 500 }}>No</div>
                        </div>

                        {matches ? <></> : <div style={{ width: '30%' }}>
                            <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>RAM</div>
                            <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 500 }}>8 GB</div>
                        </div>}
                    </div>
                    {matches ? <div style={{ width: '30%', marginTop: '3%' }}>
                        <div style={{ fontSize: matches_sm ? '12px' : '14px', fontWeight: 450 }}>RAM</div>
                        <div style={{ fontSize: matches_sm ? '13px' : '16px', fontWeight: 500 }}>8 GB</div>
                    </div> : <></>}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Specification