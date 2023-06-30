import { Page,Grid,TextField,Button,Box,Text,Divider,LegacyCard,LegacyStack,AlphaCard,Icon} from "@shopify/polaris";
import {
    ArrowLeftMinor
  } from '@shopify/polaris-icons';
import Navbar from "../components/navbar";
import { useAuthenticatedFetch  } from "../hooks";
import { useNavigate} from "@shopify/app-bridge-react"; 

import { useEffect, useState } from "react";

export default function Setting() {
 
  const fetch=useAuthenticatedFetch();
  const navigate = useNavigate();


 

  const[data,setdata]=useState([]);

  const[loading,setloading]=useState(false);
  
  useEffect(()=>{(async()=>{
    
   
   let mail=await fetch("/api/get_affiliate_email_template") 
    
   let mail1=await mail.json() 
     console.log(mail1)
     setdata(mail1)

    })()
      setloading(false)

  },[loading])




  return (
    <Page fullWidth >
    <Grid>
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg:3, xl: 3}}>
    <Navbar/>
    </Grid.Cell>
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 9, xl: 9}}>
    <Button primary onClick={()=>{navigate('/')}}>
    <Icon
  source={ArrowLeftMinor}
  color="base"
/></Button>
<br/>
<br/>
    <LegacyStack distribution="fillEvenly">


    <LegacyCard title="Affiliate Invite Mail" sectioned >
    <div style={{backgroundColor:data[0]?.bg,width:'300px',height:'270px',borderRadius:'10px'}}>
  <div style={{marginTop:'30px'}}><h1 style={{fontSize:'20px',fontWeight:600,color:data[0]?.text_color,marginLeft:'30px'}}>{data[0]?.title}</h1></div>
  <br/>
  <h2 style={{color:data[0]?.text_color}}>Hey [Influencer_name]</h2>
   <div style={{marginLeft:'20px',marginTop:'15px',color:data[0]?.text_color}}>  <Text variant="headingSm" as="h1">{data[0]?.des}
    </Text></div>

    <button style={{width:'100px',height:'35px',borderRadius:'5px',marginLeft:'100px',marginTop:'30px',backgroundColor:data[0]?.btn_bg,color:data[0]?.text_color}}>{data[0]?.btn_text
}</button>
    </div>
    <br/>
    <Button primary  onClick={()=>{navigate('/tem_update/'+data[0]?.uuid)}}>Customize</Button>
    </LegacyCard>
    
    <LegacyCard title="Sales Mail" sectioned >
    <div style={{backgroundColor:data[1]?.bg,width:'300px',height:'270px',borderRadius:'10px'}}>
    
  <div style={{marginTop:'30px'}}><h1 style={{fontSize:'20px',fontWeight:600,color:data[1]?.text_color,marginLeft:'30px'}}>{data[1]?.title}</h1></div>
  <br/>
   <div style={{marginLeft:'20px',marginTop:'30px',color:data[1]?.text_color}}>  <Text variant="headingSm" as="h1">{data[1]?.des}
    </Text></div>
    </div>
    <br/>
    <Button primary  onClick={()=>{navigate('/tem_update/'+data[1]?.uuid)}}>Customize</Button>
    </LegacyCard>

</LegacyStack>
 

</Grid.Cell>
    </Grid>
        </Page>
        )


}
