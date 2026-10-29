let user=null,products=[],cfg={fee:0,feeOn:false},cart={},view="shop",done=null,mode="delivery",cat="الكل",sq="",orders=[],unsubO=null,am="login",as=1,aph="",an="",ret="shop",caddr="",cnote="";
const quiet=()=>(view==="cart"&&!done)||view==="auth"||view==="account";
const msg=e=>({"auth/invalid-verification-code":"الكود غلط","auth/code-expired":"الكود انتهى، ابعت كود جديد","auth/too-many-requests":"محاولات كتير، حاول بعد شوية","auth/invalid-phone-number":"رقم الموبايل غلط","auth/invalid-credential":"الرقم أو كلمة السر غلط","auth/wrong-password":"الرقم أو كلمة السر غلط","auth/user-not-found":"الرقم أو كلمة السر غلط","auth/network-request-failed":"مفيش إنترنت"}[e&&e.code]||"حصلت مشكلة، حاول تاني");
B.onProducts(l=>{products=l;if(!quiet())render()});
B.onSettings(d=>{cfg={...cfg,...d};if(d.logo)$("logo").src=d.logo;if(!quiet())render()});
B.onAuth(u=>{user=u;if(unsubO){unsubO();unsubO=null}orders=[];
 if(u){caddr=caddr||u.address||"";unsubO=B.onMyOrders(u.uid,l=>{orders=l.sort((a,b)=>b.at-a.at);if(!quiet())render()});if(view==="auth"){am="login";as=1;view=ret;done=null}}
 else if(view==="mine"||view==="account")view="shop";
 render()});
function show(v){view=v;done=null;render();scrollTo(0,0)}
function norm(s){return String(s||"").toLowerCase().replace(/[\u064B-\u0652]/g,"").replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").trim()}
function total(){return Object.entries(cart).reduce((t,[id,n])=>{const p=products.find(x=>x.id===id);return t+(p?p.price*n:0)},0)}
function fee(){return mode==="delivery"&&cfg.feeOn?Number(cfg.fee)||0:0}
function count(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function add(id,d){const p=products.find(x=>x.id===id);if(!p)return;const n=Math.max(0,Math.min(p.qty,(cart[id]||0)+d));if(n)cart[id]=n;else delete cart[id];render()}
function render(){$("cc").textContent=fmt(count());
 $("tabs").innerHTML=[["shop","المنتجات"],["offers","🔥 العروض"],...(user?[["mine","طلباتي"]]:[])].map(([k,l])=>`<button class="${view===k?"on":""}" onclick="show('${k}')">${l}</button>`).join("");
 $("sw").style.display=view==="shop"?"block":"none";
 $("bar").style.display=((view==="shop"||view==="offers")&&count())?"block":"none";$("bt").textContent=fmt(total());
 $("app").innerHTML=({shop,offers:offersV,cart:cartV,mine:mineV,auth:authV,account:accV}[view])()}
const isOffer=p=>p.oldPrice>p.price;
function card(p){const n=cart[p.id]||0,out=p.qty<=0,of=isOffer(p);return`<div class="p" style="position:relative">${of?`<span class="tag" style="position:absolute;top:8px;inset-inline-start:8px;background:var(--rd);color:#fff">خصم ${Math.round((1-p.price/p.oldPrice)*100)}%</span>`:""}${p.img?`<img src="${p.img}" alt="">`:'<div class="ph">🛒</div>'}<div class="b"><h3>${esc(p.name)}</h3><div class="pr">${fmt(p.price)} ج ${of?`<s class="mu">${fmt(p.oldPrice)}</s>`:""}</div><div class="mu">${out?"غير متاح":"المتاح: "+fmt(p.qty)}</div>${out?"":n?`<div class="q"><button onclick="add('${p.id}',1)">+</button><b>${fmt(n)}</b><button class="sec" onclick="add('${p.id}',-1)">−</button></div>`:`<button onclick="add('${p.id}',1)">أضف للسلة</button>`}</div></div>`}
function shop(){if(!products.length)return'<div class="msg">لسه مفيش منتجات. ارجع بعد شوية 🌿</div>';
 const cs=["الكل",...CATS.filter(c=>products.some(p=>p.cat===c))];if(!cs.includes(cat))cat="الكل";const nq=norm(sq),l=nq?products.filter(p=>norm(p.name).includes(nq)):cat==="الكل"?products:products.filter(p=>p.cat===cat);
 return'<div style="display:flex;gap:8px;overflow-x:auto;padding:4px 16px 10px">'+cs.map(c=>`<button class="${cat===c?"":"sec"}" style="white-space:nowrap" onclick="cat='${c}';render()">${c}</button>`).join("")+'</div>'+(l.length?"":'<div class="msg">مفيش منتج بالاسم ده 🔍</div>')+'<div class="grid">'+l.map(card).join("")+'</div>'}
function offersV(){const l=products.filter(isOffer);return(cfg.offersNote?`<div class="box" style="background:var(--pr2)"><b>${esc(cfg.offersNote)}</b></div>`:"")+(l.length?'<div class="grid">'+l.map(card).join("")+'</div>':'<div class="msg">مفيش عروض دلوقتي، تابعنا قريب 🔥</div>')}
function cartV(){
 if(done)return`<div class="box" style="text-align:center"><div style="font-size:48px">✅</div><h2>تم استلام طلبك</h2><div class="mu">رقم الطلب: ${esc(done)}<br>تقدر تتابع حالته من تاب «طلباتي».</div><button onclick="show('mine')">متابعة الطلب</button></div>`;
 const items=Object.entries(cart).map(([id,n])=>({p:products.find(x=>x.id===id),n})).filter(x=>x.p);
 if(!items.length)return'<div class="msg">السلة فاضية</div><div class="box"><button onclick="show(\'shop\')">تصفح المنتجات</button></div>';
 const sum=`<div class="box">${items.map(({p,n})=>`<div class="row"><div><b>${esc(p.name)}</b><div class="mu">${fmt(p.price)} ج × ${fmt(n)}</div></div><div class="q"><button onclick="add('${p.id}',1)">+</button><b>${fmt(n)}</b><button class="sec" onclick="add('${p.id}',-1)">−</button></div></div>`).join("")}${fee()?`<div class="row"><span>رسوم التوصيل</span><span>${fmt(fee())} ج</span></div>`:""}<div class="row"><b>الإجمالي</b><b class="pr">${fmt(total()+fee())} ج</b></div></div>`;
 if(!user)return sum+`<div class="box"><b>سجّل دخولك عشان تأكد الطلب</b><div class="mu">بياناتك بتتحفظ وتتابع طلباتك بسهولة.</div><button onclick="ret='cart';am='login';as=1;show('auth')">تسجيل الدخول / حساب جديد</button></div><div class="box" style="background:none;border:0"><button class="sec" onclick="show('shop')">إضافة منتجات تانية</button></div>`;
 return sum+`<div class="box"><div class="mu">الطلب باسم ${esc(user.name)} · ${esc(user.phone)}</div>
 <div class="opt"><label class="${mode==="delivery"?"on":""}" onclick="mode='delivery';render()">🛵 توصيل</label><label class="${mode==="pickup"?"on":""}" onclick="mode='pickup';render()">🏪 استلام من الفرع</label></div>
 ${mode==="delivery"?`<textarea rows="2" placeholder="العنوان بالتفصيل (الشارع، العمارة، الدور)" oninput="caddr=this.value">${esc(caddr)}</textarea>`:'<div class="mu">هتستلم طلبك من فرع سوبر ماركت موسى.</div>'}
 <textarea rows="2" placeholder="ملاحظات (اختياري)" oninput="cnote=this.value">${esc(cnote)}</textarea><button id="go" onclick="send()">تأكيد الطلب</button></div>
 <div class="box" style="background:none;border:0"><button class="sec" onclick="show('shop')">إضافة منتجات تانية</button></div>`}
async function send(){
 if(mode==="delivery"&&!caddr.trim())return alert("اكتب عنوان التوصيل");
 const items=Object.entries(cart).map(([id,n])=>{const p=products.find(x=>x.id===id);return p&&{id,name:p.name,price:p.price,n}}).filter(Boolean);
 $("go").disabled=true;
 try{const id=await B.order({name:user.name,phone:user.phone,mode,address:mode==="delivery"?caddr.trim():"",note:cnote.trim(),items,fee:fee(),total:total()+fee(),status:"new",at:Date.now()});
  if(mode==="delivery")B.saveProfile({address:caddr.trim()}).catch(()=>{});
  done=String(id).slice(0,5).toUpperCase();cart={};cnote="";render()}
 catch(e){$("go").disabled=false;alert("حصلت مشكلة، حاول تاني")}}
function oc(o){const st=o.mode==="delivery"?["new","prep","out","done"]:["new","prep","ready","done"],i=st.indexOf(o.status);
 return`<div class="box"><div class="row"><b>طلب ${fmt(o.total)} ج</b><span class="tag">${ST[o.status]}</span></div><div class="mu">${new Date(o.at).toLocaleString("ar-EG")} · ${o.mode==="delivery"?"توصيل":"استلام من الفرع"}</div>${st.map((s,k)=>`<div style="opacity:${k<=i?1:.4}">${k<=i?"✅":"⬜"} ${ST[s]}</div>`).join("")}<div class="mu">${(o.items||[]).map(x=>esc(x.name)+" × "+fmt(x.n)).join("، ")}</div>${B.demo&&o.status!=="done"?`<button class="sec" onclick="B.demoAdvance('${o.id}')">(تجربة) حرّك حالة الطلب</button>`:""}</div>`}
function mineV(){return orders.length?orders.map(oc).join(""):'<div class="msg">لسه معملتش طلبات</div>'}
function authV(){
 const back='<button class="sec" onclick="am=\'login\';as=1;render()">رجوع</button>';
 if(am==="login")return`<div class="box"><h3 style="margin:0">تسجيل الدخول</h3><input id="ph" type="tel" inputmode="tel" placeholder="رقم الموبايل (01xxxxxxxxx)" value="${esc(aph)}"><input id="pw" type="password" placeholder="كلمة السر"><button onclick="doLogin()">دخول</button><button class="sec" onclick="am='register';as=1;render()">إنشاء حساب جديد</button><button class="sec" onclick="am='reset';as=1;render()">نسيت كلمة السر</button></div>`;
 if(as===1)return`<div class="box"><h3 style="margin:0">${am==="register"?"حساب جديد":"استرجاع كلمة السر"}</h3>${am==="register"?`<input id="an" placeholder="الاسم" value="${esc(an)}">`:""}<input id="ph" type="tel" inputmode="tel" placeholder="رقم الموبايل (01xxxxxxxxx)" value="${esc(aph)}"><div class="mu">هنبعتلك كود تأكيد على الرقم ده برسالة SMS.</div><button id="sc" onclick="sendCode()">إرسال كود التأكيد</button>${back}</div>`;
 return`<div class="box"><h3 style="margin:0">اكتب الكود اللي وصلك</h3><div class="mu">الكود اتبعت على ${esc(aph)}</div><input id="cd" inputmode="numeric" placeholder="كود التأكيد"><input id="pw1" type="password" placeholder="${am==="register"?"كلمة السر (6 على الأقل)":"كلمة السر الجديدة"}"><input id="pw2" type="password" placeholder="أعد كتابة كلمة السر"><button id="fb" onclick="finish()">${am==="register"?"إنشاء الحساب":"حفظ كلمة السر"}</button><button class="sec" onclick="as=1;render()">تغيير الرقم</button></div>`}
async function doLogin(){const p=$("ph").value.trim(),pw=$("pw").value;aph=p;if(!p||!pw)return alert("اكتب الرقم وكلمة السر");try{await B.loginPw(p,pw)}catch(e){alert(msg(e))}}
async function sendCode(){const p=$("ph").value.trim();if(p.replace(/\D/g,"").length<10)return alert("اكتب رقم موبايل صحيح");
 if(am==="register"){an=$("an").value.trim();if(!an)return alert("اكتب اسمك")}aph=p;$("sc").disabled=true;
 try{await B.startPhone(p);as=2;render()}catch(e){$("sc").disabled=false;alert(msg(e))}}
async function finish(){const code=$("cd").value.trim(),pw=$("pw1").value;
 if(!code)return alert("اكتب الكود");if(pw.length<6)return alert("كلمة السر لازم تكون 6 حروف أو أرقام على الأقل");if(pw!==$("pw2").value)return alert("كلمتين السر مش زي بعض");
 $("fb").disabled=true;
 try{const r=await B.verifyCode(code);
  if(am==="register"){if(r.hasPassword){await B.logout();am="login";as=1;render();return alert("الرقم ده مسجل بالفعل. سجّل دخول بكلمة السر.")}await B.setPassword(aph,pw,{name:an})}
  else{if(!r.hasPassword){await B.logout();am="register";as=1;render();return alert("مفيش حساب بالرقم ده. اعمل حساب جديد.")}await B.resetPassword(pw)}
 }catch(e){$("fb").disabled=false;alert(msg(e))}}
function accV(){return`<div class="box"><h3 style="margin:0">حسابي</h3><div class="mu">${esc(user.phone)}</div><input id="an2" placeholder="الاسم" value="${esc(user.name)}"><textarea id="ad2" rows="2" placeholder="عنوان التوصيل المحفوظ">${esc(user.address)}</textarea><button onclick="saveAcc()">حفظ</button><button class="dng" onclick="B.logout()">تسجيل خروج</button></div>`}
async function saveAcc(){try{await B.saveProfile({name:$("an2").value.trim(),address:$("ad2").value.trim()});caddr=$("ad2").value.trim();alert("تم الحفظ")}catch(e){alert("حصلت مشكلة")}}
render();
