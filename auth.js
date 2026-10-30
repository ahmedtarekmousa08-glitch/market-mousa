const AREAS=["الشهداء","ميت شهاله","عشما","كفر عشما","سلامون بحرى","سلامون قبلي","دنشواي","ابو كلس","دناصور","زاويه البقلي","ساحل الحوابر","شمياطس","سرسنا","كمشيش","عزبه علي بيه راضي","شبين الكوم"];
function authV(){
 if(am==="login")return`<div class="box"><h3 style="margin:0">تسجيل الدخول</h3>
 <input id="ph" type="tel" inputmode="tel" placeholder="رقم التليفون" value="${esc(aph)}">
 <input id="pw" type="password" placeholder="كلمة المرور">
 <button onclick="doLogin()">دخول</button>
 <button class="sec" onclick="am='register';render()">إنشاء حساب جديد</button>
 <div class="mu" style="text-align:center">لو نسيت كلمة المرور كلّم المحل</div></div>`;
 return`<div class="box"><h3 style="margin:0">تسجيل مستخدم جديد</h3>
 <div class="mu">المحافظة: المنوفية - المركز: الشهداء</div>
 <input id="an" placeholder="الاسم بالكامل *" value="${esc(an)}">
 <input id="ph" type="tel" inputmode="tel" placeholder="رقم التليفون * (مثال: 01011750300)" value="${esc(aph)}">
 <input id="pw" type="password" placeholder="كلمة المرور * (6 أحرف أو أرقام على الأقل)">
 <input id="pw2" type="password" placeholder="أعد كتابة كلمة المرور *">
 <select id="rz"><option value="">اختار المنطقة *</option>${AREAS.map(a=>`<option>${a}</option>`).join("")}</select>
 <div class="row"><input id="ad" placeholder="العنوان بالتفصيل (الشارع) *" style="flex:1"><button class="sec" type="button" onclick="getLoc()">📍</button></div>
 <input id="fl" placeholder="الدور (اختياري)">
 <input id="ap" placeholder="رقم الشقة *">
 <input id="mk" placeholder="علامة مميزة * (مثال: بجوار الصيدلية)">
 <button id="reg" onclick="doRegister()">التالي</button>
 <button class="sec" onclick="am='login';render()">عندي حساب، تسجيل الدخول</button></div>`;
}
function getLoc(){
 if(!navigator.geolocation)return alert("الموقع مش متاح على الجهاز ده، اكتب العنوان");
 navigator.geolocation.getCurrentPosition(p=>{
  const link=`https://maps.google.com/?q=${p.coords.latitude},${p.coords.longitude}`;
  const cur=$("ad").value.trim();
  $("ad").value=cur?cur+" - "+link:link;
 },()=>alert("ما قدرتش أحدد مكانك، اكتب العنوان"));
}
async function doRegister(){
 const nm=$("an").value.trim(),p=$("ph").value.trim(),pw=$("pw").value,pw2=$("pw2").value;
 const ad=$("ad").value.trim(),rz=$("rz").value,fl=$("fl").value.trim(),ap=$("ap").value.trim(),mk=$("mk").value.trim();
 if(nm.length<3)return alert("اكتب الاسم بالكامل (3 حروف على الأقل)");
 if(p.replace(/\D/g,"").length<10)return alert("اكتب رقم تليفون صحيح");
 if(pw.length<6)return alert("كلمة المرور لازم تكون 6 حروف أو أرقام على الأقل");
 if(pw!==pw2)return alert("كلمتين المرور مش زي بعض");
 if(!rz)return alert("اختار المنطقة");
 if(!ad)return alert("اكتب العنوان");
 if(!ap)return alert("اكتب رقم الشقة");
 if(!mk)return alert("اكتب علامة مميزة تساعد المندوب يوصّل");
 const addr=`المنوفية - الشهداء - ${rz} - ${ad} - الدور: ${fl||"-"} - الشقة: ${ap} - علامة: ${mk}`;
 $("reg").disabled=true;
 try{
  const c=await auth.createUserWithEmailAndPassword(fake(p),pw);
  await db.doc("users/"+c.user.uid).set({name:nm,phone:e164(p),address:addr,area:rz,floor:fl,apt:ap,mark:mk,street:ad});
  aph=p;an=nm;caddr=addr;
  await emit();
 }catch(e){$("reg").disabled=false;alert(msg(e))}
}
