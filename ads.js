(function(){
 let ads=[];
 const sw=document.getElementById("sw");
 const box=document.createElement("div");
 box.id="adsBox";
 box.style.cssText="padding:0 16px 10px";
 sw.parentNode.insertBefore(box,sw.nextSibling);
 function draw(){
  if(!ads.length){box.innerHTML="";return}
  box.innerHTML=`<div style="display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:6px">${ads.map(a=>`<a href="${a.link||"#"}" ${a.link?'target="_blank"':''} style="flex:0 0 88%;scroll-snap-align:start;text-decoration:none;color:inherit;background:var(--card);border:1px solid var(--bd);border-radius:14px;overflow:hidden;display:block">${a.img?`<img src="${a.img}" alt="" style="width:100%;height:170px;object-fit:cover;display:block">`:`<div style="height:170px;background:var(--pr2)"></div>`}<div style="padding:10px 12px"><b style="font-size:16px">${esc(a.title||"")}</b>${a.text?`<div class="mu" style="margin-top:4px">${esc(a.text)}</div>`:""}</div></a>`).join("")}</div>`;
 }
 db.doc("settings/main").onSnapshot(s=>{ads=(s.data()||{}).ads||[];draw()});
})();
