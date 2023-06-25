import { Layout, Page,Button,Card, IndexTable,useIndexResourceState,Link,Grid,Icon,LegacyStack} from "@shopify/polaris";
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";





export default function Memberlist() {

 

      const [data,setdata]=useState([]);
      const [loading,setloading]=useState(false);
  const fetch=useAuthenticatedFetch();

  const navigate = useNavigate(); 
 
    
  function deletemember(uuid:string){
   (async()=>{
      let res= await fetch("/api/delete_member/"+uuid,{
        method: 'DELETE',
      })
    res=await res.json()
       console.log(res)
    })()
    setloading(true)
  }

  function active(uuid:string){
    (async()=>{
       let res= await fetch("/api/member_enable/"+uuid,{
         method: 'PUT',
       })
     res=await res.json()
        console.log(res)
     })()
     setloading(true)
   }


   
 
useEffect(()=>{(async()=>{
    
    let res= await fetch("/api/get_member")
    let res1=await res.json()
       console.log(res)
      setdata(res1)
      console.log(res)})()
      // res = await res.json() 
    setloading(false)
},[loading])

const resourceName = {
  singular: 'data',
  plural: 'datas',
};

 const {selectedResources, allResourcesSelected} =
    useIndexResourceState(data);

  
const rowMarkup = data?.map(
  (
    {id,uuid,name,email,link,enable},
    index,
  ) => (
    <IndexTable.Row
     id={id}
      key={id}
      position={index} 

    >
      <IndexTable.Cell>{name}</IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell> <Link url={link} external>referral</Link></IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{active(uuid)}}>{enable==true?"Disable":"enable"}</Button></IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{navigate('/mem_update/'+uuid)}}>update</Button></IndexTable.Cell>
      <IndexTable.Cell> <Button destructive onClick={()=>{deletemember(uuid)}}>delete</Button></IndexTable.Cell>
    </IndexTable.Row>
  ),
); 
      
    
 

    return (
    <Page fullWidth >
        <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg:3, xl: 3}}>
        <Navbar/>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 9, xl: 9}}>
          <br/>
        <LegacyStack >
        <LegacyStack.Item fill>
        <Button primary onClick={()=>{navigate('/')}}><Icon
  source={ArrowLeftMinor}
  color="base"
/></Button>
</LegacyStack.Item>
<LegacyStack.Item>
        <Button primary onClick={()=>{navigate('/membersnew')}}>Add Members</Button>
        </LegacyStack.Item>
        </LegacyStack>
        <br/>
        <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={data.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
      
        headings={[
          {title: 'Name'},
          {title: 'Email'},
          {title: 'Link'},
          {title: 'Status'},
          {title: 'Update'},
          {title: 'Delete'},
         
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
      </Card>
        </Grid.Cell>
        </Grid>
       </Page>
       

  );}
  