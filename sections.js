let secSel="";
function pickSec(n){secSel=n;cat="";sq="";const i=$("q");if(i)i.value="";render();scrollTo(0,0)}
function pickSub(n){cat=n;render();scrollTo(0,0)}
function backSec(){if(cat)cat="";else secSel="";render();scrollTo(0,0)}
function tile(name,img,fn,count){return `<div class="p" style="cursor:pointer" onclick='${fn}'><div class="ph">${img?`<img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover">`:"🛒"}</div><div class="b"><h3>${esc(name)}</h3>${count===undefined?"":`<div class="mu">${count} منتج</div>`}</div></div>`}
function shop(){
 if(!products.length)return'<div class="msg">لسه مفيش منتجات. ارجع بعد شوية 🌿</div>';
 const nq=norm(sq);
 if(nq)return'<div class="grid">'+products.filter(p=>norm(p.name).includes(nq)).map(card).join("")+'</div>';
 const imgs=cfg.secImgs||{};
 if(!secSel)return'<div class="grid">'+SECTIONS.map(s=>tile(s.name,imgs[s.name],`pickSec("${s.name}")`)).join("")+'</div>';
 const s=SECTIONS.find(x=>x.name===secSel);
 const head=`<div style="padding:0 16px 10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="sec" onclick="backSec()">⬅ رجوع</button><b>${esc(secSel)}${cat?" › "+esc(cat):""}</b></div>`;
 if(!cat)return head+'<div class="grid">'+s.subs.map(sub=>tile(sub,imgs[sub],`pickSub("${sub}")`,products.filter(p=>p.cat===sub).length)).join("")+'</div>';
 const l=products.filter(p=>p.cat===cat);
 return head+(l.length?'<div class="grid">'+l.map(card).join("")+'</div>':'<div class="msg">مفيش منتجات في القسم ده حالياً</div>');
}
