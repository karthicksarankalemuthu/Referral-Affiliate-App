import { Layout,Page,Form,Card,FormLayout,TextField,Select,Stack,ChoiceList,Button,Toast,DatePicker, Frame,Grid} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useState,useEffect } from "react";
import {   useAuthenticatedFetch } from "../hooks";
import moment from 'moment';
import Joi from 'joi';
import { useNavigate } from "@shopify/app-bridge-react";



export default function affiliatenew() {

    const fetch = useAuthenticatedFetch();
    const navigate=useNavigate();

    const[campname,setcampname]=useState("");
    const[selectcomtype,setselectcomtype]=useState("product per sale");
    const [val,setval]=useState();
    const [title,settitle]=useState();
    const [error,seterror]=useState();
    const [influemail,setinfluemail]=useState();
    const [data,setdata]=useState([]);
   const[selected,setselected]=useState(); 
    


    const schema = Joi.object({ 
      name: Joi.string().alphanum().min(4).max(15).required(),
      commission_type:Joi.string().required(),
      value:Joi.string().required(),
      email:Joi.string().required()
    })




 


    const comtypechange=value => {
        if (value[0] == "product per sale") {
          setselectcomtype(value[0]);  
          settitle(value[0])
            
        } else {
          setselectcomtype(value[0]);    
          settitle(value[0]) 
        }
      };


    


      
       const submit=async()=>{
        //e.preventDefault()
       let valu={
        name:campname,
        commission_type:selectcomtype,
        value:val,
        email:influemail
        }
        const result= schema.validate(valu); 
        if(result.error==null){
        let res= await fetch("/api/create_affiliate_camp", {
          method: "POST",
          headers: { 
            'Accept': 'application/json',
            "Content-Type": "application/json" },
          body: JSON.stringify({
            name:campname,
            commission_type:selectcomtype,
            value:val,
            email:influemail
          })
        })
       // res= await res.json()
      
        console.log(res)
        if(res.ok){
      
          navigate('/affiliate')
            
            }
       // redirect.dispatch(Redirect.Action.APP,'/pricerule');
       // setActive(true)
        //setcampname("")
       
      }
      else{
        console.log(result.error)
        seterror(result?.error?.message)
        //const d=new Date(`${startdate}`)
       // console.log(`${moment().format('MM/DD/YYYY')}`)
      }
      }
    return(
        <Page fullWidth >
        <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 5, lg:3, xl: 3}}>
        <Navbar/>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 4, lg: 7, xl: 6}}>
        <Form onSubmit={submit}>
               <FormLayout>
           
                 <Card  title="CREATE AFFILIATE CAMPAIGN">
                 {error?(<Card.Section>
                <Card.Subsection>
                 <h1 style={{color:"red"}}>{error}</h1>
                </Card.Subsection>
                </Card.Section>):""}
                 <Card.Section>
                 <Card.Subsection>
                    <TextField
                      label="CAMPAIGN NAME"
                      placeholder="Enter campaign name"
                      autoComplete="off"
                      helpText="For your reference only. Not shown to customers."
                      value={campname}
                      onChange={setcampname}
                    />
                    </Card.Subsection>
                    </Card.Section>
                    <Card.Section>
                 <Card.Subsection>
                 <ChoiceList
                  title="COMMISSION TYPE"
                 choices={[
                 {label: 'product per sale', value: 'product per sale',

                  },
                 {label: 'amount per sale', value: 'amount per sale',
                 },
                 ]}
                 selected={selectcomtype}
                  onChange={comtypechange}
            />

                 </Card.Subsection>
                 </Card.Section>
                 <Card.Section>
                 <Card.Subsection>
                    <TextField
                      label={title}
                      autoComplete="off"
                      helpText="For your reference only. Not shown to customers."
                      value={val}
                      onChange={setval}
                    />
                    </Card.Subsection>
                    </Card.Section>
                    <Card.Section>
                 <Card.Subsection>
                 <TextField
                      label="Influencer Email"
                      autoComplete="off"
                      helpText="For your reference only. Not shown to customers."
                      value={influemail}
                      onChange={setinfluemail}
                    />
                   </Card.Subsection>
                   </Card.Section>
                    </Card>
                    <Button submit primary>Save </Button>
                    </FormLayout>
                    </Form>
        </Grid.Cell>
        </Grid>
        </Page>
            
            );
}