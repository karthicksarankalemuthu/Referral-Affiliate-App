import { Layout, Page,Button,Card, IndexTable,useIndexResourceState,Grid,Icon,LegacyStack,Link,Toast,Frame} from "@shopify/polaris";
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState ,useCallback} from "react";
import Navbar from "../components/navbar";





export default function Influencer() {
  

      const [data,setdata]=useState([]);
      const[loading,setloading]=useState(false);
      const fetch=useAuthenticatedFetch();
      const navigate = useNavigate(); 
   
      const [active, setActive] = useState(false);

      const toggleActive = useCallback(() => setActive((active) => !active), []);
    
      const toastMarkup = active ? (
        <Toast content="Mail sent" onDismiss={toggleActive} />
      ) : null;
  

  function deleteinflu(uuid:string){
    (async()=>{
       let res= await fetch("/api/delete_influencer/"+uuid,{
         method: 'DELETE',
       })
     res=await res.json()
        console.log(res)
     })()
     setloading(true)
   }

   function enableinfluencer(uuid:string){
    (async()=>{
       let res= await fetch("/api/influencer_enable/"+uuid,{
         method: 'PUT',
       })
     res=await res.json()
        console.log(res)
     })()
     setloading(true)
   }
 

   function sendemail(uuid:string){
    (async()=>{
       var res= await fetch("/api/send_influencer_email/"+uuid,{
         method: 'POST',
       })
   let res1=await res.json()
        console.log(res1)
        
     })()
     
      setActive(true)
     
   }
 

useEffect(()=>{(async()=>{
    
    let res= await fetch("/api/get_influencer")
   let res1=await res.json()
       console.log(res)
      setdata(res1)
      console.log(data)})()
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
      <IndexTable.Cell> <Link url={link} external>affiliate</Link></IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{enableinfluencer(uuid)}}>{enable==true?"Disable":"enable"}</Button></IndexTable.Cell>
      <IndexTable.Cell><Button onClick={()=>{navigate('/influ_update/'+uuid)}}>update</Button></IndexTable.Cell>
      <IndexTable.Cell> <Button destructive onClick={()=>{deleteinflu(uuid)}}>delete</Button></IndexTable.Cell> 
      <IndexTable.Cell> <Button primary onClick={()=>{sendemail(uuid)}}>Send</Button></IndexTable.Cell> 
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
        <br/>
        <LegacyStack >
        <LegacyStack.Item fill>
          <Button primary onClick={()=>{navigate('/')}}><Icon
  source={ArrowLeftMinor}
  color="base"
/></Button>
</LegacyStack.Item>
<LegacyStack.Item>
        <Button primary onClick={()=>{navigate('/influencernew')}}>Add Influencer</Button>
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
          {title:'Update'},
          {title:'Delete'},
          {title:'Send mail'}
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </Card>

    <Frame>
            {toastMarkup}
          </Frame>
          </Grid.Cell>
          
         </Grid> 
         </Page>
      )
    
    
    }