import {  Page,hsbToRgb,HSBAColor,rgbString,Button,Card,ColorPicker,Grid,Icon,Form,FormLayout,TextField,Text,Popover,LegacyCard,LegacyStack,AlphaCard} from "@shopify/polaris";
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState,useCallback} from "react";
import Navbar from "../components/navbar";
import { useAppBridge } from "@shopify/app-bridge-react";




export default function EditAffiliateTemplate() {


  
  const app = useAppBridge();
  const fetch=useAuthenticatedFetch();
  const navigate = useNavigate();

  const[data,setdata]=useState();
  const[back,setback]=useState("");
  const[btnback,setbtnback]=useState("");
  const[textcolor,settextcolor]=useState("");
  const[title,settitle]=useState("");
  const[des,setdes]=useState("");
  const[uuid,setid]=useState();
  const[enable,setenable]=useState(); 
  const[btntext,setbtntext]=useState("");
  const [color, setColor] = useState({
   brightness:0.74375,
   hue:300,
   saturation:0.0875,
   alpha:1
  });
    const [color1, setColor1] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7
  });
      const [color2, setColor2] = useState({
    hue: 300,
    brightness:0.06874999999999998, 
    saturation: 0.21875,
    alpha:1
  });
  
  
 
useEffect(()=>{
  let c=hsbToRgb(color)
  let val=rgbString(c)
   let c1=hsbToRgb(color1)
  let val1=rgbString(c1)
   let c2=hsbToRgb(color2)
  let val2=rgbString(c2)
setback(val)
setbtnback(val1)
settextcolor(val2)
console.log(color)
console.log(color1)
console.log(color2)

},[color,color1,color2])

useEffect(()=>{(async()=>{
  let res= await fetch("/api/get_affiliate_email_template")
 let res1=await res.json()
     console.log(res)
    setdata(res1)
  setback(res1[0]?.bg)
  setbtnback(res1[0]?.btn_bg)
  settextcolor(res1[0]?.text_color)
  settitle(res1[0]?.title);
  setbtntext(res1[0]?.btn_text)
  setdes(res1[0]?.des)
  setid(res1[0]?.uuid)
  setenable(res1[0].enable)
  //console.log(res[0].des)

})()
},[])

 
  
 // console.log(data)
  
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      color picker
    </Button>
  );

  const [popoverActive1, setPopoverActive1] = useState(true);

  const togglePopoverActive1 = useCallback(
    () => setPopoverActive1((popoverActive1) => !popoverActive1),
    [],
  );

  const activator1 = (
    <Button onClick={togglePopoverActive1} disclosure>
      color picker
    </Button>
  );

   const [popoverActive2, setPopoverActive2] = useState(true);

  const togglePopoverActive2 = useCallback(
    () => setPopoverActive2((popoverActive2) => !popoverActive2),
    [],
  );

  const activator2 = (
    <Button onClick={togglePopoverActive2} disclosure>
      color picker
    </Button>
  );

 console.log(color)

const submit=async()=>{
 let res= await fetch("/api/editmail_template/"+uuid, {
    method:"PUT",
    headers: { 
      "Content-Type": "application/json" },
    body: JSON.stringify({
     title:title,
     des:des,
     bg:back,
     btn_text:btntext,
     btn_bg:btnback,
     text_color: textcolor,
     enable:enable
   
    })
  })
  //console.log(e)
 // res= await res.json()
  console.log(res)
  if(res.ok){
    navigate('/setting')
  }
}
  

  return(
    <Page fullWidth >
        <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg:6, xl: 6}}>
        <Button primary onClick={()=>{navigate('/')}}><Icon
  source={ArrowLeftMinor}
  color="base"
/></Button>
<br/><br/>
<Form  onSubmit={submit}>
               <FormLayout>
           
                 <Card  title="EDIT AFFILIATE MAIL TEMPLATE">
                 <Card.Section title="EMAIL TITLE">
                    <TextField
                      label=""
                      placeholder="Title"
                      autoComplete="off" 
                      value={title}
                      onChange={settitle}
                    />
                    </Card.Section>
                    <Card.Section title="DESCRIPTION">
                        <Card.Subsection>
                    <TextField
                      label=""
                      placeholder="description"
                      autoComplete="off"  
                      multiline={3}   
                      value={des}
                      onChange={setdes}
                    />
                    </Card.Subsection>
                    </Card.Section>
                    <Card.Section title="MAIL-BACKGROUND">
                        <Card.Subsection>
                    <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ColorPicker onChange={setColor} color={color}  />

        </Popover>
                        
                        </Card.Subsection>
                    </Card.Section>
                    <Card.Section  title="BUTTON -TEXT">
                        <Card.Subsection>
                    <TextField
                      label=""
                      placeholder="button text"
                      autoComplete="off"   
                      value={btntext}
                      onChange={setbtntext}  
                    />
                    </Card.Subsection>
                    </Card.Section>
                    <Card.Section title="BUTTON -BACKGROUND">
                        <Card.Subsection>
                        <Popover
        active={popoverActive1}
        activator={activator1}
        autofocusTarget="first-node"
        onClose={togglePopoverActive1}
      >
        <ColorPicker onChange={setColor1} color={color1}  />

        </Popover>
                        </Card.Subsection>
                    </Card.Section>

         <Card.Section title="TEXT-COLOR">
                        <Card.Subsection>
                        <Popover
        active={popoverActive2}
        activator={activator2}
        autofocusTarget="first-node"
        onClose={togglePopoverActive2}
      >
        <ColorPicker onChange={setColor2} color={color2}  />

        </Popover>
                        </Card.Subsection>
                    </Card.Section>
                 </Card>

     <Button submit primary size="large" >save</Button>
      </FormLayout>
      </Form>
                   
        </Grid.Cell>
        <Grid.Cell  columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
           
           
        <div style={{marginTop: '120px'}}>
        <LegacyCard title="Preview" sectioned>
   <div style={{backgroundColor:back,width:'350px',height:'350px',borderRadius:'10px',marginLeft:'100px'}}>
   <h1 style={{fontSize:'20px',fontWeight:600,color:textcolor,marginLeft:'30px'}}>{title}</h1><br/>
   <h1 style={{fontSize:'15px',fontWeight:400,color:textcolor,marginLeft:'10px'}}>Hey [Influencer_name]</h1>
   <div style={{marginLeft:'20px',marginTop:'30px',color:textcolor}}>  <Text variant="headingSm" as="h1">{des}
    </Text></div>

    <button style={{width:'100px',height:'35px',borderRadius:'5px',marginLeft:'120px',marginTop:'80px',backgroundColor:btnback,color:textcolor}}>{btntext}</button>
    </div>
   </LegacyCard>
          </div>

        </Grid.Cell>
        </Grid>
        </Page>
  )
}