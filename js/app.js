// 🔐 AUTH0 CONFIG
let auth0Client = null;

const authConfig = {
  domain: "TU_DOMINIO.auth0.com",
  client_id: "TU_CLIENT_ID"
};

async function initAuth(){

    auth0Client = await createAuth0Client({
      domain: authConfig.domain,
      client_id: authConfig.client_id,
      cacheLocation: "localstorage",
      useRefreshTokens: true
    });
  
    if(window.location.search.includes("code=")){
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }
  
    const isAuthenticated = await auth0Client.isAuthenticated();
  
    if(isAuthenticated){
      const user = await auth0Client.getUser();
  
      document.getElementById("userWelcome").innerText = "Hola " + user.name;
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "inline-block";
    }
}

// ================= DOM =================
const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
const carritoBox = document.querySelector(".carrito");
const pagoSection = document.querySelector(".pago");

// ================= PRODUCTOS =================
const productos = [
  {
    id:1,
    nombre:"Camiseta Deportiva",
    precio:18990,
    descripcion:"Camiseta de alta calidad, ideal para tus entrenamientos diarios. Con tecnología de absorción de sudor y diseño ergonómico para máxima comodidad.", 
    imagen:"https://images.openai.com/static-rsc-4/BNtv1GukfqHqqVi6p9tS4IgaXW4kYXavRLpLJXWd8UNSC8MOKxTkGLqESVqlYqfTwyahIDpXK7LD2c6zVxafDeq05dz9OeIDJHP_WMijOIhyN-CBHeaSnSEkrqSbOTWgo_QPCTdzeoyaZMXD6G94bOQrtY-Zcqyw6heni59tU7htGOFZ4aB-XSzb0AQsSJnY?purpose=fullsize"
  },
  {
    id:2,
    nombre:"Pack gym",
    precio:12990,
    descripcion:"Pack completo para tu rutina de ejercicio. Incluye 5 artículos de alta calidad para maximizar tu rendimiento.",  
    imagen:"https://images.openai.com/static-rsc-4/NWzcZeUtmJcUY4kcg4lh0BDE4U-7wd5dcw2XVxJpECtK8h1LE7EKa7ioFSWWn8vTf_asFRFdaJZmHolut2mfUz6cyXcVNLD0gUjS8L-EwukocPfW1fO222cSLUlEPa1K9OEQk2dc_VNlrydnP4LAFxzfaEasMNq76pYaX89ZTT99hYu7zxIDTIWCa_8ehnyF?purpose=fullsize"
  },
  {
    id:3,
    nombre:"Zapatillas Running",
    precio:49990,
    descripcion:"Zapatillas de running de alta calidad, diseñadas para ofrecer comodidad y soporte durante tus entrenamientos.", 
    imagen:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id:4,
    nombre:"Mancuernas 10kg",
    precio:24990,
    descripcion:"Mancuernas de 10kg, perfectas para fortalecer tus músculos y mejorar tu rendimiento en el gimnasio.",
    imagen:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
  },
  {
    id:5,
    nombre:"Pack Crossfit",
    precio:89990,
    descripcion:"Pack completo para tu rutina de Crossfit. Incluye 5 artículos de alta calidad para maximizar tu rendimiento.",
    imagen:"https://images.openai.com/static-rsc-4/VSrSVbR39JgpY64rd55rGL231S7Ym4zWYVzfx2_pMpoxlNPRMbzo5qh6bgCF7-ijKT5uFbSL0ycO4NiFS0T3NI2xtxDd0HvRj9Zc8agFXmflJuRm94uTcfzmAVfPvj2TDqVB37H9PbCTy2Fao10iqtkmF-DduONuLJqYC3KKflq8tCI-AJkPADcj9d3m7UXh?purpose=fullsize"
  },
  {
    id:6,
    nombre:"Kettlebell 20kg",
    precio:19990,
    descripcion:"Kettlebell de 20kg, perfecta para ejercicios de fuerza y condicionamiento.",
    imagen:"https://images.openai.com/static-rsc-4/zHW3KVEg2vVZjWCjWJxfiM7O8V0q_o9vHBpKJab70i4DrKPpLQ6orrBBWT3nBRzrBVE-Fgza6vDZ3YgsQetdeSVlGXV4X1p6hIAcobs-a6uxtTxZtho8h5W-aEdP80Spu9kMX94hvNlknJQLo8qpksuG-e-SWCyisIcUU1YxXdIdtnJwjUDOkCSONgm4A-rw?purpose=fullsize"
  },
  {
    id:7,
    nombre:"Colchoneta Yoga",
    precio:14990,
    descripcion:"Colchoneta de yoga de alta calidad, ideal para tus sesiones de estiramiento y meditación.",
    imagen:"https://images.unsplash.com/photo-1552196563-55cd4e45efb3"
  },
  {
    id:8,
    nombre:"Barra de Pesas 40kg",
    precio:99990, 
    imagen:"https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
  },
  {
    id:9,
    nombre:"Ropa Deportiva",
    precio:7990,
    descripcion:"Ropa de deporte de alta calidad, ideal para tus entrenamientos diarios.",
    imagen:"https://images.openai.com/static-rsc-4/ZKnCQI0TPxZKDjfP0lHvVEp1pV_vvjPxhpc2TL6OorPcLVSnkvTJwh0iOBeKoAOkJ9pl8fpSYQFAyQIykYr_sYKY9TOi29hfz1UDQd03sf0DSEsPSfhd8Gr2NvYBDAXvSenzrMiFAe3re6yNId8LMJf1A7EqS5aNo03qBdjDmM6UJzr92s-euE-VAg2yrKqG?purpose=fullsize"
  },
  {
    id:10,
    nombre:"Poleron mujer",
    precio:7990,
    descripcion:"Poleron de alta calidad, ideal para tus entrenamientos diarios.",
    imagen:"https://media.istockphoto.com/id/1441759372/photo/motivated-female-athlete-jogging-in-the-park.jpg?s=1024x1024&w=is&k=20&c=4yIFP967pnzwY4nc_A8jj1neBcHb03p7ilfbt57cBFk="
  },
  {
    id:11,
    nombre:"Alfombra de Ejercicio",
    precio:17990,
    descripcion:"Alfombra de ejercicio de alta calidad, ideal para tus sesiones de entrenamiento.",
    imagen:"https://images.openai.com/static-rsc-4/fW_147e32jsxcyXavubm7-CMrsJsZklYC0ML8WQEHpMlVgdL8EtikvVmOpyiGiePs1nqA_DnE-IN_n-DQGFq9JNgoXzENax0u1gCg3VHD89Bx6WyAE813QQmGWugZIOHQOVdxv77ttN8KX5s1fyM8AjPXGieXA8kqxrQti0r18olacUXIwlrIlpOnBDZ5gxX?purpose=fullsize"
  },
  {
    id:12,
    nombre:"Mancuerna 15kg",
    precio:27990,
    descripcion:"Mancuerna de 15kg, perfecta para ejercicios de fuerza y condicionamiento.",
    imagen:"https://images.openai.com/static-rsc-4/eqWR9X-CA6Nm8P4dyi4xOdzOR3OJnWzgqt81pAy8sUbt_yDHQUUwYBE1MAjsoQ4FeHkA6MMwCmNneJbIhgI6QzERdyG_Q6_DdVaA89ybAdCHzvX33_x6I6QxPsHoWKCMNmA66cfBv6-KEcqV3gYiOpDg7lEpH2LRj3xo_iuSF90q8CBYe1zC4p6p8S25RAU3?purpose=fullsize"
  }
];

// ================= TOAST =================
function showToast(msg){
  toast.innerText = msg;
  toast.style.display="block";
  setTimeout(() => toast.style.display = "none", 2000);
}

// ================= PRODUCTOS =================
function renderProductos(){
  productList.innerHTML="";
  productos.forEach(p=>{
    productList.innerHTML+=`
    <div class="producto">
      <img src="${p.imagen}" onclick="abrirImagen(${p.id})">
      
      <h3>${p.nombre}</h3>
    
      <p class="desc">${p.descripcion}</p> 
    
      <p>$${p.precio}</p>
    
      <button onclick="addToCart(${p.id})">Agregar</button>
    </div>`;
  });
}

// ================= IMAGEN ZOOM =================
function abrirImagen(id){
  const producto = productos.find(p => p.id === id);

  const modal = document.getElementById("modalImagen");
  const img = document.getElementById("imgGrande");

  if(!producto || !modal || !img){
    console.error("Error en modal de imagen");
    return;
  }

  img.src = producto.imagen;
  modal.style.display = "flex";
}

function cerrarImagen(e){
  if(e.target.id === "modalImagen"){
    document.getElementById("modalImagen").style.display = "none";
  }
}

// ================= DETALLE COMPRA =================
function generarDetalleCompra(){

  const cart = getCart();
  const detalle = document.getElementById("detalleCompra");

  let html = "";
  let total = 0;

  cart.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    html += `
      <div style="margin-bottom:10px;">
        <strong>${p.nombre}</strong><br>
        Cantidad: ${p.cantidad}<br>
        Subtotal: $${subtotal.toLocaleString("es-CL")}
      </div>
    `;
  });

  html += `<hr><h3>Total: $${total.toLocaleString("es-CL")}</h3>`;

  detalle.innerHTML = html;
}

// ================= STORAGE =================
function getCart(){
  return JSON.parse(sessionStorage.getItem("cart"))||[];
}

function saveCart(cart){
  sessionStorage.setItem("cart",JSON.stringify(cart));
}

// ================= CARRITO =================
function addToCart(id){

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    showToast("Debes iniciar sesión 🔐");
    abrirLogin();
    return;
  }

  let cart=getCart();
  let item=cart.find(p=>p.id===id);

  if(item) item.cantidad++;
  else{
    let prod=productos.find(p=>p.id===id);
    cart.push({...prod,cantidad:1});
  }

  saveCart(cart);
  renderCart();
  showToast("Producto agregado 🛒");
}

function removeFromCart(id){
  let cart=getCart().filter(p=>p.id!==id);
  saveCart(cart);
  renderCart();
}

function clearCart(){
  sessionStorage.removeItem("cart");
  renderCart();
}

// ================= RENDER =================
function renderCart(){
  let cart=getCart();
  cartItems.innerHTML="";
  let total=0;
  let count=0;

  cart.forEach(p=>{
    total+=p.precio*p.cantidad;
    count+=p.cantidad;

    cartItems.innerHTML+=`
    <div>
      ${p.nombre} x${p.cantidad}
      <button onclick="removeFromCart(${p.id})">❌</button>
    </div>`;
  });

  totalEl.innerText="Total: $"+total.toLocaleString("es-CL");
  cartCount.innerText=count;
}

// ================= UI =================
function toggleCart(){
  carritoBox.classList.toggle("active");
}

// 🔥 COMPRA CORREGIDA
function irACompra(){

  const user = JSON.parse(localStorage.getItem("user"));
  const cart = getCart();

  if(!user){
    showToast("Debes iniciar sesión 🔐");
    abrirLogin();
    return;
  }

  if(cart.length === 0){
    showToast("Tu carrito está vacío 🛒");
    return;
  }

  const modal = document.getElementById("modalCompra");

  if(modal){
    modal.style.display = "flex";
  }
}

function cerrarModalCompra(){
  document.getElementById("modalCompra").style.display = "none";
}

// 🔐 BOTONES AUTH
document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if(loginBtn){
    loginBtn.addEventListener("click", async () => {
      await auth0Client.loginWithRedirect({
        redirect_uri: window.location.origin
      });
    });
  }

  if(logoutBtn){
    logoutBtn.addEventListener("click", () => {
      auth0Client.logout({
        returnTo: window.location.origin
      });
    });
  }

});

// ================= FORM =================
document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();

  let nombre = document.getElementById("name").value;
  let correo = document.getElementById("email").value;
  let telefono = document.getElementById("phone").value;

  if(nombre.length < 3) return showToast("Nombre inválido");
  if(!/\S+@\S+\.\S+/.test(correo)) return showToast("Correo inválido");
  if(!/^[0-9]{8,15}$/.test(telefono)) return showToast("Teléfono inválido");

  document.getElementById("modalCompra").style.display = "none";
  document.getElementById("modalPago").style.display = "flex";
});

// ================= PAGO =================
function finalizarCompra(){

  const card = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();
  const loading = document.getElementById("loadingPago");

  if(!/^\d{16}$/.test(card)) return showToast("Tarjeta inválida");
  if(!/^\d{2}\/\d{2}$/.test(expiry)) return showToast("Fecha inválida");
  if(!/^\d{3}$/.test(cvv)) return showToast("CVV inválido");

  loading.style.display = "block";

  setTimeout(()=>{

    loading.style.display = "none";

    // 🔥 generar detalle
    generarDetalleCompra();

    // cerrar modal de pago
    document.getElementById("modalPago").style.display = "none";

    // mostrar confirmación
    document.getElementById("modalConfirmacion").style.display = "flex";

    // limpiar carrito
    clearCart();

    carritoBox.classList.remove("active");

  },1500);
}

// ================= CERRAR CONFIRMACION =================
function cerrarConfirmacion(){
  document.getElementById("modalConfirmacion").style.display = "none";
}

// ================= LOGIN SIMPLE =================
function abrirLogin(){
  document.getElementById("loginModal").style.display = "flex";
}

function cerrarLogin(){
  document.getElementById("loginModal").style.display = "none";
}

function login(){
  const nombre = document.getElementById("loginNombre").value;
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;

  if(nombre.length < 2){
    showToast("Nombre inválido");
    return;
  }

  if(email.length < 5 || pass.length < 3){
    showToast("Datos inválidos");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ 
    nombre,
    email 
  }));

  cerrarLogin();
  actualizarUsuario();

  showToast("Bienvenido " + nombre + " 👋");
}

function logout(){
  localStorage.removeItem("user");
  actualizarUsuario();
}

function actualizarUsuario(){
  const user = JSON.parse(localStorage.getItem("user"));

  const welcome = document.getElementById("userWelcome");
  const logoutBtn = document.getElementById("logoutBtn");

  if(user){
    // 👇 CAMBIO CLAVE AQUÍ
    welcome.innerText = "Hola " + user.nombre;
    logoutBtn.style.display = "inline-block";
  } else {
    welcome.innerText = "";
    logoutBtn.style.display = "none";
  }
}

// ================= BANNER SLIDER =================
const bannerImages = [
  "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285", // pesas
  "https://images.unsplash.com/photo-1483721310020-03333e577078", // zapatillas
  "https://plus.unsplash.com/premium_photo-1664537982157-136e1b911a5a", // camiseta
  "https://plus.unsplash.com/premium_photo-1750439455715-6cca3099801f", // surf
];

let bannerIndex = 0;

function cambiarBanner(){
  const banner = document.getElementById("bannerImg");

  if(!banner) return;

  banner.src = bannerImages[bannerIndex];

  bannerIndex++;
  if(bannerIndex >= bannerImages.length){
    bannerIndex = 0;
  }
}

// cambiar cada 3 segundos
setInterval(cambiarBanner, 3000);

// iniciar
document.addEventListener("DOMContentLoaded", cambiarBanner);


// ================= INIT =================
document.addEventListener("DOMContentLoaded", async ()=>{
  renderProductos();
  renderCart();
  actualizarUsuario();
  await initAuth();
});