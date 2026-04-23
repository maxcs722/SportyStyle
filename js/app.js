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
      imagen:"https://images.openai.com/static-rsc-4/BNtv1GukfqHqqVi6p9tS4IgaXW4kYXavRLpLJXWd8UNSC8MOKxTkGLqESVqlYqfTwyahIDpXK7LD2c6zVxafDeq05dz9OeIDJHP_WMijOIhyN-CBHeaSnSEkrqSbOTWgo_QPCTdzeoyaZMXD6G94bOQrtY-Zcqyw6heni59tU7htGOFZ4aB-XSzb0AQsSJnY?purpose=fullsize"
    },
    {
      id:2,
      nombre:"Pack gym",
      precio:12990,
      imagen:"https://images.openai.com/static-rsc-4/NWzcZeUtmJcUY4kcg4lh0BDE4U-7wd5dcw2XVxJpECtK8h1LE7EKa7ioFSWWn8vTf_asFRFdaJZmHolut2mfUz6cyXcVNLD0gUjS8L-EwukocPfW1fO222cSLUlEPa1K9OEQk2dc_VNlrydnP4LAFxzfaEasMNq76pYaX89ZTT99hYu7zxIDTIWCa_8ehnyF?purpose=fullsize"
    },
    {
      id:3,
      nombre:"Zapatillas Running",
      precio:49990,
      imagen:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      id:4,
      nombre:"Mancuernas 10kg",
      precio:24990,
      imagen:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
    },
    {
      id:5,
      nombre:"Pack Crossfit",
      precio:89990,
      imagen:"https://images.openai.com/static-rsc-4/VSrSVbR39JgpY64rd55rGL231S7Ym4zWYVzfx2_pMpoxlNPRMbzo5qh6bgCF7-ijKT5uFbSL0ycO4NiFS0T3NI2xtxDd0HvRj9Zc8agFXmflJuRm94uTcfzmAVfPvj2TDqVB37H9PbCTy2Fao10iqtkmF-DduONuLJqYC3KKflq8tCI-AJkPADcj9d3m7UXh?purpose=fullsize"
    },
    {
      id:6,
      nombre:"Kettlebell 20kg",
      precio:19990,
      imagen:"https://images.openai.com/static-rsc-4/zHW3KVEg2vVZjWCjWJxfiM7O8V0q_o9vHBpKJab70i4DrKPpLQ6orrBBWT3nBRzrBVE-Fgza6vDZ3YgsQetdeSVlGXV4X1p6hIAcobs-a6uxtTxZtho8h5W-aEdP80Spu9kMX94hvNlknJQLo8qpksuG-e-SWCyisIcUU1YxXdIdtnJwjUDOkCSONgm4A-rw?purpose=fullsize"
    },
    {
      id:7,
      nombre:"Colchoneta Yoga",
      precio:14990,
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
      imagen:"https://images.openai.com/static-rsc-4/ZKnCQI0TPxZKDjfP0lHvVEp1pV_vvjPxhpc2TL6OorPcLVSnkvTJwh0iOBeKoAOkJ9pl8fpSYQFAyQIykYr_sYKY9TOi29hfz1UDQd03sf0DSEsPSfhd8Gr2NvYBDAXvSenzrMiFAe3re6yNId8LMJf1A7EqS5aNo03qBdjDmM6UJzr92s-euE-VAg2yrKqG?purpose=fullsize"
    },
    {
      id:10,
      nombre:"Poleron mujer",
      precio:7990,
      imagen:"https://media.istockphoto.com/id/1441759372/photo/motivated-female-athlete-jogging-in-the-park.jpg?s=1024x1024&w=is&k=20&c=4yIFP967pnzwY4nc_A8jj1neBcHb03p7ilfbt57cBFk="
    },
    {
      id:11,
      nombre:"Alfombra de Ejercicio",
      precio:17990,
      imagen:"https://images.openai.com/static-rsc-4/fW_147e32jsxcyXavubm7-CMrsJsZklYC0ML8WQEHpMlVgdL8EtikvVmOpyiGiePs1nqA_DnE-IN_n-DQGFq9JNgoXzENax0u1gCg3VHD89Bx6WyAE813QQmGWugZIOHQOVdxv77ttN8KX5s1fyM8AjPXGieXA8kqxrQti0r18olacUXIwlrIlpOnBDZ5gxX?purpose=fullsize"
    },
    {
      id:12,
      nombre:"Mancuerna 15kg",
      precio:27990,
      imagen:"https://images.openai.com/static-rsc-4/eqWR9X-CA6Nm8P4dyi4xOdzOR3OJnWzgqt81pAy8sUbt_yDHQUUwYBE1MAjsoQ4FeHkA6MMwCmNneJbIhgI6QzERdyG_Q6_DdVaA89ybAdCHzvX33_x6I6QxPsHoWKCMNmA66cfBv6-KEcqV3gYiOpDg7lEpH2LRj3xo_iuSF90q8CBYe1zC4p6p8S25RAU3?purpose=fullsize"
    }
  ];

// ================= TOAST =================
function showToast(msg){
  toast.innerText = msg;
  toast.style.display="block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000); // se oculta en 2 segundos
}

// ================= PRODUCTOS =================
function renderProductos(){
  productList.innerHTML="";
  productos.forEach(p=>{
    productList.innerHTML+=`
    <div class="producto">
      <img src="${p.imagen}" onclick="abrirImagen('${p.imagen}')">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="addToCart(${p.id})">Agregar</button>
    </div>`;
  });
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

function irACompra(){
  const cart=getCart();

  if(cart.length===0){
    alert("Tu carrito está vacío 🛒");
    return;
  }

  pagoSection.classList.add("active");

  pagoSection.scrollIntoView({
    behavior:"smooth"
  });
}

// 🔥 ================= COMPRA =================
function irACompra(){
  const cart = getCart();

  if(cart.length === 0){
    showToast("Tu carrito está vacío 🛒");
    return;
  }

  const modal = document.getElementById("modalCompra");

  if(modal){
    modal.style.display = "flex";
  } else {
    console.error("modalCompra no existe");
  }
}

function cerrarModalCompra(){
  document.getElementById("modalCompra").style.display = "none";
}

// ================= FORM =================
document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();
  
    let nombre = document.getElementById("name").value;
    let correo = document.getElementById("email").value;
    let telefono = document.getElementById("phone").value;
  
    if(nombre.length < 3){
      showToast("Nombre inválido");
      return;
    }
  
    if(!/\S+@\S+\.\S+/.test(correo)){
      showToast("Correo inválido");
      return;
    }
  
    if(!/^[0-9]{8,15}$/.test(telefono)){
      showToast("Teléfono inválido");
      return;
    }
  
    // 🔥 CERRAR MODAL COMPRA
    const modalCompra = document.getElementById("modalCompra");
    modalCompra.style.display = "none";
  
    // 🔥 ABRIR MODAL PAGO
    const modalPago = document.getElementById("modalPago");
    modalPago.style.display = "flex";
  });

  // ================= PAGO =================
  function finalizarCompra(){
  
    const card = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const loading = document.getElementById("loadingPago");
  
    // 🔴 VALIDACIONES
    if(!/^\d{16}$/.test(card)){
      showToast("Tarjeta inválida (16 dígitos)");
      return;
    }
  
    if(!/^\d{2}\/\d{2}$/.test(expiry)){
      showToast("Fecha inválida (MM/AA)");
      return;
    }
  
    if(!/^\d{3}$/.test(cvv)){
      showToast("CVV inválido (3 dígitos)");
      return;
    }
  
    // ✅ PROCESO DE PAGO
    loading.style.display = "block";
  
    setTimeout(()=>{
  
      loading.style.display = "none";
  
      showToast("Compra realizada 🎉");
  
      clearCart();
  
      // Ocultar modal
      document.getElementById("modalPago").style.display = "none";
  
      // Ocultar carrito 
      carritoBox.classList.remove("active");
  
      // (por si aún lo usas)
      if(typeof pagoSection !== "undefined"){
        pagoSection.classList.remove("active");
      }
  
    },1500);
  }

// ================= IMAGEN =================
function abrirImagen(src){
  document.getElementById("imgGrande").src = src;
  document.getElementById("imgModal").style.display = "flex";
}

function cerrarImagen(){
  document.getElementById("imgModal").style.display = "none";
}

// ================= CLICK FUERA =================
window.addEventListener("click", function(e){
  const modalCompra = document.getElementById("modalCompra");
  const modalPago = document.getElementById("modalPago");

  if(e.target === modalCompra){
    modalCompra.style.display = "none";
  }

  if(e.target === modalPago){
    modalPago.style.display = "none";
  }

  if(e.target.id === "imgModal"){
    cerrarImagen();
  }
});


// ================= IMAGEN MODAL =================
function abrirImagen(src){
  document.getElementById("imgGrande").src = src;
  document.getElementById("imgModal").style.display = "flex";
}

function cerrarImagen(){
  document.getElementById("imgModal").style.display = "none";
}

// cerrar al hacer click fuera
document.addEventListener("click", function(e){
  if(e.target.id === "imgModal"){
    cerrarImagen();
  }
});

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
document.addEventListener("DOMContentLoaded",()=>{
  renderProductos();
  renderCart();
});
