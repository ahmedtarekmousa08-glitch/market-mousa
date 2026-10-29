// الاتصال بـ Firebase: حسابات العملاء + البيانات
const auth=firebase.auth();auth.languageCode="ar";
const hasPw=u=>!!u&&u.providerData.some(p=>p.providerId==="password");
const e164=p=>{const d=String(p).replace(/\D/g,"");return d.startsWith("0")?"+20"+d.slice(1):d.startsWith("20")?"+"+d:"+"+d};
const fake=p=>e164(p).slice(1)+"@moussa-market.app";
let cbA=null,conf=null,rv=null,ready=false;
async function emit(){const u=auth.currentUser;if(!cbA||!ready)return;if(!u||!hasPw(u)){cbA(null);return}
 let d={};try{d=(await db.doc("users/"+u.uid).get()).data()||{}}catch(e){}
 cbA({uid:u.uid,phone:u.phoneNumber||d.phone||"",name:d.name||"",address:d.address||""})}
auth.onAuthStateChanged(()=>{ready=true;emit()});
const B={
 onProducts(cb){db.collection("products").orderBy("name").onSnapshot(s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))))},
 onSettings(cb){db.doc("settings/main").onSnapshot(s=>cb(s.data()||{}))},
 onAuth(cb){cbA=cb;emit()},
 async startPhone(p){if(!rv)rv=new firebase.auth.RecaptchaVerifier("rc",{size:"invisible"});
  try{conf=await auth.signInWithPhoneNumber(e164(p),rv)}catch(e){try{rv.clear()}catch(_){}rv=null;throw e}},
 async verifyCode(c){const r=await conf.confirm(c);return{hasPassword:hasPw(r.user)}},
 async setPassword(p,pw,prof){const u=auth.currentUser;
  await u.linkWithCredential(firebase.auth.EmailAuthProvider.credential(fake(p),pw));
  await db.doc("users/"+u.uid).set({name:prof.name,phone:e164(p)});await emit()},
 async resetPassword(pw){await auth.currentUser.updatePassword(pw);await emit()},
 async loginPw(p,pw){await auth.signInWithEmailAndPassword(fake(p),pw)},
 logout(){return auth.signOut()},
 saveProfile(d){return db.doc("users/"+auth.currentUser.uid).set(d,{merge:true}).then(emit)},
 async order(o){const r=await db.collection("orders").add({...o,uid:auth.currentUser.uid});return r.id},
 onMyOrders(uid,cb){return db.collection("orders").where("uid","==",uid).onSnapshot(s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))))}
};
