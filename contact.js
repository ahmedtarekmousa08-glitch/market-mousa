(function(){
 const C={wa:"01050090381",phone:"01050090381",fb:"https://www.facebook.com/share/1DXqFd8CB7/?mibextid=wwXIfr"};
 const intl=p=>{const d=String(p).replace(/\D/g,"");return d.startsWith("0")?"20"+d.slice(1):d};
 const sw=document.getElementById("sw");
 const bar=document.createElement("div");
 bar.id="contactBar";
 bar.style.cssText="display:flex;gap:8px;margin-bottom:10px";
 const btn="display:block;flex:1;padding:8px 4px;border-radius:10px;text-decoration:none;font-weight:700;color:#fff;font-size:14px;text-align:center";
 bar.innerHTML=`<a href="https://wa.me/${intl(C.wa)}" target="_blank" style="${btn};background:#25d366">واتساب 💬</a><a href="tel:+${intl(C.phone)}" style="${btn};background:#1f8f4e">اتصل بنا 📞</a><a href="${C.fb}" target="_blank" style="${btn};background:#1877f2">صفحتنا 👍</a>`;
 sw.insertBefore(bar,sw.firstChild);
})();
