import { Layout, Page,Button,Card, IndexTable,useIndexResourceState,Grid,Icon,Text} from "@shopify/polaris";
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";



export default function sale() {


      const [data,setdata]=useState([]);
      const[btn,setbtn]=useState();

  const fetch=useAuthenticatedFetch();

  const navigate = useNavigate(); 
 
     


 
useEffect(()=>{(async()=>{
    
    let res= await fetch("/api/get_sales")
   let res1=await res.json()
       console.log(res)
     setdata(res1)
      //console.log(data)
    })()
      // res = await res.json() 
    
},[])


   

const resourceName = {
  singular: 'data',
  plural: 'datas',
};

 const {selectedResources, allResourcesSelected} =
    useIndexResourceState(data);

  
const rowMarkup = data?.map(
  (
    {id,advocate_id,amount,item,referral_email,type
    },
    index,
  ) => (
    <IndexTable.Row
     id={id}
      key={id}
      position={index} 

    >
      <IndexTable.Cell>{advocate_id}</IndexTable.Cell>
      <IndexTable.Cell>{item}</IndexTable.Cell>
      <IndexTable.Cell>{amount}</IndexTable.Cell>
      <IndexTable.Cell>{referral_email}</IndexTable.Cell>
      <IndexTable.Cell>{type}</IndexTable.Cell>
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
          <Text variant="heading2xl" as="h3">Sales</Text>
          <Card></Card>
           <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={data.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
      
        headings={[
          {title: 'Advocate_id'},
          {title: 'Product'},
          {title: 'Price'},
          {title: 'Referral_email'},
          {title:'Type of sale'}
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