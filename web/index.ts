// @ts-nocheck
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import { GraphqlQueryError} from "@shopify/shopify-api";
import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";
import pkg from '@prisma/client';
import { get_single_metaobject,update_popup_metaobject,create_discount,get_metaobject_defination,metaobject,metaobject_defination,get_metaobject, update_metaobject_defination, delete_metaobject_fielddefination, delete_metaobject, delete_metaobject_defination, enable_popup_metaobject, update_metaobject} from "./mutation.js";
import { advocate_mail ,influencer_mail,member_mail,sales_mail} from "./mail.js";
import { Engine} from 'json-rules-engine';
import moment from 'moment';
import { myaccount } from "./template.js";
import { DataType } from '@shopify/shopify-api';


const { PrismaClient } = pkg;
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "", 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

const prisma= new PrismaClient();
//app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, "public/js")));
// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());




//create campaigns

app.post("/api/create_referral_camp",async(req,res)=>{
  const{campname,disval,selectdisval,startdate,enddate,camptype,minvalue,order_date,order_emaildomain,order_currency}=req.body;
try{
   const send=await prisma.campaign.create({data:{pricerule_name:campname,discount_type:selectdisval, 
    value:disval,
    start_date:startdate,
    end_date:enddate,
    camp_type:camptype,
    min_val:minvalue,
    order_currency:order_currency,
    order_date:order_date,
    order_emaildomain:order_emaildomain,
    activate:true,
    priority:0
  }})
    console.log(send)
    res.status(200).send(send)
}
catch(err){
 console.log(err)

}
})


//create members

app.post("/api/create_member",async(req,res)=>{
  const{name,email}=req.body;
try{
     const existinguser=await prisma.members.findUnique({where:{email:email}})
     if(existinguser){
           res.status(404).send({msg:"Email is already exist"})
     }
     else{
      const url="https://referral-affiliate-app.myshopify.com/collections/all"
      const find=await prisma.influencer.findUnique({where:{email:email}})
      if(find){
        const senddata=await prisma.members.create({data:{uuid:find.uuid,name:name,email:email,link:url+"?id="+find.uuid,enable:true}})
        //const id=await prisma.members.update({where:{email:email},data:{link:url+"?id="+senddata?.uuid}})
      console.log(senddata)
      res.status(200).send(senddata)
      member_mail(senddata.name,senddata.email,senddata.link)
      }
      else{
      const senddata=await prisma.members.create({data:{name:name,email:email,link:"",enable:true}})
      const id=await prisma.members.update({where:{email:email},data:{link:url+"?id="+senddata?.uuid}})
    console.log(id)
    res.status(200).send(id)
    member_mail(id.name,id.email,id.link)
  }

     }  
}
catch(err){
 console.log(err)

}
})



//create commission

app.post("/api/create_commission",async(req,res)=>{
  const{name,email,amount}=req.body;
try{
     const existinguser=await prisma.commission.findUnique({where:{email:email}})
     if(existinguser){
           res.status(404).send({msg:"Email is already exist"})
     }
     else{
      const senddata=await prisma.commission.create({data:{name:name,email:email,amount:amount,pay:"0"}})
      res.status(200).send(senddata)
     }  
}
catch(err){
 console.log(err)

}
})


// get the commission

app.get("/api/get_commission",async(req,res)=>{
  try{  
    const getdata =await prisma.commission.findMany();
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})


//commission update

app.put("/api/update_pay/:id",async(req,res)=>{
    const uuid=req.params.id;
    const {amount}=req.body;
    try{
      const find=await prisma.commission.findUnique({where:{uuid:uuid}})
      let pay=parseInt(find.pay) + parseInt(amount)
      let date=new Date
      let last=date.toJSON()
      const update=await prisma.commission.update({where:{uuid:uuid},data:{pay:pay.toString(),last_update:last
      }})
      console.log(update)
    }
    catch(err){
      console.log(err)
    }
})

// get commission for update

app.get("/api/update_get_comm/:id",async(req,res)=>{
  const uuid=req.params.id;
  try{
   const send=await prisma.commission.findUnique({where:{uuid:uuid}})
   res.status(200).send(send)
  }
  catch(err){
    console.log(err)
  }
})

// upadate commission

app.put("/api/commission_update/:id",async(req,res)=>{
  const uuid=req.params.id;
  const{name,email,amount}=req.body
   try{
    const update=await prisma.commission.update({where:{uuid:uuid},data:{name:name,email:email,amount:amount
    }})
    res.status(200).send(update)
   }
   catch(err){

   }
})

// delete  commission

app.delete("/api/delete_commission/:id",async(req,res)=>{
  const uuid=req.params.id;
try{  
const getdata =await prisma.commission.delete({where:{uuid:uuid}});
//res.json(getdata)
//console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})




//edit popup template

app.put("/api/editpopup_template/:uuid",async(req,res)=>{
  const{title,des,popup_bg,btn_text,btn_bg,text_color,enable,destination}=req.body;
  const id=req.params.uuid

try{
   const send=await prisma.popup_template.update(
    {where:{uuid:id},data:{
    title:title,
    des:des,popup_bg:popup_bg,btn_text:btn_text,btn_bg:btn_bg,text_color:text_color,enable:enable,destination:destination
  }})
    console.log(send)
    res.status(200).send(send)
}
catch(err){
 console.log(err)

}
})

// get the popup template

app.get("/api/get_popup_template",async(req,res)=>{
  try{  
    const getdata =await prisma.popup_template.findMany();
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})

// get the referral email template

app.get("/api/get_referral_email_template",async(req,res)=>{
  try{  
    const getdata =await prisma.mail_template.findMany({where:{OR:[{type_of:'Referral'},{type_of:'member_invite'}]}});
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})

// get the Affiliate email template

app.get("/api/get_affiliate_email_template",async(req,res)=>{
  try{  
    const getdata =await prisma.mail_template.findMany({where:{OR:[{type_of:'Affiliate'},{type_of:'sales'}]},orderBy:{id:'asc'}});
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})

// get the email template

app.get("/api/get_email_template",async(req,res)=>{
  try{  
    const getdata =await prisma.mail_template.findMany({orderBy:{id:'asc'}});
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})
// get the edited email template

app.get("/api/get_update_email_template/:id",async(req,res)=>{
  const uuid=req.params.id;
  try{  
    const getdata =await prisma.mail_template.findUnique({where:{uuid:uuid}});
   // res.json(getdata)  
   res.status(200).send(getdata)
  }
  catch(err){
    console.log(err)
  }
})
// get the affiliate email template

app.get("/api/get_affiliate_email_template",async(req,res)=>{
  try{  
    const getdata =await prisma.mail_template.findMany({where:{type_of:'Affiliate'}});
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})


//edit email template

app.put("/api/editmail_template/:uuid",async(req,res)=>{
  const{title,des,bg,btn_text,btn_bg,text_color,enable}=req.body;
  const id=req.params.uuid

try{
   const send=await prisma.mail_template.update(
    {where:{uuid:id},data:{
    title:title,
    des:des,bg:bg,btn_text:btn_text,btn_bg:btn_bg,text_color:text_color,enable:enable
  }})
    console.log(send)
    res.status(200).send(send)
}
catch(err){
 console.log(err)

}
})

// get the referral campaign list data

app.get("/api/get_referral_camp",async(req,res)=>{
  try{  
    const getdata =await prisma.campaign.findMany({where:{OR:[{camp_type:'Referral'},{camp_type:'Advocate'}]},orderBy:{priority:'asc'}});
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})

// get the affiliate campaign data

app.get("/api/get_affiliate_camp",async(req,res)=>{
  try{  
    const getdata =await prisma.campaign.findMany({where:{camp_type:'Affiliate'},orderBy:{priority:'asc'}});
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})


// get the member data

app.get("/api/get_member",async(req,res)=>{
  try{  
    const getdata =await prisma.members.findMany();
    res.json(getdata)
    
  }
  catch(err){
    console.log(err)
  }
})



// enable  campaign

app.put("/api/referral_camp_enable/:id",async(req,res)=>{
  const uuid=req.params.id;
try{  
  const get=await prisma.campaign.findUnique({where:{uuid:uuid}})
  //res.json(get)
   let status=get?.activate
const getdata =await prisma.campaign.update({where:{uuid:uuid},data:{activate:!status},});
//res.json(getdata)
//console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})



// referral advocate priority

app.put("/api/campa_priority",async(req,res)=>{
  const {newlist,oldlist}=req.body
try{  
 // const getlist=await prisma.campaign.findMany({where:{OR:[{camp_type:'Referral'},{camp_type:'Advocate'}]},orderBy:{id:'asc'}})
 console.log(newlist)
 console.log(oldlist)
  //console.log(pa)

  let uid:string[]=[]
  for(let i=0;i<oldlist.length;i++){
   const list=await prisma.campaign.findFirst({where:{priority:newlist[i]}})
  uid.push(list.uuid)
  //console.log(list.uuid)
  }
  for (let i= 0; i < oldlist.length; i++) {
    //console.log(uid[i])
   const getdata =await prisma.campaign.update({where:{uuid:`${uid[i]}`},data:{priority:oldlist[i]}});  
 // console.log(getdata)
  }
}
catch(err){
console.log(err)
}
})

// affiliate priority

app.put("/api/affiliate_campa_priority",async(req,res)=>{
  const {newlist,oldlist}=req.body
try{  
  
  console.log(newlist)
  console.log(oldlist)
 let uid:string[]=[]
 for(let i=0;i<oldlist.length;i++){
  const list=await prisma.campaign.findFirst({where:{priority:newlist[i]}})
 uid.push(list.uuid)
 //console.log(list.uuid)
 }
 //console.log(uid)

  for (let i= 0; i < oldlist.length; i++) {
    //console.log(uid[i])
   const getdata =await prisma.campaign.update({where:{uuid:`${uid[i]}`},data:{priority:oldlist[i]}});  
 // console.log(getdata)
  }

  //console.log(get)
}
catch(err){
console.log(err)
}
})



// enable members

app.put("/api/member_enable/:id",async(req,res)=>{
  const uuid=req.params.id;
try{  
  const get=await prisma.members.findUnique({where:{uuid:uuid}})
  res.json(get)
   let status=get?.enable
const getdata =await prisma.members.update({where:{uuid:uuid},data:{enable:!status},});
res.json(getdata)
console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})






// delete  campaign

app.delete("/api/delete_referral_camp/:id",async(req,res)=>{
  const uuid=req.params.id;
try{  
const getdata =await prisma.campaign.delete({where:{uuid:uuid}});
//res.json(getdata)
//console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})


// delete members

app.delete("/api/delete_member/:id",async(req,res)=>{
  const uuid=req.params.id;
try{  
const getdata =await prisma.members.delete({where:{uuid:uuid}});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})





//store ui get

app.get("/s/get_store_ui",async(req,res)=>{
  try{  
    const getdata =await prisma.popup_template.findMany();
    res.json(getdata)
    
  }
  catch(err){
    console.log(err)
  }
})


// store post method

app.post("/s/store_data",async(req,res)=>{
  const{email}=req.body;

  try{
    const existinguser=await prisma.members.findUnique({where:{email:email}})
    if(existinguser){
          res.status(200).send({msg:existinguser?.link})
    }
    else{
      const url="https://referral-affiliate-app.myshopify.com/collections/all"
     const senddata=await prisma.members.create({data:{name:"",email:email,link:"",enable:true}})
     const id=await prisma.members.update({where:{email:email},data:{link:url+"?id="+senddata?.uuid}})
     const link=await prisma.members.findUnique({where:{email:email}})
   res.send({msg:link?.link})
    member_mail(id.name,id.email,id.link)
    }  
}
catch(err){
console.log(err)

}
})


// store discount code create check exist customer

app.post("/s/check_email",async(req,res)=>{
  let status = 200;
  let error = null;

  const{email,userid}=req.body;
  const code = Math.random().toString(36).substring(2,8);
 
 
  try{
    const existinguser=await prisma.customers.findUnique({where:{email:email}})
    const existingdis=await prisma.traker.findUnique({where:{referral_email:email}})
    if(existinguser){
          //res.status(404).send({msg:"Email is already exist"})
          res.status(404).send({msg:"Discount only for first customer"})
    }
    else if(existingdis){
      res.status(404).send({msg:existingdis.discount_code})
    }

    
    
    else{   
  
  
    let se={
      sessio:{
       id: 'offline_referral-affiliate-app.myshopify.com',
       shop: 'referral-affiliate-app.myshopify.com',
         state: '458244492263538',
        isOnline: false,
       scope: 'write_discounts',
        accessToken:  'shpua_12ff46b3342db7abb9243fbd66f76690', 
     }}

    
  
    const client = new shopify.api.clients.Graphql({session:se.sessio});
    
    
     const price= await prisma.campaign.findFirst({where:{activate:true,camp_type:'Referral'},orderBy:{priority:'asc'}})
     const member=await prisma.members.findUnique({where:{uuid:userid}})
   const ref=price?.camp_type=="Referral";
   const enable_check=member?.enable==true;
  
  

      if(price && enable_check && ref){
        
        
       if(price?.discount_type=="fixedAmountValue"){
     
     const data= await client.query({
      
        data: {
          query:create_discount,
          variables: {
            basicCodeDiscount:{
             endsAt:price?.end_date,
              code:code,
              customerGets:{
                items: {
                  all: true
                },
                value:{
                 discountAmount: {
                    amount:price?.value,
                    appliesOnEachItem:false
                  
                  },
                 // percentage: 0.2
                }
              },
              customerSelection: {
                all: true
              },
              title:code,
              startsAt:price?.start_date ,
              usageLimit: 5,
              
        },
    },
  
      }

    });
    var da=data.body;}
  else{
    
    const data= await client.query({
      
      data: {
        query:create_discount,
        variables: {
          basicCodeDiscount:{
           endsAt:price?.end_date,
            code:code,
            customerGets:{
              items: {
                all: true
              },
              value:{
             /*   discountAmount: {
                  amount: 10.00,
                  appliesOnEachItem:false
                
                },*/
                percentage:parseInt(price?.value)/100
              }
            },
            customerSelection: {
              all: true
            },
            title:code,
            startsAt:price?.start_date ,
            usageLimit: 5,
            
      },},}})
      var da=data.body;
     
  }

  }
   
    else{
      res.status(404).send({msg:"No pricerule active (or) your not enable"})
    }

    } 

    }  

catch(e){
  if (e instanceof GraphqlQueryError) {
    throw new Error(
      `${e.message}\n${JSON.stringify(e.response, null, 2)}`
    );
  } else {
    throw e;
  }


}
res.status(status).send({ success: status === 200, error,da,});
let send=await prisma.traker.create({data:{advocate_id:userid,referral_email:email,discount_code:`${code}`}})
console.log(send)

})


//webhoook hit block

app.post("/webhook/d",async(req,res)=>{
  const{ discount_applications,line_items,customer,currency,created_at,note_attributes}=req.body;

  let status = 200;
  let error = null;
  console.log(created_at)
  const discode = Math.random().toString(36).substring(2,8);

  const ses={Session:{
    id: 'offline_referral-affiliate-app.myshopify.com',
    shop: 'referral-affiliate-app.myshopify.com',
      state: '458244492263538',
     isOnline: false,
    scope: 'write_discounts',
     accessToken:  'shpua_12ff46b3342db7abb9243fbd66f76690', }}
    // const lo=shopify.config.sessionStorage.findSessionsByShop("referral-affiliate-app.myshopify.com")
    // var current_session=lo[0]
  console.log("webhook called ");
  const aff_id=note_attributes[0]?.value

  try{
    
    var mail=customer.email;
   
    var item_name=line_items[0].name;
    var price=Math.round(line_items[0].price);
    var  quantity=line_items[0].quantity;
   
   if(aff_id){
    const getlist=await prisma.campaign.findMany({where:{camp_type:'Affiliate'},orderBy:{priority:'asc'}})
    //console.log(count)
    let uid:any=[]
    getlist.map((c)=>{uid.push(c.uuid)})

    for (let i= 0; i< uid.length; i++) {
      
    const camp=await prisma.campaign.findFirst({where:{uuid:`${uid[i]}`}})
    console.log(camp)
    let engine = new Engine();

const Rule = {
  conditions: {
    all: [{
      fact: 'amount',
      operator:'greaterThan',
      value: camp.min_val
    }, {
      fact: 'currency',
      operator: 'equal',
      value: camp.order_currency
    },
    {
      fact: 'date',
      operator: 'equal',
      value: camp.order_date
    },
    {
      fact: 'emaildomain',
      operator: 'equal',
      value:camp.order_emaildomain
    }
  ]
  },
  event: {
    type: 'check',
    params: {
      message: 'success'
    }
  }
}


 engine.addRule(Rule)

 let d=moment(created_at).format('DD/MM/YYYY')
let p=Math.round(line_items[0].price)
let m=customer?.email
const ma = m.split('.')[1];

 const facts = {amount:p,currency:currency,date:d,emaildomain:ma}
 
 let status;
 await engine
  .run(facts)
  .then(async({ events }) => {
    events.map(event => status=event.params.message)
  })
  


//engine
 //.on('success', async(event, almanac) => {
  if(status=='success'){
    //console.log('success')
   //if(true){
    const influencer=await prisma.influencer.findUnique({where:{uuid:aff_id}})
    let distype=''
    let q=0
    if(camp.discount_type=='fixedAmountValue'){
       distype='Amount'
       const v=camp.value
        q=parseInt(v) * quantity
        
    }
    else{
      distype='Percentage'
      const v=camp.value
       q=price * parseInt(v)/100
      
    }
     const findinflu=await prisma.payout.findUnique({where:{aff_email:influencer.email}})
     if(findinflu){
      await prisma.payout.update({where:{aff_email:findinflu.aff_email},data:{value:(findinflu.value+q)}})
     }else{
      const store=await prisma.payout.create({data:{aff_email:influencer.email,type:distype,value:q}})
     }
 
    const sales=await prisma.sales.create({data:{item:item_name,amount:price,advocate_id:aff_id,type:'Affiliate',referral_email:mail}})
   // sales_mail(customer.first_name,influencer.email)

    break;
   // }
  }
    
 // })
 //.on('failure', event => {
 else{
  console.log('failed')
  }
  //})
    }


   }
    else{
      var code=discount_applications[0]?.code
    const verify_email=await prisma.traker.findUnique({where:{referral_email:mail}})
    const verify_code=await prisma.traker.findUnique({where:{discount_code:code}})
    
    if(verify_email && verify_code){
     var i= verify_email.advocate_id
   const user=await prisma.members.findUnique({where:{uuid:i}})  

   var sendmail=user?.email

   const client = new shopify.api.clients.Graphql({session:ses.Session});
   const getlist=await prisma.campaign.findMany({where:{camp_type:'Advocate'},orderBy:{priority:'asc'}})
   //console.log(count)
   let uid:string[]=[]
   getlist.map((c)=>{uid.push(c.uuid)})

  // const rule= await prisma.campaign.findFirst({where:{activate:true,camp_type:'Referral'},orderBy:{priority:'asc'}})
  // const rule1= await prisma.campaign.findFirst({where:{activate:true,camp_type:'Referral',priority:'1'}})
  // let val=parseInt(rule.min_val)
 // console.log(val)
  
  for (let i= 0; i< uid.length; i++) {
      
const rule=await prisma.campaign.findFirst({where:{uuid:`${uid[i]}`}})
  
let engine = new Engine();

const Rule = {
  conditions: {
    all: [{
      fact: 'amount',
      operator:'greaterThan',
      value: rule.min_val
    }, {
      fact: 'currency',
      operator: 'equal',
      value: rule.order_currency
    },
    {
      fact: 'date',
      operator: 'equal',
      value: rule.order_date
    },
    {
      fact: 'emaildomain',
      operator: 'equal',
      value:rule.order_emaildomain
    }
  ]
  },
  event: {
    type: 'check',
    params: {
      message: 'success'
    }
  }
}


 engine.addRule(Rule)

let d=moment(created_at).format('DD/MM/YYYY')
let p=Math.round(line_items[0].price)
let m=customer?.email
const ma = m.split('.')[1];


const facts = {amount:p,currency:currency,date:d,emaildomain:ma}

let status;
await engine
  .run(facts)
  .then(({ events }) => {
    events.map(event => status=event.params.message)
  })



//  engine.on('success',async (event, almanac) => {
   if(status=='success'){
     
     if(rule){
     
      if(rule?.discount_type=="fixedAmountValue"){
        res.json(rule)
     const data= await client.query({
      
        data: {
          query:create_discount,
          variables: {
            basicCodeDiscount:{
             endsAt:rule?.end_date,
              code:discode,
              customerGets:{
                items: {
                  all: true
                },
                value:{
                 discountAmount: {
                    amount:rule?.value,
                    appliesOnEachItem:false
                  
                  },
                 // percentage: 0.2
                }
              },
              customerSelection: {
                all: true
              },
              title:discode,
              startsAt:rule?.start_date,
              usageLimit: 5,
              
        },
    },
  
      }

    });
    var da=data.body;}
  else{
    
    const data= await client.query({
      
      data: {
        query:create_discount,
        variables: {
          basicCodeDiscount:{
           endsAt:rule?.end_date,
            code:discode,
            customerGets:{
              items: {
                all: true
              },
              value:{
             /*   discountAmount: {
                  amount: 10.00,
                  appliesOnEachItem:false
                
                },*/
                percentage:parseInt(rule?.value)/100
              }
            },
            customerSelection: {
              all: true
            },
            title:discode,
            startsAt:rule?.start_date ,
            usageLimit: 5,
            
      },},}})
      var da=data.body;
     
  }
 
  var usermail=customer.email
  let friend_name=customer.first_name
 let custid=customer.admin_graphql_api_id
  
   let send=await prisma.customers.create({data:{name:friend_name,email:usermail,customer_id:custid}})
   let add_member=await prisma.members.create({data:{name:friend_name,email:usermail,link:'',enable:true}})
   const url="https://referral-affiliate-app.myshopify.com/collections/all";
   const update_member=await prisma.members.update({where:{uuid:add_member.uuid},data:{link:url+"?id="+add_member.uuid}})
  console.log(send)
  console.log(update_member)
  //member invite email
 member_mail(update_member.name,update_member.email,update_member.link)

 let ad_id=await prisma.traker.findUnique({where:{discount_code:code}})
 let member=await prisma.members.findUnique({where:{uuid:ad_id.advocate_id}})
  let sale=await prisma.sales.create({data:{item:item_name,amount:(quantity*price),advocate_id:member.email,type:"Referral",referral_email:usermail}})
 console.log(sale)
 // member get discount email
 const exist=await prisma.member_discount.findUnique({where:{email:sendmail}})
 if(exist){
const a= await prisma.member_discount.update({where:{email:sendmail},data:{discounts:{push:discode}}})
console.log(a)
 }
 else{
 const c= await prisma.member_discount.create({data:{email:sendmail,discounts:[discode]}})
  console.log(c)
 }
 advocate_mail(discode,sendmail,friend_name)
//sales mail
sales_mail(friend_name,member.email)
 
break;
     }
   }
  //}).on('failure', event => {
  else{
    console.log('failed')
  }  
 
  // })

  }
  
    }


    else{
      console.log("error")
    }

  }
  }
  catch(e){
    if (e instanceof GraphqlQueryError) {
      throw new Error(
        `${e.message}\n${JSON.stringify(e.response, null, 2)}`
      );
    } else {
      throw e;
    }


  }
 
  res.status(status).send({ success: status === 200, error,});
})



app.get("/api/get_total_member",async(req,res)=>{
  try{
     let total=await prisma.members.count()
   res.status(200).send({msg:total})
  }
  catch(err){
    console.log(err)
  }
})

app.get("/api/get_total_customer",async(req,res)=>{
  try{
     let total=await prisma.sales.count({where:{type:"Referral"}})
     res.status(200).send({msg:total})
  }
  catch(err){
    console.log(err)
  }
})

app.get("/api/get_total_revenue",async(req,res)=>{
  try{
     let total=await prisma.sales.aggregate({_sum:{amount:true}})
     res.status(200).send({msg:total})
  }
  catch(err){
    console.log(err)
  }
})

// get the referral data

app.get("/api/get_referral_sales",async(req,res)=>{
  try{  
    const getdata =await prisma.sales.findMany({where:{type:'Referral'}});
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})
// get the Affiliate sales data

app.get("/api/get_Affiliate_sales",async(req,res)=>{
  try{  
    const getdata =await prisma.sales.findMany({where:{type:'Affiliate'}});
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})
// get the tracker data

app.get("/api/get_track",async(req,res)=>{
  try{  
    const getdata =await prisma.traker.findMany();
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})


// get the payout data

app.get("/api/get_payout",async(req,res)=>{
  try{  
    const getdata =await prisma.payout.findMany();
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})


//create influencer

app.post("/api/create_influencer",async(req,res)=>{
  const{name,email}=req.body;
try{
     const existinguser=await prisma.influencer.findUnique({where:{email:email}})
     if(existinguser){
           res.status(404).send({msg:"Email is already exist"})
     }
     else{
      const find=await prisma.members.findUnique({where:{email:email}})
      if(find){
        const url="https://referral-affiliate-app.myshopify.com/"
        const senddata=await prisma.influencer.create({data:{uuid:find.uuid,name:name,email:email,link:url+"?aff_id="+find.uuid,enable:true}})
       // const id=await prisma.influencer.update({where:{email:email},data:{link:url+"?aff_id="+senddata?.uuid}})
        console.log(senddata)
        res.status(200).send(senddata)
      }
      else{
       const url="https://referral-affiliate-app.myshopify.com/"
      const senddata=await prisma.influencer.create({data:{name:name,email:email,link:"",enable:true}})
      const id=await prisma.influencer.update({where:{email:email},data:{link:url+"?aff_id="+senddata?.uuid}})
      console.log(senddata)
      res.status(200).send(id)
      }
     }  
}
catch(err){
 console.log(err)

}
})

// enable influencer

app.put("/api/influencer_enable/:id",async(req,res)=>{
  const uuid=req.params.id;
try{  
  const get=await prisma.influencer.findUnique({where:{uuid:uuid}})
  res.json(get)
   let status=get?.enable
const getdata =await prisma.influencer.update({where:{uuid:uuid},data:{enable:!status},});
res.json(getdata)
console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})

//send influencer email

app.post("/api/send_influencer_email/:id",async(req,res)=>{
  const uuid=req.params.id;
  try{
    const get=await prisma.influencer.findUnique({where:{uuid:uuid}})
    const name=get.name;
    const email=get.email;
    const link=get.link;
    await influencer_mail(name,email,link)

  }
  catch(err){
    console.log(err)
  }
})



// get the influencer data

app.get("/api/get_influencer",async(req,res)=>{
  try{  
    const getdata =await prisma.influencer.findMany();
    res.json(getdata)  
  }
  catch(err){
    console.log(err)
  }
})



// delete influencer

app.delete("/api/delete_influencer/:id",async(req,res)=>{
  const uuid=req.params.id;
try{  
const getdata =await prisma.influencer.delete({where:{uuid:uuid}});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})



// enable popup

app.put("/api/enable_popup/:id",async(req,res)=>{
  const uuid=req.params.id;
try{  
  const get=await prisma.popup_template.findUnique({where:{uuid:uuid}})
  res.json(get)
   let status=get?.enable
const getdata =await prisma.popup_template.update({where:{uuid:uuid},data:{enable:!status},});
//res.json(getdata)
console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})


app.put("/api/update_member/:id",async(req,res)=>{
  const uuid=req.params.id;
  const {name,email}=req.body;
try{  
const getdata =await prisma.members.update({where:{uuid:uuid},data:{name:name,email:email},});
//res.json(getdata)
console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})

app.get("/api/update_get_member/:id",async(req,res)=>{
  const uuid=req.params.id;
  try{
   const send=await prisma.members.findUnique({where:{uuid:uuid}})
   res.status(200).send(send)
  }
  catch(err){
    console.log(err)
  }
})

app.get("/api/update_get_influ/:id",async(req,res)=>{
  const uuid=req.params.id;
  try{
   const send=await prisma.influencer.findUnique({where:{uuid:uuid}})
   res.status(200).send(send)
  }
  catch(err){
    console.log(err)
  }
})

app.put("/api/update_influ/:id",async(req,res)=>{
  const uuid=req.params.id;
  const {name,email}=req.body;
try{  
const getdata =await prisma.influencer.update({where:{uuid:uuid},data:{name:name,email:email},});
//res.json(getdata)
console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})




app.get("/api/update_get_refe/:id",async(req,res)=>{
  const uuid=req.params.id;
  try{
   const send=await prisma.campaign.findUnique({where:{uuid:uuid}})
   res.status(200).send(send)
  }
  catch(err){
    console.log(err)
  }
})

app.put("/api/update_refe/:id",async(req,res)=>{
  const uuid=req.params.id;
  const{campname,disval,selectdisval,startdate,enddate,camptype,minvalue,order_date,order_emaildomain,order_currency}=req.body;
try{  
const getdata =await prisma.campaign.update({where:{uuid:uuid},data:{pricerule_name:campname,discount_type:selectdisval, 
  value:disval,
  start_date:startdate,
  end_date:enddate,
  camp_type:camptype,
  min_val:minvalue,
  order_currency:order_currency,
  order_date:order_date,
  order_emaildomain:order_emaildomain,
  activate:true,},});
//res.json(getdata)
console.log(getdata)   
res.status(200).send(getdata)
}
catch(err){
console.log(err)
}
})

// create page
app.post("/api/create_page",async(req,res)=>{
  try{
    const page = new shopify.api.rest.Page({session:res.locals.shopify.session});
    page.title = "My Account";
    page.body_html = "<h2>My_Account</h2>";
    page.published = false;
    await page.save({
      update: true,
    });
    console.log(page)
    res.status(200).send(page)
  }
  catch(err){
    console.log(err)
  }
})

app.put("/api/update_page",async(req,res)=>{
  try{
    const page = new shopify.api.rest.page({session:res.locals.shopify.session});
    page.id =119467508002;
    page.body_html=myaccount
    await page.save({
      update: true,
    });
    console.log(page)
    res.status(200).send(page)
  }
  catch(err){
    console.log(err)
  }
})


// store my account


app.post("/s/myaccount",async(req,res)=>{
  const{email}=req.body;
  try{
    const find=await prisma.members.findUnique({where:{email:email}})
    const find2=await prisma.influencer.findUnique({where:{email:email}})
    if(find && find2){
      const count=await prisma.sales.count({where:{advocate_id:find.uuid}})
        const amount=await prisma.payout.aggregate({where:{aff_email:{contains:email}},_sum:{value:true}})
        res.status(200).send({count:count,amount:amount,name:find.name})
    }
   else if(find){
      const count=await prisma.sales.count({where:{advocate_id:find.uuid,type:'Referral'}})
      const dis=await prisma.member_discount.findUnique({where:{email:email}})
      res.status(200).send({count:count,name:find.name,discount:dis.discounts})
    }
    else{
      const find1=await prisma.influencer.findUnique({where:{email:email}})
      if(find1){
        const count=await prisma.sales.count({where:{advocate_id:find1.uuid,type:'Affiliate'}})
        const amount=await prisma.payout.aggregate({where:{aff_email:{contains:email}},_sum:{value:true}})
        res.status(200).send({count:count,amount:amount,name:find1.name})
      }
      else{
        res.status(404).send({msg:"Your not a Advocate or Influencer"})
      }
    }
  }
  catch(err){
    console.log(err)
  }
})

// get the campa data

app.get("/api/camp_rule/:id",async(req,res)=>{
  const uuid=req.params.id
  try{  
    const getdata =await prisma.campaign.findMany({where:{uuid:uuid}});
    //res.json(getdata) 
   res.status(200).send(getdata)
  }
  catch(err){
    console.log(err)
  }
})


app.put("/api/create_script",async(req,res)=>{
  try{
  
const script_tag = new shopify.api.rest.ScriptTag({session:res.locals.shopify.session});
script_tag.id =229588828450;
script_tag.src = "https://cdn.jsdelivr.net/gh/karthicksarankalemuthu/scripts@7c6488f390c20e121e88339806afa17dc4f2a60a/index.js";
await script_tag.save({
  update: true,
});
console.log(script_tag)
  }
  catch(err){
    console.log(err)
  }
})



app.post("/api/metaobject_defination",async(req,res)=>{
   try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:metaobject_defination,
         variables: {
          definition: {
            name: "popup",
            type: "popup",
            fieldDefinitions: [
              {
                name: "title",
                key: "title",
                type: "single_line_text_field",
                validations: [
                  {
                    name: "max",
                    value: "30"
                  }
                ]
              },
              {
                name: "des",
                key: "des",
                type: "multi_line_text_field",
                validations: [
                  {
                    name: "max",
                    value: "225"
                  }
                ]
              },
              {
                name: "popup_bg",
                key: "popup_bg",
                type: "single_line_text_field",
                validations: [
                  {
                    name: "max",
                    value: "30"
                  }
                ]
              },
              {
                name: "btn_text",
                key: "btn_text",
                type: "single_line_text_field",
                validations: [
                  {
                    name: "max",
                    value: "30"
                  }
                ]
              },
              {
                name: "btn_bg",
                key: "btn_bg",
                type: "single_line_text_field",
                validations: [
                  {
                    name: "max",
                    value: "30"
                  }
                ]
              },
              {
                name: "text_color",
                key: "text_color",
                type: "single_line_text_field",
                validations: [
                  {
                    name: "max",
                    value: "30"
                  }
                ]
              },
              {
                name: "enable",
                key: "enable",
                type: "single_line_text_field",
                validations: [
                  {
                    name: "max",
                    value: "30"
                  }
                ]
              }
            ]
          }
        },
      },
    });
    console.log(data)
    
   }
   catch(err){
    console.log(err)
    res.status(404).send(err)
   }
})


app.get("/api/get_metaobject_defination",async(req,res)=>{
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:get_metaobject_defination}
      })
      res.status(200).send(data)
  }
  catch(err){
  res.status(404).send(err)
  }
})


app.post("/api/metaobject",async(req,res)=>{
  try{
   const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
   const data = await client.query({
     data: {
       query:metaobject,
       variables: {
        metaobject: {
          type: "popup",
          fields: [
            {
              key:"title",
              value:"🎉 Refer & Get 10% Offer"
            },
            {
              key:"des",
              value:"Invite your friends to get ₹100 off For each friend you refer youll get 20% offer"
            },
            {
              key:"popup_bg",
              value:"rgba(190, 173, 190, 1)"
            },
            {
              key:"btn_text",
              value:"Get invite link"
            },
            {
              key:"btn_bg",
              value:"rgba(233, 77, 77, 1)"
            },
            {
              key:"text_color",
              value:"rgba(0, 0, 0, 1)"
            },
            {
              key:"enable",
              value:`${true}`
            },
          ]
        }
      },
    },
   });
   res.status(200).send(data)
   
  }
  catch(err){
   console.log(err)
   res.status(404).send(err)
  }
})

app.get("/api/get_metaobject",async(req,res)=>{
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:get_metaobject}
      })
      
      //res.status(200).send(data.body.data.metaobjects.edges[0].node.field)
      res.status(200).send(data.body.data.metaobjects.edges[0].node)
  }
  catch(err){
  res.status(404).send(err)
  }
})

app.get("/api/get_popup_metaobject",async(req,res)=>{
    
  try{
    //let url="gid://shopify/Metaobject/"+gid;
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query: `query{
          metaobject(id:"gid://shopify/Metaobject/2214592802") {
            id
            fields {
              value
              key
            }
          }
        }`
      }
      })
      
      //res.status(200).send(data.body.data.metaobjects.edges[0].node.field)
      res.status(200).send(data.body.data.metaobject)
  }
  catch(err){
  res.status(404).send(err)
  }
})


app.put("/api/editpopup_metaobject",async(req,res)=>{
  const{title,des,popup_bg,btn_text,btn_bg,text_color,enable}=req.body;
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:update_popup_metaobject,
        variables: {
          id: "gid://shopify/Metaobject/2214592802",
          metaobject: {
            fields: [
              {
                key:"title",
                value:title
              },
              {
                key:"des",
                value:des
              },
              {
                key:"popup_bg",
                value:popup_bg
              },
              {
                key:"btn_text",
                value:btn_text
              },
              {
                key:"btn_bg",
                value:btn_bg
              },
              {
                key:"text_color",
                value:text_color
              },
              {
                key:"enable",
                value:`${true}`
              },
            ]
          }
        }
      }
    })

    res.status(200).send(data)
    console.log(data)
  }
  catch(err){
    res.status(404).send(err)
    console.log(err)
  }
})


app.put("/api/enablepopup_metaobject",async(req,res)=>{
 // const{enable}=req.body;
 const{enable}=req.body;
  let val
  if(enable==true){
   val="false"
  }
  else{
    val="true"
  }
  console.log(enable)
  console.log(val)
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:enable_popup_metaobject,
        variables: {
          id: "gid://shopify/Metaobject/2214592802",
          metaobject: {
            fields: [
              {
                key:"enable",
                value:val
              }
            ]
          }
        }
      }
    })

    res.status(200).send(data.body.data.metaobjectUpdate)
   // console.log(data)
  }
  catch(err){
    res.status(404).send(err)
    console.log(err)
  }
})



app.put("/api/update_metaobject_defination",async(req,res)=>{
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:update_metaobject_defination,
        variables: {
          id: "gid://shopify/MetaobjectDefinition/380731682",
          definition: {
            access: {
              storefront:"PUBLIC_READ"
            },
            capabilities: {
              publishable: {
                enabled:true
              }
            },
          }
        },
      }
      })
      res.status(200).send(data)
  }
  catch(err){
    res.status(404).send(err)
  }
})


app.delete("/api/delete_metaobjectfielddefination",async(req,res)=>{
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:delete_metaobject_fielddefination,
    variables: {
      id: "gid://shopify/MetaobjectDefinition/380469538",
      definition: {
        fieldDefinitions: [
          {
            delete: {
              key: "email"
            }
          }
        ]
      }
    },
  }
})
res.status(200).send(data)
  }
  catch(err){
    res.status(404).status(err)
  }
})


app.delete("/api/delete_metaobject",async(req,res)=>{
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:delete_metaobject,
    variables: {
      id:"gid://shopify/Metaobject/2214396194",
    },
  }
})
res.status(200).send(data)
  }
  catch(err){
    res.status(404).status(err)
  }
})

app.delete("/api/delete_metaobject_defination",async(req,res)=>{
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:delete_metaobject_defination,
    variables: {
      id:"gid://shopify/MetaobjectDefinition/380469538",
    },
  }
})
res.status(200).send(data)
  }
  catch(err){
    res.status(404).send(err)
  }
})

app.put("/api/update_metaobject",async(req,res)=>{
  try{
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data: {
        query:update_metaobject,
    variables: {
      id:"gid://shopify/Metaobject/2214592802",
      metaobject: {
        capabilities:{
          publishable:{
            status:"ACTIVE"
          },
        },
      },
    },
  }
})
res.status(200).send(data)
  }
  catch(err){
    res.status(404).send(err)
  }
})
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
