import { Layout, Page,Form,Card,FormLayout,TextField,Stack,ChoiceList,Button,Grid} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useState,useCallback } from "react";
import {   useAuthenticatedFetch } from "../hooks";
import moment from 'moment';
import Joi from 'joi';
import { useAppBridge } from "@shopify/app-bridge-react";
import { useNavigate } from "@shopify/app-bridge-react";




export default function Pricerulenew() {

  const fetch = useAuthenticatedFetch();
  const navigate=useNavigate();
  
  const app = useAppBridge();
  
    
  


    const[campname,setcampname]=useState("");
    const[disval,setdisval]=useState("");
    const[startdate,setstartdate]=useState(moment().format('DD/MM/YYYY'));
    const[enddate,setenddate]=useState("");
    const[prefix,setprefix]=useState("$");
    const[ selectdisval,setselectdisval]=useState<string[]>(['fixedAmountValue']);
    const[selectcamptype,setselectcamptype]=useState<string[]>(['Referral']);
    const [error, seterror] = useState("");
    const [min, setmin] = useState("");
    const [orderdate, setorderdate] = useState("");
    const [currency, setcurrency] = useState<string[]>(['INR']);
    const [emaildomain, setemaildomain] = useState<string[]>(['com']);
 


    const date=`${moment().format('MM-DD-YYYY')}`
    const schema = Joi.object({ 
      campname: Joi.string().alphanum().min(6).max(15).required(),
      disval:Joi.number().integer().required(),
      selectdisval:Joi.string().required(),
      startdate:Joi.date().required(),
      enddate:Joi.date().greater(date).required(),
      camptype:Joi.string().required(),
      minvalue:Joi.string().required(),
      order_date:Joi.string().required(),
      order_currency:Joi.string().required(),
      order_emaildomain:Joi.string().required(),
    }); 

    
    

  const changedate=(date:string)=>{
      const d=`${date.toString().replace(/\//g, "-")}`
      const res=d.split("-").reverse().join("-");
      return res+"T12:00:00Z";
    }

    const da =  moment(`${enddate}`,'DD/MM/YYYY').format('MM-DD-YYYY');

   
    
    const disvalchange = useCallback((value:string[]) => setselectdisval(value), []);
    const camptypechange = useCallback((value:string[]) =>  setselectcamptype(value), []);
    const currencychange = useCallback((value:string[]) =>  setcurrency(value), []);
    const  emaildomainchange = useCallback((value:string[]) => setemaildomain(value), []);
    
  
  const submit=async()=>{
    //e.preventDefault()
   let val={
    campname:campname,
    disval:disval,
    selectdisval:selectdisval.toString(),
    startdate:`${moment().format('MM-DD-YYYY')}`,
    enddate:da,
    camptype:selectcamptype.toString(),
    minvalue:min,
    order_date:orderdate,
    order_currency:currency.toString(),
    order_emaildomain:emaildomain.toString()
    
    }
    const result= schema.validate(val); 
    if(result.error==null){
    let res= await fetch("/api/create_referral_camp", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
       campname:campname,
       disval:disval,
       selectdisval:selectdisval.toString(),
       startdate:changedate(startdate),
       enddate:changedate(enddate),
       camptype:selectcamptype.toString(),
       //minvalue:minval
       minvalue:min,
      order_currency:currency.toString(),
      order_date:orderdate,
      order_emaildomain:emaildomain.toString()
      
     
      })
    })
   let res1= await res.json()
  
    console.log(res)
    if(res1?.camp_type=='Referral'){
      navigate('/pricerule')
    }
    else if(res1?.camp_type=='Advocate'){
      navigate('/pricerule')
    }
    else{
      navigate('/affiliate')
    }
   
   
  }
  else{
    console.log(result.error)
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
           
                 <Card  title="CREATE CAMPAIGN">
                 {error?(<Card.Section>
                <Card.Subsection>
                 <h1 style={{color:"red"}}>{error}</h1>
                </Card.Subsection>
                </Card.Section>):""}
                 <Card.Section>
                 <Card.Subsection>
                    <TextField
                      label="CAMPAIGN NAME"
                      placeholder="Enter campaign name"
                      autoComplete="off"
                      helpText="For your reference only. Not shown to customers."
                      value={campname}
                      onChange={setcampname}
                    />
                    </Card.Subsection>
                    </Card.Section>
                    

                <Card.Section>
                 <Card.Subsection>
                <ChoiceList
                  title="DISCOUNT TYPE"
                  choices={[
                  {label: 'fixedAmount', value: 'fixedAmountValue'},
                  {label: 'percentage', value: 'percentageValue'}
                  ]}
                  selected={selectdisval}
                  onChange={disvalchange}
                  />
                  </Card.Subsection>
                  </Card.Section>
                 
                 
                  <Card.Section>
                  <Card.Subsection>
                    <TextField
                      label="DISCOUNT VALUE"
                      placeholder="Enter value"
                      autoComplete="off"
                      prefix={prefix}
                      value={disval}
                      onChange={setdisval}
                    />
                    </Card.Subsection>
                    </Card.Section>

                    <Card.Section>
                  <Card.Subsection>
                    <Stack distribution="fill">
               
                  <TextField
                  label="START DATE"
                  placeholder="ex: 25/0/2023"
                  autoComplete="off"
                  value={startdate}
                  onChange={setstartdate}
                />
                
                <TextField
                  label="END DATE"
                  placeholder="ex: 25/06/2023 "
                  autoComplete="off"
                  value={enddate}
                  onChange={setenddate}
                />
                
                  </Stack>
                  </Card.Subsection>
                  </Card.Section>
                  

                  <Card.Section>
                  <Card.Subsection>
                  <ChoiceList
                  title="CAMPAIGN TYPE"
                  choices={[
                  {label: 'Referral', value: 'Referral'},
                  {label: 'Advocate', value: 'Advocate'},
                  {label: 'Affiliate', value: 'Affiliate'},
                  ]}
                  selected={selectcamptype}
                  onChange={camptypechange}
                  />
                  </Card.Subsection>
                  </Card.Section>
                  
                  <Card.Section title="RULES">
            <Card.Subsection>
            <TextField
              label="MIN-AMOUNT"
              placeholder="Ex:100"
              autoComplete="off"
              value={min}
              onChange={setmin}/>
                <br/>
              <ChoiceList
                  title="ORDER-CURRENCY"
                  choices={[
                  {label: 'INR', value: 'INR'},
                  {label: 'USD', value: 'USD'}
                  ]}
                  selected={currency}
                  onChange={currencychange} />
                  <br/>
                    <TextField
              label="ORDER-DATE"
              placeholder="Ex: 12/05/2023"
              autoComplete="off"
              value={orderdate}
              onChange={setorderdate}
                    />
                    <br/>
              <ChoiceList
                  title="EMAIL-DOMAIN"
                  choices={[
                  {label: 'com', value: 'com'},
                  {label: 'in', value: 'in'}
                  ]}
                  selected={emaildomain}
                  onChange={emaildomainchange}
                  />    
                  <br/>
                 
         
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