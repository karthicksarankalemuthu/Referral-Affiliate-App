export const myaccount=`<h1 style="color:#FF5161;font-weight:900;">DashBoard</h1>
                        <div>
                        <input id="mail" style="width:300px;height:35px;border-radius:10px;outline:none;" type="email" placeholder="enetr email"/>
                        <button  id="n" style="width:150px;height:35px;border-radius:10px;color:#FF5161;background-color:#E7E9F6;outline:none;border:none">submit</button>\n
                        <div>
                        <h2 id="name" style="font-weight:600;color:#FF5161;">Hello</h2>
                        <h2 id="error" style="font-weight:600;color:#FF5161;"></h2>
                        <div style="margin:20px;display:inline-flex">
                        <div id="referral_container" style="width:230px;height:150px;border-radius:40px;color:white;background-color:#E7E9F6;margin-right:20px">
                         <h2 style="color:#FF5161;margin-left:20px">Referred customer</h2>
                         <h3 id="member" style="color:#FF5161;margin-left:85px;font-weight:900;font-size:25px">10</h3>
                        </div>
                        <div id="revenue_container" style="visibility:visible;width:230px;height:150px;border-radius:40px;color:white;background-color:#E7E9F6">
                        <h2 id="revenue_title"style="color:#FF5161;margin-left:20px">Total Revenue</h2>
                         <h3 id="amount" style="color:#FF5161;margin-left:75px;font-weight:900;font-size:25px">₹260</h3>
                        </div>
                        </div>
                        <script  type="text/javascript">

                        const n=document.getElementById("n");
                        const m=document.getElementById("mail");
                        const member=document.getElementById("member");
                        const revenue=document.getElementById("amount");
                        const name=document.getElementById("name");
                        const err=document.getElementById("error");
                        const cont=document.getElementById("revenue_container");
                        const con=document.getElementById("referral_container");
                        const t=document.getElementById("revenue_title");

                        n.addEventListener("click",async()=>{
                          let res= await fetch("/apps/app/s/myaccount",{
                            method:"POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept':'application/json',
                              'Access-Control-Allow-Origin':'*',
                              'ngrok-skip-browser-warning':'69420'
                            },
                          body: JSON.stringify({
                            email:m.value
                            })
                        
                          })
                           let rsu=await res.json()
                             console.log(rsu)
                             const dis=rsu.discount;
                             console.log(dis)
                         // const dislist=()=>(<ul>{dis.map(i,name => <li key={i}> {name} </li>)}</ul>);
                             let count=rsu?.count;
                             let amount=rsu?.amount?._sum?.value;
                             let error=rsu?.msg;
                             if(error){
                              err.innerHTML=error;
                              cont.style.visibility="hidden";
                              con.style.visibility="hidden";
                             }
                            else if(amount){
                              cont.style.visibility="visible";
                              con.style.visibility="visible";
                              member.innerHTML=count;
                              revenue.innerHTML="₹"+amount;
                              name.innerHTML="Hello"+"&nbsp"+rsu?.name;
                              m.value=""
                              err.innerHTML="";
                             }
                             else{
                              cont.style.visibility="visible";
                              con.style.visibility="visible";
                             cont.style.width='400px';
                             revenue.style.marginLeft='10px';
                             t.style.marginLeft='30px';
                             t.innerHTML="Discount Codes"
                             revenue.innerHTML=dis;
                              member.innerHTML=count;
                              name.innerHTML="Hello"+"&nbsp"+rsu?.name;
                              m.value=""
                              err.innerHTML="";
                             }
                              
                          })
                        </script>
                        `