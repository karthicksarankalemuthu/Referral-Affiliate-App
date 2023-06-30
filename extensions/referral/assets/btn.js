const btn=document.getElementById("btn");
const popup=document.getElementById("container");
const closebtn=document.getElementById("closebtn");
const text=document.getElementById("text");
const submit=document.getElementById("button");
const closepopup=document.getElementById("closepopup");
const dispopup=document.getElementById("popup-container");
const code = document.getElementById("code");
const get = document.getElementById("get");
const next_btn=document.getElementById("next-btn");
const mail=document.getElementById("mail");
const twitter=document.getElementById("twitter");
const facebook=document.getElementById("facebook");
const title = document.getElementById("title");
const des = document.getElementById("des");
const a = document.getElementById("a");




  //  1	"f9b145d0-1b5b-49ad-90a1-eccebfd5d41a"	"🎉 Refer & Get 10% Offer"	"Invite your friends to get ₹100 off For each friend you refer you'll get 20% offer"
    //"rgba(190, 173, 190, 1)"	"Get invite link"	"rgba(233, 77, 77, 1)"	"rgba(0, 0, 0, 1)"
   
 if(btn) { 
btn.addEventListener("click",()=>{
  popup.style.visibility="visible";
   btn.style.visibility="hidden";
   closebtn.style.visibility="visible";
    
})
 }
 if(closebtn){
 closebtn.addEventListener("click",()=>{
  popup.style.visibility="hidden";
  btn.style.visibility="visible";
  closebtn.style.visibility="hidden";
 })
 }
 if(closepopup){
 closepopup.addEventListener("click",()=>{
  dispopup.style.visibility="hidden";
 
 })}
 const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);
 let d=urlParams.get('id')
 //console.log(d)
 if(d){
  dispopup.style.visibility="visible";
 }
 
 

if(submit){
  submit.addEventListener("click",async(e)=>{
  const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);
 let d=urlParams.get('id')
 
 if(submit.innerHTML="get 10% off"){
 e.preventDefault()
  let res= await fetch("/apps/app/s/store_data",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*',
      'ngrok-skip-browser-warning':'69420'
    },
  body: JSON.stringify({
    email:text.value
    })

  })
   // console.log(text.value)
   let rsu=await res.json()
    let val=rsu?.msg;
    text.value=val;
    submit.innerHTML="copy"}
    if(submit.innerHTML="copy"){
      navigator.clipboard.writeText(text.value)
      submit.innerHTML="copied"
      
    }
    
   
       
 })
}
 
 if(get){
 get.addEventListener("click",async(e)=>{
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let d=urlParams.get('id')
  e.preventDefault()
  let res= await fetch("/apps/app/s/check_email",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*',
      'ngrok-skip-browser-warning':'69420'
    },
  body: JSON.stringify({
    email:code.value,
     userid:d
    })

  })
  let rsu=await res.json()
  //console.log(rsu)
  let err=rsu?.msg
  console.log(err)
  if(err){
    code.value=err
  }
  let val=rsu.da.data.discountCodeBasicCreate.codeDiscountNode.codeDiscount.codes.edges[0].node.code;
 
  if(val){
    code.value=val
  }
  
 
 }) 
}

async function setdata(){
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let d=urlParams.get('aff_id')
if(d){
  //data=JSON.stringify({attributes:{id:d}})
  const obj = {attributes:{aff_id: d}};
 const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
   const i= navigator.sendBeacon("https://referral-affiliate-app.myshopify.com/cart/update",blob);
   console.log(i)

}
}
setdata()


window.addEventListener("load", (event) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let d=urlParams.get('aff_id')
  if(d){
    
    const obj = {attributes:{aff_id: d}};
   const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
     const i= navigator.sendBeacon("https://referral-affiliate-app.myshopify.com/cart/update",blob);
     console.log(i)
  
  }
});




async function getui(){
let res= await fetch("/apps/app/s/get_store_ui",
{
  method:"GET",
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json',
    'Access-Control-Allow-Origin':'*',
    'ngrok-skip-browser-warning':'69420'
  }})
res=await res.json()
const en=res[0].enable;
 if(en==true){
   console.log(res)
   title.innerHTML=res[0].title;
   des.innerHTML=res[0].des;
   submit.innerHTML=res[0].btn_text;
   title.style.color=res[0].text_color;
   des.style.color=res[0].text_color;
   submit.style.color=res[0].text_color;
   popup.style.backgroundColor=res[0].popup_bg;
   submit.style.backgroundColor=res[0].btn_bg;
   btn.innerHTML=res[0].btn_text;
   btn.style.backgroundColor=res[0].btn_bg;
   dispopup.style.backgroundColor=res[0].popup_bg;
   get.style.backgroundColor=res[0].btn_bg;
   next_btn.style.backgroundColor=res[0].btn_bg;
   get.style.color=res[0].text_color;
   next_btn.style.color=res[0].text_color;
   a.style.color=res[0].text_color;
   closebtn.style.backgroundColor=res[0].btn_bg;
   closebtn.style.color=res[0].text_color;
  
 }
 else{
  btn.style.visibility="hidden";
 }

  }

  //getui()








