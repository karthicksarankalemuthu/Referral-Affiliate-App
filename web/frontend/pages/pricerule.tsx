import { Layout, Page,Button,Card,Grid,Icon,LegacyStack,Text,Modal,List} from "@shopify/polaris";
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import moment from 'moment';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState,useCallback } from "react";
import Navbar from "../components/navbar";
import { SortableContainer,SortableElement,arrayMove} from 'react-sortable-hoc';




export default function pricerule() {


      const [data,setdata]=useState([]);
      const [oldlist,setoldlist]=useState([]);
      const[loading,setloading]=useState(false)
      const[btn,setbtn]=useState(false);
      const[min,setmin]=useState();
      const[currency,setcurrency]=useState();
      const[order,setorder]=useState();
      const[domain,setdomain]=useState();
      const [open, setopen] = useState(false);

  

      const [active, setActive] = useState(false);
    
     
       const toggleActive = useCallback(() => setActive((active) => !active), []);
     
    
    

  const fetch=useAuthenticatedFetch();

  const navigate = useNavigate(); 
 

  function rule(uuid:string){
    (async()=>{
       let res= await fetch("/api/camp_rule/"+uuid,{
         method: 'GET',
       })
     let  res1=await res.json()
        console.log(res1)
       // setdata(res)
       //setloading(true)
     setmin(res1[0].min_val)
       setcurrency(res1[0].order_currency)
      setorder(res1[0].order_date)
      setdomain(res1[0].order_emaildomain)
     
     })()
     setActive(true)
   }

  const getdata=async()=>{
    let res= await fetch("/api/get_referral_camp")
    let res1=await res.json()
       console.log(res1)
      setdata(res1)
      setloading(false)
      setoldlist(res1)
  }

  useEffect(()=>{
    getdata()
},[loading])
  
console.log(data)

  const onSortEnd = (e:any) =>{
    var newTodos = arrayMove(data, e.oldIndex, e.newIndex )
    setdata(newTodos)
    setbtn(true)
    console.log(newTodos)
  };




const ToDoList = ({items}:any) =>{
  return (
    <table style={{border:'1px solid #F9FAFB',width:'100%',borderRadius:'10px',borderSpacing:'10px'}}>
      <thead style={{backgroundColor:'#F9FAFB'}} >
    <tr style={{color:'#616A75',backgroundColor:'#F9FAFB'}}>
      <th >Name</th>
      <th>Value</th>
      <th>End date</th>
      <th>Type</th>
      <th>Rules</th>
      <th>Status</th>
      <th>Update</th>
      <th>Delete</th>
      
    </tr>
    </thead>
    <tbody>
        {items.map((x:any,i:number)=>{
           return <SortableItem
                     todo={x}
                    // name={x.name}
                     index={i}
                     key={x.id}
            />})
        }
        </tbody>
      
      </table>
     );
  };


  const ToDoItem = ({todo}:any) =>{
    return ( 
    <tr style={{textAlign:'center'}}  key={todo.uuid} className="todo">
    <td>{todo.pricerule_name}</td>
    <td >{todo.discount_type=='fixedAmountValue'? '₹'+todo.value:'%'+todo.value}</td>
    <td >{moment(todo.end_date).format('DD/MM/YYYY')}</td>
    <td>{todo.camp_type}</td>
    <td> 
    <Button primary onClick={()=>{rule(todo.uuid)}}>Rule</Button>
    </td>
    <td><Button  onClick={()=>{enable(todo.uuid)}}>{todo.activate==true ? "Disable" : "enable"}</Button></td>
    <td><Button onClick={()=>{navigate('/refe_update/'+todo.uuid)}}>update</Button></td>
    <td><Button destructive onClick={()=>{deleteprice(todo.uuid)}}>delete</Button></td>
  

  </tr>
  
  )
    
}


  const SortableItem = SortableElement(ToDoItem)
  const SortableList = SortableContainer(ToDoList);


   


  function deleteprice(uuid:string){
    (async()=>{
       let res= await fetch("/api/delete_referral_camp/"+uuid,{
         method: 'DELETE',
       })
   //  res=await res.json()
      //  console.log(res)
        setloading(true)
       // setdata(res)
     })()
     
   }

   function enable(uuid:string){
    (async()=>{
       let res= await fetch("/api/referral_camp_enable/"+uuid,{
         method: 'PUT',
       })
    // res=await res.json()
       // console.log(res)
       // setdata(res)
       setloading(true)
     })()
     
   }


   let newlist:string[]=[]
   let olddlist:string[]=[]
   data.map((c)=>{newlist.push(c.priority)})
  console.log(newlist)
  console.log(data)
  oldlist.map((c)=>{olddlist.push(c.priority)})

   function priority(){
    (async()=>{
       let res= await fetch("/api/campa_priority",{
         method: 'PUT',
         headers: { 
          'Accept': 'application/json',
          "Content-Type": "application/json" },
        body: JSON.stringify({
         newlist:newlist,
        oldlist:olddlist})
       })
     res=await res.json()
        console.log(res)
      })()
      setloading(true)
      setbtn(false)
    }

  /*function priority(){
    (async()=>{
      if(data[0]?.camp_type=='Referral'){
       let res= await fetch("/api/referral_camp_refe_priority/"+data[0]?.uuid,{
         method: 'PUT',
       })
     res=await res.json()
        console.log(res)
      }else{
        let res1= await fetch("/api/referral_camp_advo_priority/"+data[0]?.uuid,{
          method: 'PUT',
        })
      res1=await res1.json()
         console.log(res1)
      }
      if(data[1]?.camp_type=='Referral'){
        let res= await fetch("/api/referral_camp_refe_priority/"+data[1]?.uuid,{
          method: 'PUT',
        })
      res=await res.json()
         console.log(res)
       }else{
         let res1= await fetch("/api/referral_camp_advo_priority/"+data[1]?.uuid,{
           method: 'PUT',
         })
       res1=await res1.json()
          console.log(res1)
       }
     })()
     setbtn(false)
   }*/
   

 
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
     <Button  primary onClick={()=>{navigate('/')}}><Icon
     source={ArrowLeftMinor}
     color="base"
     /></Button>
</LegacyStack.Item>
<LegacyStack.Item>
       <div><Button primary onClick={()=>{navigate('/pricerulenew')}}>Add Campaign</Button></div>
      
       </LegacyStack.Item>
        </LegacyStack>
  
        <br/>{btn==true?(
       <LegacyStack>
        <LegacyStack.Item>
          <Button onClick={()=>{ priority()}} primary>save</Button>
        </LegacyStack.Item>
       </LegacyStack>):""}
      <br/>
         <div style={{height: '10px'}}>
      <Modal
        small
      
        open={active}
        onClose={toggleActive}
        title="RULES"
      >
        <Modal.Section>
          <LegacyStack vertical>
          <List type="bullet">
      <List.Item>Minimum Amount:   {min}</List.Item>
      <List.Item>Currency:   {currency}</List.Item>
      <List.Item>Order Date:   {order}</List.Item>
      <List.Item>Domain:   {domain}</List.Item>
    </List>
          

          </LegacyStack>
        </Modal.Section>
      </Modal>
    </div>  
   
<Card>
<SortableList items={data} onSortEnd={onSortEnd}/>
</Card>
          </Grid.Cell>
         </Grid> 
         </Page>
      )
    
    
    }