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
  const[status,setstatus]=useState("");
  const[enablestatus,setenablestatus]=useState<Boolean>();


  const[th_title,setth_title]=useState("");
  const[th_des,setth_des]=useState("");
  const[th_popupbg,setth_popupbg]=useState("");
  const[th_btnbg,setth_btnbg]=useState("");
  const[th_textcolor,setth_textcolor]=useState("");
  const[th_btntext,setth_btntext]=useState("");

  const[data,setdata]=useState([]);
  const[loading,setloading]=useState(false);
  
  useEffect(()=>{(async()=>{
    
   let pop=await fetch("/api/get_popup_template") 
    
   let pop1= await pop.json() 
   let popup=await fetch("/api/get_metaobject") 
   let popup1= await popup.json()
   let mail=await fetch("/api/get_referral_email_template") 
    
   let mail1=await mail.json()
      console.log(mail1)
      setdata(mail1)
      
console.log(popup1)

      settitle(popup1.fields[0].value)
      setdes(popup1.fields[1].value)
      setpopupbg(popup1.fields[2].value)
      setbtnbg(popup1.fields[4].value)
      setbtntext(popup1.fields[3].value)
      settextcolor(popup1.fields[5].value)
      setenable(popup1.fields[6].value)
     setstatus(popup1.fields[6].value)



     setth_title(pop1[0].title)
     setth_des(pop1[0].des)
     setth_popupbg(pop1[0].popup_bg)
     setth_btnbg(pop1[0].btn_bg)
     setth_btntext(pop1[0].btn_text)
     setth_textcolor(pop1[0].text_color)

     if(popup1.id){
      const url=popup1.id;
      const parts = url.split('/');
      const id=parts.at(-1)
      setuuid(id)
      console.log(id)
     }
     if(popup1.fields[6].value=='true'){
      setenablestatus(true)
     }
     else{
      setenablestatus(false)
     }
    })()
      setloading(false)

  },[loading])

console.log(enablestatus)

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

  const enablemetaobject=async()=>{
    let res= await fetch("/api/enablepopup_metaobject", {
      method:"PUT",
      headers: { 
        "Content-Type": "application/json" },
        body: JSON.stringify({
          enable:enablestatus
        
         })
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
    <LegacyStack distribution="fill">
   
   <LegacyCard title="Activate referral program" sectioned>
     <Text variant="headingSm" as="h1"> Reward advocates for bringing new customers.</Text>
    {/*<Text  variant="headingSm"  as="h2" >Status  :{enable==true ? 'Active' : 'Inactive'}</Text>*/}
     <br/>
     <Button primary  onClick={()=>{enablemetaobject()}}>{enablestatus==true ? 'disable' : 'enable'}</Button> 
  </LegacyCard>
 
  </LegacyStack>
  
<br/>
<LegacyStack>

   <LegacyCard title="Customize Popup" sectioned >
<div style={{backgroundColor:popupbg,width:'320px',height:'170px',marginTop:'0px',borderRadius:'10px'}}>
    <div style={{marginLeft:'50px',marginTop:'0px',color:textcolor}}><Text variant="headingLg" as="h1">{title}</Text></div> 
    <div style={{marginLeft:'20px',marginTop:'20px',color:textcolor}}>  <Text variant="headingSm" as="h1">{des}
    </Text></div>
     <LegacyStack>
   <div style={{marginLeft:'10px',marginTop:'30px'}} > <TextField
     label=""
   placeholder="enter the mail"
 type="email"
 autoComplete="off"
 connectedRight={<button style={{width:'90px',height:'35px',borderRadius:'10px',backgroundColor:btnbg,color:textcolor}}>{btntext}</button>}
/></div> 
</LegacyStack>
</div>
     <br/>
   {/* <Button primary  onClick={()=>{navigate('/editpopup')}}>Customize</Button>*/}
   <Button primary  onClick={()=>{navigate('/popup/'+uuid)}}>Customize</Button>
   </LegacyCard>

 
   <LegacyCard title="Customize Thank you page" sectioned >
<div style={{backgroundColor:th_popupbg,width:'320px',height:'170px',marginTop:'0px',borderRadius:'10px'}}>
    <div style={{marginLeft:'50px',marginTop:'0px',color:th_textcolor}}><Text variant="headingLg" as="h1">{th_title}</Text></div> 
    <div style={{marginLeft:'20px',marginTop:'20px',color:th_textcolor}}>  <Text variant="headingSm" as="h1">{th_des}
    </Text></div>
     <LegacyStack>
   <div style={{marginLeft:'10px',marginTop:'30px'}} > <TextField
     label=""
   placeholder="enter the mail"
 type="email"
 autoComplete="off"
 connectedRight={<button style={{width:'90px',height:'35px',borderRadius:'10px',backgroundColor:th_btnbg,color:th_textcolor}}>{th_btntext}</button>}
/></div> 
</LegacyStack>
</div>
     <br/>
   {/* <Button primary  onClick={()=>{navigate('/editpopup')}}>Customize</Button>*/}
   <Button primary  onClick={()=>{navigate('/editpopup')}}>Customize</Button>
   </LegacyCard>
 </LegacyStack>
 <br/>
<LegacyStack distribution="fill">
<LegacyCard title="Member Mail" sectioned >
    <div style={{backgroundColor:data[0]?.bg,width:'300px',height:'270px',borderRadius:'10px'}}>
  <div style={{marginTop:'30px'}}><h1 style={{fontSize:'20px',fontWeight:600,color:data[0]?.text_color,marginLeft:'30px'}}>{data[0]?.title}</h1></div>
   <div style={{marginLeft:'20px',marginTop:'30px',color:data[0]?.text_color}}>  <Text variant="headingSm" as="h1">{data[0]?.des}
    </Text></div>
    <div style={{width:'200px',height:'30px',border:'2px dashed black',margin:'40px'}}><center style={{display:'flex',alignItems:'center',justifyContent:'center',color:''}}>COUPON</center></div>
    <button style={{width:'100px',height:'35px',borderRadius:'5px',marginLeft:'100px',backgroundColor:data[0]?.btn_bg,color:data[0]?.text_color}}>{data[0]?.btn_text}</button>
    </div>
    <br/>
    <Button primary  onClick={()=>{navigate('/tem_update/'+data[0]?.uuid)}}>Customize</Button>
    </LegacyCard>
 
    <LegacyCard title="Member Invite Mail" sectioned >
    <div style={{backgroundColor:data[1]?.bg,width:'300px',height:'270px',borderRadius:'10px'}}>
    
  <div style={{marginTop:'30px'}}><h1 style={{fontSize:'20px',fontWeight:600,color:data[1]?.text_color,marginLeft:'30px'}}>{data[1]?.title}</h1></div>
  <br/>
  <h2 style={{color:data[1]?.text_color}}>Hey [Member_name]</h2>
   <div style={{marginLeft:'20px',marginTop:'15px',color:data[1]?.text_color}}>  <Text variant="headingSm" as="h1">{data[1]?.des}
    </Text></div>
   
    <button style={{width:'100px',height:'35px',borderRadius:'5px',marginLeft:'100px',marginTop:'30px',backgroundColor:data[1]?.btn_bg,color:data[1]?.text_color}}>{data[1]?.btn_text
}</button>
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
