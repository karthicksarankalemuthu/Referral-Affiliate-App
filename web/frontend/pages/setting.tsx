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


 

  const[mailtitle,setmailtitle]=useState("");
  const[maildes,setmaildes]=useState("");
  const[mailbg,setmailbg]=useState("");
  const[mailbtnbg,setmailbtnbg]=useState("");
  const[mailtextcolor,setmailtextcolor]=useState("");
  const[mailbtntext,setmailbtntext]=useState("");
  const[mailenable,setmailenable]=useState();
  const[mailuuid,setmailuuid]=useState("");
  const[loading,setloading]=useState(false);
  
  useEffect(()=>{(async()=>{
    
   
   let mail=await fetch("/api/get_affiliate_email_template") 
    
   let mail1=await mail.json()
      
      setmailtitle(mail1[0].title)
      setmaildes(mail1[0].des)
      setmailbg(mail1[0].bg)
      setmailbtnbg(mail1[0].btn_bg)
      setmailbtntext(mail1[0].btn_text)
      setmailtextcolor(mail1[0].text_color)
      setmailenable(mail1[0].enable)
      setmailuuid(mail1[0].uuid)

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


   <LegacyCard title="Customize Affiliate Email" sectioned>
   <div style={{backgroundColor:mailbg,width:'350px',height:'350px',borderRadius:'10px',marginLeft:'240px'}}>
   <h1 style={{fontSize:'20px',fontWeight:600,color:mailtextcolor,marginLeft:'30px'}}>{mailtitle}</h1><br/>
   <h1 style={{fontSize:'15px',fontWeight:400,color:mailtextcolor,marginLeft:'10px'}}>Hey [Influencer_name]</h1>
   <div style={{marginLeft:'20px',marginTop:'30px',color:mailtextcolor}}>  <Text variant="headingSm" as="h1">{maildes}
    </Text></div>

    <button style={{width:'100px',height:'35px',borderRadius:'5px',marginLeft:'120px',marginTop:'80px',backgroundColor:mailbtnbg,color:mailtextcolor}}>{mailbtntext}</button>
    </div>
    <br/>
    <Button primary  onClick={()=>{navigate('/affiliatemail')}}>Customize</Button>
   </LegacyCard>
</LegacyStack>
 

</Grid.Cell>
    </Grid>
        </Page>
        )


}
