// نسخة تجريبية: كل البيانات بتتحفظ على جهازك بس (مفيش إنترنت ولا Firebase). كود التأكيد: 123456
const K="mm_demo_v1";let S=JSON.parse(localStorage.getItem(K)||"null")||{users:{},sess:null,orders:[]};
const save=()=>localStorage.setItem(K,JSON.stringify(S));
const e164=p=>{const d=String(p).replace(/\D/g,"");return d.startsWith("0")?"+20"+d.slice(1):d.startsWith("20")?"+"+d:"+"+d};
const P=[["طماطم","خضار",18,0,50],["خيار","خضار",14,0,40],["موز","فاكهة",35,42,30],["تفاح أحمر","فاكهة",60,0,25],["لبن كامل الدسم 1 لتر","ألبان",45,52,40],["زبادي طبيعي","ألبان",12,0,60],["جبنة رومي","جبن",180,0,15],["جبنة بيضاء","جبن",70,85,30],["عيش بلدي","مخبوزات",5,0,100],["مياه معدنية","مشروبات",8,0,120],["أرز 1 كجم","بقالة",38,0,50],["زيت عباد الشمس","بقالة",95,110,35],["مكرونة","بقالة",12,15,80],["سائل أطباق","منظفات",40,0,20]].map((x,i)=>({id:"p"+i,name:x[0],cat:x[1],price:x[2],oldPrice:x[3],qty:x[4],img:""}));
let cbA=null,cbO=null,tmp="";
const cur=()=>{const u=S.sess&&S.users[S.sess];return u?{uid:S.sess,phone:S.sess,name:u.name,address:u.address||""}:null};
const emitA=()=>cbA&&cbA(cur()),emitO=()=>cbO&&cbO();
const err=c=>Promise.reject({code:c});
const B={demo:true,
 onProducts(cb){setTimeout(()=>cb(P),0)},
 onSettings(cb){setTimeout(()=>cb({fee:20,feeOn:true,offersNote:"🔥 عروض الأسبوع (نسخة تجريبية)"}),0)},
 onAuth(cb){cbA=cb;setTimeout(emitA,0)},
 async startPhone(p){if(String(p).replace(/\D/g,"").length<10)return err("auth/invalid-phone-number");tmp=e164(p);alert("نسخة تجريبية\nكود التأكيد هو: 123456")},
 async verifyCode(c){if(c!=="123456")return err("auth/invalid-verification-code");return{hasPassword:!!S.users[tmp]}},
 async setPassword(p,pw,prof){S.users[tmp]={pw,name:prof.name};S.sess=tmp;save();emitA()},
 async resetPassword(pw){S.users[tmp].pw=pw;S.sess=tmp;save();emitA()},
 async loginPw(p,pw){const k=e164(p),u=S.users[k];if(!u||u.pw!==pw)return err("auth/invalid-credential");S.sess=k;save();emitA()},
 async logout(){S.sess=null;save();emitA()},
 async saveProfile(d){Object.assign(S.users[S.sess],d);save();emitA()},
 async order(o){const id="D"+Date.now().toString(36);S.orders.push({...o,id,uid:S.sess});save();emitO();return id},
 onMyOrders(uid,cb){cbO=()=>cb(S.orders.filter(o=>o.uid===uid).map(o=>({...o})));cbO();return()=>{cbO=null}},
 demoAdvance(id){const o=S.orders.find(x=>x.id===id);if(!o)return;const m={new:"prep",prep:o.mode==="delivery"?"out":"ready",out:"done",ready:"done"};if(m[o.status]){o.status=m[o.status];save();emitO()}}
};
