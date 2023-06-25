import pkg from 'nodemailer';
const nodemailer  = pkg;
import pkg1 from '@prisma/client';
import { ColorTranslator} from 'colortranslator';
import { link } from 'fs';

const { PrismaClient } = pkg1;

const prisma= new PrismaClient();



// advocate get discount code email

export async function advocate_mail(code:string,usermail:string,friend_name:string) {
    
     try{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
      auth: {
        user:"karthicksarankalemuthu@gmail.com", 
        pass:"mmbjpprzabgeipdy", 
      },
    });
  

      const ui= await prisma.mail_template.findMany({where:{type_of:'Referral'}})
     var title=ui[0].title
     var des=ui[0].des
     var  bg=ColorTranslator.toHEX(ui[0].bg)
      var btn_text =ui[0].btn_text
      var btn_bg =ColorTranslator.toHEX(ui[0].btn_bg)
       var text_color=ColorTranslator.toHEX(ui[0].text_color)
     
    var html=`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title> Email Template</title>
        <style>
        .container{
          width:500px;
          height:600px;
          margin-left:100px;
          background-color:${bg};
        }
       .title{
        margin-left:50px;
        color:${text_color};
        font-size:30px;
        font-weight:700;
       }
       .container .title{
        margin-top:50px;
       }
      .des{
        margin-left:20px;
        margin-top:10px;
        color:${text_color};
        font-size:20px;
        font-weight:400;
      }
      .code-container{
        width:300px;
        height:50px;
        border:2px dashed black;
        margin:80px;
      }
      .code{
        display:flex;
        align-item:center;
        justify-content:center;
        margin-left:100px;
        color:${text_color};
        font-size:25px;
        font-weight:700;
      }
      .button{
        width:200px;
        height:50px;
        margin-left:150px;
        background-color:${btn_bg};
       

      }
      .button a{
        text-decoration:none;
        color:${text_color};
      }
        </style>
        </head>
        <body>
       <div class="container">
       <h1 class="title">${title}</h1><br/>
       <p class="des">${friend_name}  ${des}</p>
       <div class="code-container"><center class="code">${code}</center></div>
       <button class="button"><a href="https://referral-affiliate-app.myshopify.com/" >${btn_text}</a></button>
       </div>
       </body>
       </html>
       `

  console.log(`${bg}`)
  console.log(bg)

  
    let info = await transporter.sendMail({
      from:"karthicksarankalemuthu@gmail.com", 
      to: `${usermail}`, 
      subject: " 🎉 Congrats You earn the coupon",
      html:html
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Mail send successfully");
}
catch(e){
    console.log(e)
}
   
  }
  


  // influencer invite email
 
  export async function influencer_mail(name:string,email:string,link:string) {
    
    try{
   let transporter = nodemailer.createTransport({
       service: "gmail",
       host: "smtp.gmail.com",
       port: 587,
       secure: false,
     auth: {
       user:"karthicksarankalemuthu@gmail.com", 
       pass:"mmbjpprzabgeipdy", 
     },
   });
 

     const ui= await prisma.mail_template.findMany({where:{type_of:'Affiliate'}})
    var title=ui[0].title
    var des=ui[0].des
    var  bg=ColorTranslator.toHEX(ui[0].bg)
     var btn_text =ui[0].btn_text
     var btn_bg =ColorTranslator.toHEX(ui[0].btn_bg)
      var text_color=ColorTranslator.toHEX(ui[0].text_color)
    
   var html=`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <title> Email Template</title>
       <style>
       .container{
         width:500px;
         height:600px;
         margin-left:100px;
         background-color:${bg};
       }
      .title{
       margin-left:50px;
       color:${text_color};
       font-size:30px;
       font-weight:700;
      }
      .container .title{
       margin-top:50px;
      }
     .des{
       margin-left:20px;
       margin-top:10px;
       color:${text_color};
       font-size:20px;
       font-weight:400;
     }
    .name{
      fontSize:15px;
      fontWeight:400;
      color:${text_color};
      marginLeft:10px;
    }
     .button{
       width:200px;
       height:50px;
       margin-left:150px;
       background-color:${btn_bg};
       marginTop:140px;

     }
     .button a{
       text-decoration:none;
       color:${text_color};
     }
       </style>
       </head>
       <body>
      <div class="container">
      <h1 class="title">${title}</h1><br/>
      <h1 class="name" >Hey ${name}</h1>
      <p class="des"> ${des}</p>
     
      <button class="button"><a href="${link}" >${btn_text}</a></button>
      </div>
      </body>
      </html>
      `


 
   let info = await transporter.sendMail({
     from:"karthicksarankalemuthu@gmail.com", 
     to: `${email}`, 
     subject: " 🤘 Hey! Shall we collaborate",
     html:html
   });
 
   console.log("Message sent: %s", info.messageId);
   console.log("Mail send successfully");
}
catch(e){
   console.log(e)
}
  
 }
 
// Member invite email
 
export async function member_mail(name:string,email:string,link:string) {
    
  try{
 let transporter = nodemailer.createTransport({
     service: "gmail",
     host: "smtp.gmail.com",
     port: 587,
     secure: false,
   auth: {
     user:"karthicksarankalemuthu@gmail.com", 
     pass:"mmbjpprzabgeipdy", 
   },
 });


   const ui= await prisma.mail_template.findMany({where:{type_of:'member_invite'}})
  var title=ui[0].title
  var des=ui[0].des
  var  bg=ColorTranslator.toHEX(ui[0].bg)
   var btn_text =ui[0].btn_text
   var btn_bg =ColorTranslator.toHEX(ui[0].btn_bg)
    var text_color=ColorTranslator.toHEX(ui[0].text_color)
  
 var html=`
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title> Email Template</title>
     <style>
     .container{
       width:500px;
       height:600px;
       margin-left:100px;
       background-color:${bg};
     }
    .title{
     margin-left:50px;
     color:${text_color};
     font-size:30px;
     font-weight:700;
    }
    .container .title{
     margin-top:50px;
    }
   .des{
     margin-left:20px;
     margin-top:10px;
     color:${text_color};
     font-size:20px;
     font-weight:400;
   }
  .name{
    fontSize:15px;
    fontWeight:400;
    color:${text_color};
    marginLeft:10px;
  }
   .button{
     width:200px;
     height:50px;
     margin-left:150px;
     background-color:${btn_bg};
     marginTop:140px;

   }
   .button a{
     text-decoration:none;
     color:${text_color};
   }
     </style>
     </head>
     <body>
    <div class="container">
    <h1 class="title">${title}</h1><br/>
    <h1 class="name" >Hey ${name}</h1>
    <p class="des"> ${des}</p>
   
    <button class="button"><a href="${link}" >${btn_text}</a></button>
    </div>
    </body>
    </html>
    `



 let info = await transporter.sendMail({
   from:"karthicksarankalemuthu@gmail.com", 
   to: `${email}`, 
   subject: " 🤘 Hey! Shall we collaborate",
   html:html
 });

 console.log("Message sent: %s", info.messageId);
 console.log("Mail send successfully");
}
catch(e){
 console.log(e)
}

}



  // sales email
 
  export async function sales_mail(name:string,email:string) {
    
    try{
   let transporter = nodemailer.createTransport({
       service: "gmail",
       host: "smtp.gmail.com",
       port: 587,
       secure: false,
     auth: {
       user:"karthicksarankalemuthu@gmail.com", 
       pass:"mmbjpprzabgeipdy", 
     },
   });
 

     const ui= await prisma.mail_template.findMany({where:{type_of:'sales'}})
    var title=ui[0].title
    var des=ui[0].des
    var  bg=ColorTranslator.toHEX(ui[0].bg)
     var btn_text =ui[0].btn_text
     var btn_bg =ColorTranslator.toHEX(ui[0].btn_bg)
      var text_color=ColorTranslator.toHEX(ui[0].text_color)
    
   var html=`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <title> Email Template</title>
       <style>
       .container{
         width:500px;
         height:600px;
         margin-left:100px;
         background-color:${bg};
       }
      .title{
       margin-left:50px;
       color:${text_color};
       font-size:30px;
       font-weight:700;
      }
      .container .title{
       margin-top:50px;
      }
     .des{
       margin-left:20px;
       margin-top:10px;
       color:${text_color};
       font-size:20px;
       font-weight:400;
     }
    .name{
      fontSize:15px;
      fontWeight:400;
      color:${text_color};
      marginLeft:10px;
    }
    
       </style>
       </head>
       <body>
      <div class="container">
      <h1 class="title">${title}</h1><br/>
      <h1 class="name" >Hey ${name}</h1>
      <p class="des"> ${des}</p>
     
     
      </div>
      </body>
      </html>
      `


 
   let info = await transporter.sendMail({
     from:"karthicksarankalemuthu@gmail.com", 
     to: `${email}`, 
     subject: "🎉 Congrats You get sale ",
     html:html
   });
 
   console.log("Message sent: %s", info.messageId);
   console.log("Mail send successfully");
}
catch(e){
   console.log(e)
}
  
 }
//advocate_mail("jytd980","karthicksaranvanitha@gmail.com","Ram")
//sales_mail("karthick","karthicksaranvanitha@gmail.com")
//member_mail("ravi","karthicksaranvanitha@gmail.com","www.google.com")
