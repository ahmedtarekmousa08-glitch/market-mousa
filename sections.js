(function(){
 const EM={"الخضروات والفاكهة":"🥬","قسم اجبان وزن":"🧀","قسم البان مصنعه":"🥛","قسم البقاله":"🛒","قسم اللحوم":"🥩","المجمدات":"🧊","المخبوزات":"🍞","المشروبات الباردة":"🥤","المشروبات الساخنة":"☕","المكونات للخبز والحلوى":"🧁","المنتجات الهيلثى والدايت":"🥗","حبوب وعطاره":"🫘","حفاضات وورقيات":"🧻","خردوات منزليه":"🧽","عنايه ملابس":"👕","العنايه الشخصية":"🧴","مستلزمات حيوانات":"🐾","أخرى":"📦"};
 const COL=["#1f8f4e","#c0392b","#2980b9","#8e44ad","#d35400","#16a085","#2c3e50","#b9770e"];
 const svg=(t,e,c)=>"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" rx="30" fill="${c}"/><text x="150" y="130" font-size="110" text-anchor="middle" dominant-baseline="middle">${e}</text><text x="150" y="250" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" font-family="sans-serif">${t.replace(/[<>&]/g,"")}</text></svg>`);
 const out={};
 SECTIONS.forEach((s,i)=>{const e=EM[s.name]||"🛒",c=COL[i%COL.length];out[s.name]=svg(s.name,e,c);s.subs.forEach(sub=>{out[sub]=svg(sub,e,c)})});
 window.DEF_SEC_IMGS=out;
})();

let secSel="";
function pickSec(n){secSel=n;cat="";sq="";const i=$("q");if(i)i.value="";render();scrollTo(0,0)}
function pickSub(n){cat=n;render();scrollTo(0,0)}
function backSec(){if(cat)cat="";else secSel="";render();scrollTo(0,0)}
function tile(name,img,fn,count){return `<div class="p" style="cursor:pointer" onclick='${fn}'><div class="ph">${img?`<img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover">`:"🛒"}</div><div class="b"><h3>${esc(name)}</h3>${count===undefined?"":`<div class="mu">${count} منتج</div>`}</div></div>`}
function shop(){
 if(!products.length)return'<div class="msg">لسه مفيش منتجات. ارجع بعد شوية 🌿</div>';
 const nq=norm(sq);
 if(nq)return'<div class="grid">'+products.filter(p=>norm(p.name).includes(nq)).map(card).join("")+'</div>';
 const imgs=Object.assign({},window.DEF_SEC_IMGS||{},cfg.secImgs||{});
 if(!secSel)return'<div class="grid">'+SECTIONS.map(s=>tile(s.name,imgs[s.name],`pickSec("${s.name}")`)).join("")+'</div>';
 const s=SECTIONS.find(x=>x.name===secSel);
 const head=`<div style="padding:0 16px 10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="sec" onclick="backSec()">⬅ رجوع</button><b>${esc(secSel)}${cat?" › "+esc(cat):""}</b></div>`;
 if(!cat)return head+'<div class="grid">'+s.subs.map(sub=>tile(sub,imgs[sub],`pickSub("${sub}")`,products.filter(p=>p.cat===sub).length)).join("")+'</div>';
 const l=products.filter(p=>p.cat===cat);
 return head+(l.length?'<div class="grid">'+l.map(card).join("")+'</div>':'<div class="msg">مفيش منتجات في القسم ده حالياً</div>');
}
