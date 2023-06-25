import { Page,Grid,TextField,Button,Box,Text,Divider,LegacyCard,LegacyStack,AlphaCard,Icon} from "@shopify/polaris";
import {
    ArrowLeftMinor
  } from '@shopify/polaris-icons';
import Navbar from "../components/navbar";
import { useAuthenticatedFetch  } from "../hooks";
import { useNavigate} from "@shopify/app-bridge-react"; 

import { useEffect, useState } from "react";

export default function HomePage() {
 
  const fetch=useAuthenticatedFetch();
  const navigate = useNavigate();


  const[title,settitle]=useState("");
  const[des,setdes]=useState("");
  const[popupbg,setpopupbg]=useState("");
  const[btnbg,setbtnbg]=useState("");
  const[textcolor,settextcolor]=useState("");
  const[btntext,setbtntext]=useState("");
  const[enable,setenable]=useState();
  const[uuid,setuuid]=useState("");

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
    
   let popup=await fetch("/api/get_popup_template") 
    
   let popup1= await popup.json() 
   
   let mail=await fetch("/api/get_referral_email_template") 
    
   let mail1=await mail.json()
      
      setmailtitle(mail1[0].title)
      setmaildes(mail1[0].des)
      setmailbg(mail1[0].bg)
      setmailbtnbg(mail1[0].btn_bg)
      setmailbtntext(mail1[0].btn_text)
      setmailtextcolor(mail1[0].text_color)
      setmailenable(mail1[0].enable)
      setmailuuid(mail1[0].uuid)


      settitle(popup1[0].title)
      setdes(popup1[0].des)
      setpopupbg(popup1[0].popup_bg)
      setbtnbg(popup1[0].btn_bg)
      setbtntext(popup1[0].btn_text)
      settextcolor(popup1[0].text_color)
      setenable(popup1[0].enable)
      setuuid(popup1[0].uuid)
    })()
      setloading(false)

  },[loading])


  const enablepopup=async()=>{
    let res= await fetch("/api/enable_popup/"+uuid, {
      method:"PUT",
      headers: { 
        "Content-Type": "application/json" }
    })
    //console.log(e)
    res= await res.json()
    console.log(res)
    setloading(true)
  }



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
   
   <LegacyCard title="Activate referral program" sectioned>
     <Text variant="headingSm" as="h1"> Reward advocates for bringing new customers.</Text>
    {/*<Text  variant="headingSm"  as="h2" >Status  :{enable==true ? 'Active' : 'Inactive'}</Text>*/}
     <br/>
     <Button primary  onClick={()=>{enablepopup()}}>{enable==true ? 'disable' : 'enable'}</Button> 
  </LegacyCard>
  
  <LegacyStack>

   <LegacyCard title="Customize Popup" sectioned >
    

<div style={{backgroundColor:popupbg,width:'350px',height:'170px',marginTop:'0px',borderRadius:'20px'}}>
    <div style={{marginLeft:'70px',marginTop:'0px',color:textcolor}}><Text variant="headingLg" as="h1">{title}</Text></div> 
    <div style={{marginLeft:'20px',marginTop:'20px',color:textcolor}}>  <Text variant="headingSm" as="h1">{des}
    </Text></div>
     <LegacyStack>
   <div style={{marginLeft:'40px',marginTop:'30px'}} > <TextField
     label=""
   placeholder="enter the mail"
 type="email"
 autoComplete="off"
 connectedRight={<button style={{width:'100px',height:'35px',borderRadius:'10px',backgroundColor:btnbg,color:textcolor}}>{btntext}</button>}
/></div> 
</LegacyStack>
</div>
     <br/>
    <Button primary  onClick={()=>{navigate('/editpopup')}}>Customize</Button>
   </LegacyCard>

   {/*<LegacyCard title="Customize Email" sectioned>
   <div style={{backgroundColor:mailbg,width:'300px',height:'270px',borderRadius:'10px'}}>
  <div style={{marginTop:'30px'}}><h1 style={{fontSize:'20px',fontWeight:600,color:mailtextcolor,marginLeft:'30px'}}>{mailtitle}</h1></div>
   <div style={{marginLeft:'20px',marginTop:'30px',color:mailtextcolor}}>  <Text variant="headingSm" as="h1">{maildes}
    </Text></div>
    <div style={{width:'200px',height:'30px',border:'2px dashed black',margin:'40px'}}><center style={{display:'flex',alignItems:'center',justifyContent:'center',color:mailtextcolor}}>COUPON</center></div>
    <button style={{width:'100px',height:'35px',borderRadius:'5px',marginLeft:'100px',backgroundColor:mailbtnbg,color:mailtextcolor}}>{mailbtntext}</button>
    </div>
    <br/>
    <Button primary  onClick={()=>{navigate('/mailtemplate')}}>Customize</Button>
  </LegacyCard>*/}
</LegacyStack>
 </LegacyStack>

</Grid.Cell>
    </Grid>
        </Page>
        )


}
