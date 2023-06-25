import { Layout, Page,Button,Card, IndexTable,useIndexResourceState,Grid,Icon,Text} from "@shopify/polaris";
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";



export default function track() {


      const [data,setdata]=useState([]);
      const[btn,setbtn]=useState();

  const fetch=useAuthenticatedFetch();

  const navigate = useNavigate(); 
 
     


 
useEffect(()=>{(async()=>{
    
    let res= await fetch("/api/get_track")
    res=await res.json()
       console.log(res)
     setdata(res)
      //console.log(data)
    })()
      // res = await res.json() 
    
},[data])


   

const resourceName = {
  singular: 'data',
  plural: 'datas',
};

 const {selectedResources, allResourcesSelected} =
    useIndexResourceState(data);

  
const rowMarkup = data?.map(
  (
    {id,advocate_id,discount_code,referral_email

    },
    index,
  ) => (
    <IndexTable.Row
     id={id}
      key={id}
      position={index} 

    ><IndexTable.Cell>{index+1}</IndexTable.Cell>
      <IndexTable.Cell>{advocate_id}</IndexTable.Cell>
      <IndexTable.Cell>{discount_code}</IndexTable.Cell>
      <IndexTable.Cell>{referral_email}</IndexTable.Cell>
     
    </IndexTable.Row>
  ),
); 
      
    
 

      return(

        <Page fullWidth >
        <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg:3, xl: 3}}>
        <Navbar/>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 9, xl: 9}}>
          <Button primary onClick={()=>{navigate('/')}}><Icon
  source={ArrowLeftMinor}
  color="base"
/></Button>
<Card></Card>
<Card></Card>
       
     
           <Card></Card>
          <Text variant="heading2xl" as="h3">Tracker</Text>
          <Card></Card>
           <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={data.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
      
        headings={[
          {title: 'S.no'},
          {title: 'Advocate_id'},
          {title:'Code'},
          {title: 'Referral_email'},
          
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
          </Grid.Cell>
         </Grid> 
         </Page>
      )
    
    
    }