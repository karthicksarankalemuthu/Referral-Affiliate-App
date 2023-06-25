import { Layout, Page,Form,Card,FormLayout,TextField,Button,Toast,Frame,Grid} from "@shopify/polaris";
import Navbar from "../../components/navbar"
import { useState,useContext ,useEffect} from "react";
import {   useAuthenticatedFetch } from "../../hooks";
import { useNavigate } from "@shopify/app-bridge-react";
import Joi from 'joi';
//import { useRouter } from '@shopify/app-bridge-react';
import { useAppBridge } from "@shopify/app-bridge-react";

//import { redirect }from "react-router-dom";
//import { Navigate, useNavigate } from "react-router-dom";


export default function Membernew() {

  const fetch = useAuthenticatedFetch();
  const navigate=useNavigate();
  const app = useAppBridge();
  const url=window.location.href;
  const parts = url.split('/');
  const id=parts.at(-1)

    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[error,seterror]=useState("");
    

    const schema = Joi.object({ 
      name: Joi.string().alphanum().min(6).max(15).required(),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','in'] } }).required()
       
    }); 

    useEffect(()=>{(async()=>{
      let res= await fetch("/api/update_get_member/"+id)
     let res1=await res.json()
         console.log(res)
         setname(res1?.name)
         setemail(res1?.email)
    
    })()
    },[])

    const submit=async()=>{
        // e.preventDefault()
         let val={
           name:name,
           email:email
           }
           const result= schema.validate(val); 
           if(result.error==null){
         let res= await fetch("/api/update_member/"+id, {
           method: "PUT",
           headers: { 
             'Accept': 'application/json',
             "Content-Type": "application/json" },
           body: JSON.stringify({
            name:name,
            email:email   
          
           })
         })
        console.log(res)
        let res1=await res.json()
        if(res.ok){
      navigate('/member')
        
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
        
        <Form  onSubmit={submit}>
               <FormLayout>
           
                 <Card  title="CREATE MEMBERS">
                 {error?(<Card.Section>
                <Card.Subsection>
                 <h1 style={{color:"red"}}>{error}</h1>
                </Card.Subsection>
                </Card.Section>):""}
                 <Card.Section>
                    <TextField
                      label="MEMBER NAME"
                      placeholder="Enter member name"
                      autoComplete="off"
                      helpText="For your reference only. Not shown to customers."
                      value={name}
                      onChange={setname}
                    />
                    </Card.Section>

               
                <Card.Section>
                <Card.Subsection>
                <TextField
                      label="MEMBER EMAIL"
                      placeholder="Enter member email"
                      autoComplete="off"
                      value={email}
                      onChange={setemail}
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

