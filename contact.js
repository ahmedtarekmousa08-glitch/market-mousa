(function(){
 const C={wa:"01050090381",phone:"01050090381",fb:"https://www.facebook.com/share/1DXqFd8CB7/?mibextid=wwXIfr"};
 const intl=p=>{const d=String(p).replace(/\D/g,"");return d.startsWith("0")?"20"+d.slice(1):d};
 const box=document.createElement("div");
 box.id="contactBar";
 box.style.cssText="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;padding:16px;margin-top:12px;border-top:1px solid #e1e6df";
 const btn="display:inline-block;padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:700;color:#fff;min-width:110px;text-align:center";
 box.innerHTML=`<a href="https://wa.me/${intl(C.wa)}" target="_blank" style="${btn};background:#25d366">واتساب 💬</a><a href="tel:+${intl(C.phone)}" style="${btn};background:#1f8f4e">اتصل بنا 📞</a><a href="${C.fb}" target="_blank" style="${btn};background:#1877f2">صفحتنا 👍</a>`;
 document.getElementById("app").insertAdjacentElement("afterend",box);
})();
