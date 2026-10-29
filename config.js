// ===== املا البيانات دي من Firebase (الخطوات في الشرح) =====
const firebaseConfig={apiKey:"ضع_القيمة_هنا",authDomain:"ضع_القيمة_هنا",projectId:"ضع_القيمة_هنا",appId:"ضع_القيمة_هنا"};
const OWNER_EMAIL="ضع_ايميلك_هنا@gmail.com";
// =========================================================
firebase.initializeApp(firebaseConfig);const db=firebase.firestore();
