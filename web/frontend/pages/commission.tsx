import { Layout,TextField, Page,Button,Card, IndexTable,useIndexResourceState,Link,Modal,Grid,Icon,LegacyStack} from "@shopify/polaris";
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState,useCallback } from "react";
import Navbar from "../components/navbar";
import moment from "moment";
import { update } from "@shopify/app-bridge/actions/MarketingExternalActivityTopBar";




export default function Commission() {

 

      const [data,setdata]=useState([]);
      const [loading,setloading]=useState(false);
      const [email,setemail]=useState("");
      const [amount,setamount]=useState("");
      const [uuid,setuuid]=useState("");
      const fetch=useAuthenticatedFetch();
      const navigate = useNavigate(); 
 
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);





function click(){
  (async()=>{
    let res= await fetch("/api/create_script", {
      method: "PUT",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" }
    })
  res=await res.json()
     console.log(res)
  })()
}


  function deletemember(uuid:string){
   (async()=>{
      let res= await fetch("/api/delete_commission/"+uuid,{
        method: 'DELETE',
      })
    res=await res.json()
       console.log(res)
    })()
    setloading(true)
  }

 function commission(){
    (async()=>{
       let res= await fetch("/api/update_pay/"+uuid,{
         method: 'Put',
         headers: { 
            'Accept': 'application/json',
            "Content-Type": "application/json" },
          body: JSON.stringify({
           amount:amount      
       })
    })
     res=await res.json()
        console.log(res)
     })()
     setActive(false)
     setamount("")
     setloading(true)
   }


  
 
useEffect(()=>{(async()=>{
    
    let res= await fetch("/api/get_commission")
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


function Pay(uuid:string){
  setuuid(uuid)
  setActive(true)
 }




 const {selectedResources, allResourcesSelected} =
    useIndexResourceState(data);

  
const rowMarkup = data?.map(
  (
    {id,uuid,name,email,amount,balance,pay,last_update},
    index,
  ) => (
    <IndexTable.Row
     id={id}
      key={id}
      position={index} 

    >
      <IndexTable.Cell>{name}</IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell>{amount}</IndexTable.Cell>
      <IndexTable.Cell>{pay==""?0:parseInt(amount) - parseInt(pay)}</IndexTable.Cell>
      <IndexTable.Cell>{moment(last_update).format('DD/MM/YYYY')}</IndexTable.Cell>
      <IndexTable.Cell> <Button primary onClick={()=>{Pay(uuid)}}>Pay</Button></IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{navigate('/comm_update/'+uuid)}}>update</Button></IndexTable.Cell>
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
<Button onClick={()=>{click()}}>click</Button>
</LegacyStack.Item>
<LegacyStack.Item>
        <Button primary onClick={()=>{navigate('/commissionnew')}}>Add Commission</Button>
    
        <div style={{height: '10px'}}>
      <Modal
        small
        open={active}
        onClose={toggleActive}
        title="PAY COMMISSION"
      >
        <Modal.Section>
          <LegacyStack vertical>
           
          <Card  title="">
                    <Card.Section>
                    <TextField
                      label="AMOUNT"
                      placeholder="Enter amount"
                      autoComplete="off"
                      value={amount}
                      onChange={setamount}
                    />
                    <br/>
                         <Button primary onClick={()=>{commission()}}>save</Button>
                    </Card.Section>
               
                    </Card>

          </LegacyStack>
        </Modal.Section>
      </Modal>
    </div>
        <br/>
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
          {title: 'Total Amount'},
          {title: 'Balance'},
          {title: 'Last Payment'},
          {title: 'Pay'},
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
  