// ======= Data =======
const items = [
  {id:1, title:"Dotted Sand", price:119000, type:"dotted", color:"cream", img:"https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1080&auto=format&fit=crop", desc:"Kertas 120 gsm dotted, cocok untuk bullet journaling."},
  {id:2, title:"Lined Ivory", price:99000, type:"lined", color:"white", img:"https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1080&auto=format&fit=crop", desc:"Garis tipis 7mm, cocok untuk catatan harian."},
  {id:3, title:"Grid Sage", price:129000, type:"grid", color:"cream", img:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1080&auto=format&fit=crop", desc:"Grid 5mm, rapi dan serbaguna."},
  {id:4, title:"Leather Terra", price:199000, type:"leather", color:"brown", img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1080&auto=format&fit=crop", desc:"Cover kulit sintetis, isi refillable."},
  {id:5, title:"Dotted Milk", price:109000, type:"dotted", color:"white", img:"https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1080&auto=format&fit=crop", desc:"Halus, tinta cepat kering."},
  {id:6, title:"Lined Classic", price:99000, type:"lined", color:"cream", img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop", desc:"Klasik dengan kertas tebal."},
  {id:7, title:"Grid Ivory", price:119000, type:"grid", color:"white", img:"https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1080&auto=format&fit=crop", desc:"Grid tipis untuk sketsa & catatan."},
  {id:8, title:"Leather Cocoa", price:209000, type:"leather", color:"brown", img:"https://images.unsplash.com/photo-1531064566582-83ebc02f3a79?q=80&w=1080&auto=format&fit=crop", desc:"Kulit cokelat gelap, premium look."}
];

// ======= Elements =======
const grid = document.querySelector('.catalog .grid');
const filterChips = document.querySelectorAll('.filters .chip');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cartCount = document.getElementById('cartCount');
const quickView = document.getElementById('quickView');
const qvImg = document.getElementById('qvImg');
const qvTitle = document.getElementById('qvTitle');
const qvDesc = document.getElementById('qvDesc');
const qvPrice = document.getElementById('qvPrice');
const qvAdd = document.getElementById('qvAdd');

let cart = 0;
let activeFilter = 'all';

// ======= Render Catalog =======
function renderCatalog(){
  grid.innerHTML = '';
  const term = (searchInput?.value || '').toLowerCase();

  items
    .filter(it => activeFilter === 'all' || it.type === activeFilter)
    .filter(it => it.title.toLowerCase().includes(term) || it.type.includes(term) || it.color.includes(term))
    .forEach(it => {
      const card = document.createElement('article');
      card.className = 'card reveal';
      card.dataset.type = it.type;
      card.innerHTML = `
        <button class="quick" aria-label="Quick view">👁</button>
        <img src="${it.img}" alt="${it.title}" />
        <div class="content">
          <div class="title">${it.title}</div>
          <div class="meta">${it.type.toUpperCase()} · ${it.color}</div>
          <div class="price">Rp ${it.price.toLocaleString('id-ID')}</div>
          <button class="btn add">Tambah</button>
        </div>`;

      card.querySelector('.btn.add').addEventListener('click', () => addToCart(it));
      card.querySelector('.quick').addEventListener('click', () => openQuickView(it));
      grid.appendChild(card);
    });

  revealOnScroll();
}

// ======= Filter chips =======
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderCatalog();
  });
});

// ======= Search handlers =======
searchBtn?.addEventListener('click', renderCatalog);
searchInput?.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') renderCatalog();
});

// ======= Cart =======
function addToCart(item){
  cart++;
  cartCount.textContent = cart;
  pulse(cartCount);
}

// ======= Quick View =======
function openQuickView(item){
  qvImg.src = item.img;
  qvTitle.textContent = item.title;
  qvDesc.textContent = item.desc;
  qvPrice.textContent = 'Rp ' + item.price.toLocaleString('id-ID');
  qvAdd.onclick = () => addToCart(item);
  if(typeof quickView.showModal === 'function'){
    quickView.showModal();
  } else {
    quickView.style.display = 'block';
  }
}

quickView?.querySelector('.close')?.addEventListener('click', ()=> {
  if(typeof quickView.close === 'function') quickView.close();
  else quickView.style.display = 'none';
});

// ======= Newsletter =======
document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email')?.value || '';
  if(!email.includes('@')) return alert('Masukkan email yang valid ya!');
  alert('Terima kasih! Konfirmasi dikirim ke ' + email);
  e.target.reset();
});

// ======= Micro interactions =======
function pulse(el){
  el.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.15)' },
    { transform: 'scale(1)' }
  ], { duration: 300, easing: 'ease-out' });
}

// ======= Reveal on scroll =======
function revealOnScroll(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(12px)';
    io.observe(el);
  });
}

// ======= Tilt effect for hero stack =======
(function tilt(){
  const stack = document.querySelector('.hero-showcase .stack');
  if(!stack) return;
  stack.addEventListener('mousemove', (e) => {
    const rect = stack.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stack.style.transform = `rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  });
  stack.addEventListener('mouseleave', () => stack.style.transform = 'rotateX(0) rotateY(0)');
})();

// ======= Init =======
renderCatalog();
revealOnScroll();
