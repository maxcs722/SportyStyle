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
      imagen:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    },
    {
      id:2,
      nombre:"Pantalón Deportivo",
      precio:12990,
      imagen:"https://images.unsplash.com/photo-1520975916090-3105956dac38"
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
      nombre:"Barra de Pesas",
      precio:89990,
      imagen:"https://images.unsplash.com/photo-1571019613914-85f342c55f6c"
    },
    {
      id:6,
      nombre:"Kettlebell 8kg",
      precio:19990,
      imagen:"https://images.unsplash.com/photo-1594737625785-c43c9e3d5c63"
    },
    {
      id:7,
      nombre:"Colchoneta Yoga",
      precio:14990,
      imagen:"https://images.unsplash.com/photo-1552196563-55cd4e45efb3"
    },
    {
      id:8,
      nombre:"Guantes de Gimnasio",
      precio:9990,
      imagen:"https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
    },
    {
      id:9,
      nombre:"Cuerda para Saltar",
      precio:7990,
      imagen:"https://images.unsplash.com/photo-1599058917464-ef4d0a3c0f89"
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
    showToast("Compra realizada 🎉");

  clearCart();

  // Ocultar modal
  document.getElementById("modalPago").style.display = "none";

  // Ocultar carrito 
  carritoBox.classList.remove("active");

  // Ocultar formulario 
  pagoSection.classList.remove("active");
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
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff", // zapatillas
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", // camiseta
  "https://images.unsplash.com/photo-1571019613914-85f342c55f6c", // gym
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
