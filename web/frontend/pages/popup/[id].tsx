import {  Page,hsbToRgb,HSBAColor,rgbString,Button,Card,ColorPicker,Grid,Icon,Form,FormLayout,TextField,Text,Popover,LegacyCard,LegacyStack,AlphaCard} from "@shopify/polaris";
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../../hooks";
import { useEffect, useState,useCallback} from "react";
import Navbar from "../../components/navbar";
import { useAppBridge } from "@shopify/app-bridge-react";




export default function Editpopup() {

  const fetch = useAuthenticatedFetch();
  const navigate=useNavigate();
  const app = useAppBridge();
  const url=window.location.href;
  const parts = url.split('/');
  const id=parts.at(-1)
console.log(id)
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
  let res= await fetch("/api/get_popup_metaobject")
  let res1=await res?.json()
     console.log(res1)
    setdata(res1)
  setback(res1.fields[2].value)
  setbtnback(res1.fields[4]?.value)
  settextcolor(res1.fields[5]?.value)
  settitle(res1.fields[0]?.value);
  setbtntext(res1.fields[3]?.value)
  setdes(res1.fields[1]?.value)
  //setid(res1.fildes[0]?.uuid)
  setenable(res1.fields[6].value)
  //console.log(res[0].des)*/

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
 let res= await fetch("/api/editpopup_metaobject", {
    method:"PUT",
    headers: { 
      "Content-Type": "application/json" },
    body: JSON.stringify({
     title:title,
     des:des,
     popup_bg:back,
     btn_text:btntext,
     btn_bg:btnback,
     text_color: textcolor,
     enable:enable
   
    })
  })
  //console.log(e)
 let res1= await res.json()
 console.log(res1)
  console.log(res)
  if(res.ok){
    navigate('/settings')
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
           
                 <Card  title="EDIT TEMPLATE">
                 <Card.Section>
                    <TextField
                      label="POPUP TITLE"
                      placeholder="Title"
                      autoComplete="off" 
                      value={title}
                      onChange={settitle}
                    />
                    </Card.Section>
                    <Card.Section>
                        <Card.Subsection>
                    <TextField
                      label="DESCRIPTION"
                      placeholder="description"
                      autoComplete="off"  
                      multiline={3}   
                      value={des}
                      onChange={setdes}
                    />
                    </Card.Subsection>
                    </Card.Section>
                    <Card.Section title="POPUP-BACKGROUND">
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
                    <Card.Section>
                        <Card.Subsection>
                    <TextField
                      label="BUTTON-TEXT"
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
           
           
        <div style={{marginTop: '150px'}}>
        <LegacyCard  title="Preview" sectioned >
        <div style={{backgroundColor:back,width:'450px',height:'200px',borderRadius:'20px'}}>
         <div style={{marginLeft:'70px',marginTop:'20px',color:textcolor}}>  <Text variant="headingLg" as="h1">{title}</Text></div> <br/>
         <div style={{marginLeft:'40px',color:textcolor}}>  <Text variant="headingSm" as="h4">{des}
         </Text></div>
          <LegacyStack>
        <div style={{marginLeft:'40px',marginTop:'30px'}} > <TextField
          label=""
        placeholder="enter the mail"
      type="email"
      autoComplete="off"
      connectedRight={<button style={{width:'100px',height:'35px',backgroundColor:btnback,color:textcolor}}>{btntext}</button>}
    /></div> 
          </LegacyStack>
          
          
          </div>
          </LegacyCard>
          </div>

        </Grid.Cell>
        </Grid>
        </Page>
  )
}