import { Page,Grid,Text,LegacyCard,LegacyStack} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState } from "react";


export default function HomePage() {
 
  const fetch=useAuthenticatedFetch();
  


  const[totalmember,settotalmember]=useState("");
  const[refcustomer,setrefcustomer]=useState("");
  const[revenue,setrevenue]=useState("");
  


  useEffect(()=>{(async()=>{
    
    let res= await fetch("/api/get_total_member")
   let res1=await fetch("/api/get_total_customer")
   let res2=await fetch("/api/get_total_revenue") 
  
    let res0=await res.json()
   let res10=await res1.json()
   let res20=await res2.json()
   
      
      settotalmember(res0?.msg)
     setrefcustomer(res10.msg)
      setrevenue(res20.msg._sum.amount)
     
    })()
      

  },[])


 

  return (
    <Page fullWidth >
    <Grid>
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg:3, xl: 3}} >
    <Navbar/>
    </Grid.Cell>
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 9, xl: 9}}>
    <Text variant="heading3xl" as="h2">
       Dashboard
      </Text>
      <br/>

      <LegacyStack distribution="fill">
      <LegacyCard title="Total Members" sectioned>
       <Text variant="headingXl" fontWeight="bold" as="h1">{ totalmember? totalmember :'0'}</Text>
      </LegacyCard>
      <LegacyCard title="Total Referred Customer"sectioned>
      <Text variant="headingXl" fontWeight="bold" as="h1">{refcustomer ? refcustomer :'0'}</Text>
      </LegacyCard>
      <LegacyCard title="Total Revenue"sectioned>
      <Text variant="headingXl" fontWeight="bold" as="h1">₹{revenue ? revenue :'0'}</Text>
      </LegacyCard>
        </LegacyStack>
        

      
  
    
    </Grid.Cell>
    </Grid>
    </Page>
  );
}
