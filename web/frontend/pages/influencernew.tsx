import { Layout, Page,Form,Card,FormLayout,TextField,Button,Tag,Toast,Frame} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useCallback, useEffect, useState } from "react";
import {   useAuthenticatedFetch } from "../hooks";
import Joi from 'joi';
import { useNavigate } from "@shopify/app-bridge-react";

export default function Influencernew() {

  const [influname , setinflu]= useState("");
  const [influemail , setemail]= useState("");
   const [error , seterror]= useState("");
   const[toast,settoast]=useState(false);
   const fetch = useAuthenticatedFetch();
   const navigate=useNavigate();

   
const schema = Joi.object({ 
  name: Joi.string().alphanum().required(),
  email:Joi.string().email(({ minDomainSegments: 2, tlds: { allow: ['com','in'] } })).required()
}); 


  
   
   
  const submit=async()=>{
    //e.preventDefault()
   let val={
    name:influname,
    email:influemail
    }
    const result= schema.validate(val); 
    if(result.error==null){
    let res= await fetch("/api/create_influencer", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
        name:influname,
        email:influemail
     
      })
    })
    if(res.ok){
      
    navigate('/influencer')
      
      }
   
  
   
  }
  else{
    console.log(result.error)
    seterror(result?.error?.message)
 
  }
  }
 


     


    return (
      <Page  fullWidth>   
         <Layout>
         
         <Layout.Section oneHalf>
         <Navbar/> 
         </Layout.Section>
         
          <Layout.Section oneHalf>
          <Form onSubmit={submit}>
             <FormLayout>
             <Card  title="Add Influencer">
             {error?(<Card.Section>
                <Card.Subsection>
                 <h1 style={{color:"red"}}>{error}</h1>
                </Card.Subsection>
                </Card.Section>):""}
          <Card.Section>
           <TextField
            label="INFLUENCER NAME"
           autoComplete="off"
         //  {...influ}
           value={influname}
           onChange={setinflu}
           placeholder="tommy"
          helpText="Note: The name will appear in the sticky bar after you create an affiliate link for the influencer in one campaign and their referred customers click the affiliate link."
         />
       </Card.Section>

          <Card.Section>
        <Card.Subsection>
         <TextField
          label="EMAIL (optional)"
        //  {...email}
           placeholder="xyz@gmail.com"
           value={influemail}
           onChange={setemail}
          autoComplete="off"
         />
        </Card.Subsection>
         </Card.Section>

       

         </Card>
         <Button submit primary>Save </Button>
           </FormLayout>
       </Form>  
      
       
       
       </Layout.Section>
       </Layout>
       </Page>
    )}