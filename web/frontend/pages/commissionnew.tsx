import { Layout, Page,Form,Card,FormLayout,TextField,Button,Toast,Frame,Grid} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useState,useContext } from "react";
import {   useAuthenticatedFetch } from "../hooks";
import { useNavigate } from "@shopify/app-bridge-react";
import Joi from 'joi';
import { useAppBridge } from "@shopify/app-bridge-react";



export default function Commissionnew() {

  const fetch = useAuthenticatedFetch();
  const navigate=useNavigate();
  


    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[amount,setamount]=useState("");
    const[error,seterror]=useState("");
    

    const schema = Joi.object({ 
      name: Joi.string().alphanum().min(4).max(15).required(),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','in'] } }).required(),
       amount:Joi.string().required()
    }); 



  const submit=async()=>{
   
    let val={
      name:name,
      email:email,
      amount:amount
      }
      const result= schema.validate(val); 
      if(result.error==null){
    let res= await fetch("/api/create_commission", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
       name:name,
       email:email,
       amount:amount   
     
      })
    })
   console.log(res)
 let res1=await res.json()
   if(res.ok){
 navigate('/commission')
   
   }
   
    seterror(res1?.msg);
  }
  else{
    seterror(result.error.message)
  }

  }
 
 
 
 

 
      return(
        <Page fullWidth >
        <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 5, lg:3, xl: 3}}>
        <Navbar/>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 4, lg: 7, xl: 6}}>
         {/* <Button onClick={click}>click</Button>*/}
        <Form  onSubmit={submit}>
               <FormLayout>
           
                 <Card  title="CREATE COMMISSION">
                 {error?(<Card.Section>
                <Card.Subsection>
                 <h1 style={{color:"red"}}>{error}</h1>
                </Card.Subsection>
                </Card.Section>):""}
                 <Card.Section>
                    <TextField
                      label="NAME"
                      placeholder="Enter influencer name"
                      autoComplete="off"
                      helpText="For your reference only. Not shown to customers."
                      value={name}
                      onChange={setname}
                    />
                    </Card.Section>

                 
                <Card.Section>
                <Card.Subsection>
                <TextField
                      label="EMAIL"
                      placeholder="Enter influencer email"
                      autoComplete="off"
                      value={email}
                      onChange={setemail}
                    />
              </Card.Subsection>
                </Card.Section>
               
                <Card.Section>
                <Card.Subsection>
                <TextField
                      label="AMOUNT"
                      placeholder="Enter amount"
                      autoComplete="off"
                      value={amount}
                      onChange={setamount}
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
       

      )

}