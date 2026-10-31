(function(){
 let ads=[];
 const sw=document.getElementById("sw");
 const box=document.createElement("div");
 box.id="adsBox";
 box.style.cssText="padding:0 16px 10px";
 sw.parentNode.insertBefore(box,sw.nextSibling);
 box.addEventListener("click",e=>{
  const el=e.target.closest(".adc");if(!el)return;
  const t=el.dataset.t||"";if(!t)return;
  show("shop");
  if(t.startsWith("sec:")){pickSec(t.slice(4))}
  else if(t.startsWith("sub:")){
   const sub=t.slice(4);const s=SECTIONS.find(x=>x.subs.includes(sub));
   if(s){pickSec(s.name);pickSub(sub)}
  }
 });
 function draw(){
  if(!ads.length){box.innerHTML="";return}
  box.innerHTML=`<div style="display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:6px">${ads.map(a=>`<div class="adc" data-t="${esc(a.target||"")}" style="flex:0 0 88%;scroll-snap-align:start;cursor:${a.target?"pointer":"default"};background:var(--card);border:1px solid var(--bd);border-radius:14px;overflow:hidden;display:block">${a.img?`<img src="${a.img}" alt="" style="width:100%;height:170px;object-fit:cover;display:block">`:`<div style="height:170px;background:var(--pr2)"></div>`}<div style="padding:10px 12px"><b style="font-size:16px">${esc(a.title||"")}</b>${a.text?`<div class="mu" style="margin-top:4px">${esc(a.text)}</div>`:""}</div></div>`).join("")}</div>`;
 }
 db.doc("settings/main").onSnapshot(s=>{ads=(s.data()||{}).ads||[];draw()});
})();
