const CATS=["خضار","فاكهة","ألبان","جبن","لحوم ودواجن","مخبوزات","مشروبات","بقالة","منظفات","أخرى"];
const ST={new:"طلب جديد",prep:"جاري التجهيز",out:"خرج للتوصيل",ready:"جاهز للاستلام",done:"تم التسليم"};
const $=id=>document.getElementById(id),fmt=n=>Number(n).toLocaleString("ar-EG"),
esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function resize(f,max){return new Promise(r=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=i.width*k;c.height=i.height*k;c.getContext("2d").drawImage(i,0,0,c.width,c.height);r(c.toDataURL("image/jpeg",.75))};i.src=URL.createObjectURL(f)})}
