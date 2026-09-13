const screen=document.getElementById('screen'),toast=document.getElementById('toast'),count=document.getElementById('count');
let cart=[],saved=new Set(),size='M',color='ice',current=1;
const P=[
{id:1,name:'Statue Print Ombre Hoodie',type:'Premium Hoodie',price:89,img:'assets/hoodie-main.jpg'},
{id:2,name:'Rainbow Streetwear Jacket',type:'Streetwear Jacket',price:120,img:'assets/model.jpg'},
{id:3,name:'Knit Hoodie',type:'Cozy Hoodie',price:65,img:'assets/hoodie-light.jpg'},
{id:4,name:'Year Pullover',type:'Everyday Hoodie',price:75,img:'assets/jacket.jpg'}];
const icons={heart:'♡',home:'⌂',search:'⌕',bag:'♧',user:'♙',settings:'⚙'};
function msg(t){toast.textContent=t;toast.classList.add('show');clearTimeout(msg.t);msg.t=setTimeout(()=>toast.classList.remove('show'),1600)}
function bag(){count.textContent=cart.length;count.classList.toggle('show',!!cart.length)}
function product(p){return `<article class="prod"><button class="heart" data-save="${p.id}" aria-label="Save">${saved.has(p.id)?'♥':'♡'}</button><button class="pic" data-product="${p.id}" aria-label="Open ${p.name}"><img src="${p.img}" alt="${p.name}"></button><h3>${p.name}</h3><p>${p.type}</p><div class="row"><span class="price">$${p.price}.00</span><button class="mini" data-buy="${p.id}">Buy Now</button></div></article>`}
function home(){
 screen.innerHTML=`<div class="top"><div class="brand">frost<em>wear</em></div><button class="circle" data-tab="profile">${icons.user}</button></div>
 <label class="search">${icons.search}<input id="q" placeholder="Search your hoodie..." autocomplete="off"></label>
 <div class="cats">${[['♧','All'],['♤','Hoodies'],['▣','T-Shirts'],['◫','Suits'],['•••','More']].map((x,i)=>`<button class="cat ${i?'':'active'}" data-cat="${x[1]}"><span>${x[0]}</span>${x[1]}</button>`).join('')}</div>
 <div class="head"><h2>Featured</h2><button data-action="all">View All →</button></div><div class="grid">${P.slice(0,2).map(product).join('')}</div>
 <div class="head"><h2>Popular</h2><button data-action="all">View All →</button></div><div class="grid">${P.slice(2).map(product).join('')}</div>`;
 document.getElementById('q').oninput=e=>filterHome(e.target.value);
}
function filterHome(q){q=q.toLowerCase().trim();if(!q){home();return}const a=P.filter(p=>(p.name+' '+p.type).toLowerCase().includes(q));const grids=screen.querySelectorAll('.grid');if(grids[0])grids[0].innerHTML=a.length?a.map(product).join(''):`<div class="empty" style="grid-column:1/-1"><div class="big">⌕</div><h2>No products found</h2><p>Try another hoodie or streetwear keyword.</p></div>`;grids[1]?.remove()}
function detail(p){
 current=p.id;screen.innerHTML=`<div class="detail-head"><button class="back" data-tab="home">‹</button><strong>Products</strong><button data-action="all">Change Product</button></div>
 <div class="viewer"><img id="viewerImg" src="${p.img}" alt="${p.name}"><div class="arrows"><button data-cycle="prev">‹</button><button data-cycle="next">›</button></div><span class="v360">360°</span></div>
 <div class="thumbs">${P.map((x,i)=>`<button class="thumb ${x.id===p.id?'active':''}" data-product="${x.id}"><img src="${x.img}" alt=""></button>`).join('')}</div>
 <div class="tabs"><button class="active">Planet</button><button>About</button><button>Reviews</button></div>
 <p class="desc">Cozy and homely with the next affordable price in the marketplace. Breathable, beautiful fabric for everyday wear. Perfect for your style.</p>
 <div class="opts"><div class="option-title"><span>Size</span><span>Size Chart</span></div><div class="sizes">${['S','M','L','XL','XXL'].map(s=>`<button class="size ${size===s?'selected':''}" data-size="${s}">${s}</button>`).join('')}</div><div class="option-title"><span>Colours</span><span>Selected</span></div><div class="colors">${['blue','slate','white','ice','tan'].map(c=>`<button class="color ${c} ${color===c?'sel':''}" data-color="${c}" aria-label="${c}"></button>`).join('')}</div></div>
 <div class="actions"><button class="secondary" data-add="${p.id}">Add to Cart</button><button class="primary" data-add="${p.id}">Buy Now</button></div>`;
}
function search(){screen.innerHTML=`<div class="top"><strong>Search</strong><button class="circle">${icons.search}</button></div><label class="search">${icons.search}<input id="sq" autofocus placeholder="Search products..." autocomplete="off"></label><div id="results" class="grid">${P.map(product).join('')}</div>`;document.getElementById('sq').oninput=e=>{const q=e.target.value.toLowerCase().trim(),a=P.filter(p=>(p.name+' '+p.type).toLowerCase().includes(q));document.getElementById('results').innerHTML=a.length?a.map(product).join(''):`<div class="empty" style="grid-column:1/-1"><div class="big">⌕</div><h2>No products found</h2><p>Try another search.</p></div>`}}
function savedView(){const a=P.filter(p=>saved.has(p.id));screen.innerHTML=`<div class="top"><strong>Saved Items</strong><span style="font-size:9px;color:var(--muted)">${a.length} saved</span></div>${a.length?`<div class="grid">${a.map(product).join('')}</div>`:`<div class="empty"><div class="big">♡</div><h2>Your wishlist is empty</h2><p>Tap the heart on any product to save it.</p></div>`}`}
function bagView(){if(!cart.length){screen.innerHTML='<div class="empty"><div class="big">♧</div><h2>Your bag is empty</h2><p>Add a product to continue shopping.</p><button class="primary" data-tab="home">Continue Shopping</button></div>';return}const total=cart.reduce((s,id)=>s+(P.find(p=>p.id===id)?.price||0),0);screen.innerHTML=`<div class="top"><strong>Your Bag</strong><span style="font-size:9px;color:var(--muted)">${cart.length} item(s)</span></div><div style="display:grid;gap:9px">${cart.map(id=>P.find(p=>p.id===id)).map(p=>`<div class="prod" style="display:flex;gap:9px;align-items:center"><div class="pic" style="width:80px;height:80px;flex:0 0 80px"><img src="${p.img}" alt=""></div><div style="min-width:0"><h3>${p.name}</h3><p>$${p.price}.00</p></div></div>`).join('')}</div><div class="prod" style="margin-top:14px"><div class="row"><span style="font-size:10px">Subtotal</span><strong>$${total}.00</strong></div><button class="primary" style="width:100%;margin-top:12px" data-checkout>Checkout</button></div>`}
function profile(){screen.innerHTML=`<div class="top"><strong>Profile</strong><button class="circle">${icons.settings}</button></div><div class="prod" style="text-align:center;padding:24px"><div style="width:76px;height:76px;margin:auto;border-radius:50%;background:#eaf3fb;display:grid;place-items:center;font-size:35px">${icons.user}</div><h2 style="font-size:16px;margin:10px 0 3px">Arnold Aldridge</h2><p style="font-size:9px;color:var(--muted)">Streetwear member · Level 4</p><div style="margin-top:18px;text-align:left"><div class="row" style="padding:12px 0;border-top:1px solid var(--line);font-size:10px">Orders <span>›</span></div><div class="row" style="padding:12px 0;border-top:1px solid var(--line);font-size:10px">Addresses <span>›</span></div><div class="row" style="padding:12px 0;border-top:1px solid var(--line);font-size:10px">Appearance <span>Light</span></div></div></div>`}
function render(tab){document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));({home,search,saved:savedView,bag:bagView,profile}[tab]||home)();bag();screen.scrollTop=0}
render('home');
document.addEventListener('click',e=>{
 let n=e.target.closest('[data-tab]');if(n){render(n.dataset.tab);return}
 let p=e.target.closest('[data-product]');if(p){detail(P.find(x=>x.id==p.dataset.product));return}
 let h=e.target.closest('[data-save]');if(h){const id=+h.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);h.textContent=saved.has(id)?'♥':'♡';msg(saved.has(id)?'Saved to wishlist':'Removed from wishlist');return}
 let b=e.target.closest('[data-buy],[data-add]');if(b){cart.push(+(b.dataset.buy||b.dataset.add));bag();msg(b.dataset.buy?'Added to bag':'Added to bag');return}
 let s=e.target.closest('[data-size]');if(s){size=s.dataset.size;detail(P.find(x=>x.id===current));return}
 let c=e.target.closest('[data-color]');if(c){color=c.dataset.color;detail(P.find(x=>x.id===current));return}
 let cy=e.target.closest('[data-cycle]');if(cy){const i=P.findIndex(x=>x.id===current),next=cy.dataset.cycle==='next'?(i+1)%P.length:(i-1+P.length)%P.length;detail(P[next]);return}
 if(e.target.closest('[data-checkout]')){msg('Checkout started');return}
 let a=e.target.closest('[data-action="all"]');if(a){search();return}
 let cat=e.target.closest('[data-cat]');if(cat){document.querySelectorAll('.cat').forEach(x=>x.classList.remove('active'));cat.classList.add('active');const val=cat.dataset.cat.toLowerCase();if(val==='all'){home();return}const a=P.filter(p=>(p.name+' '+p.type).toLowerCase().includes(val.replace('hoodies','hoodie').replace('t-shirts','t-shirt')));const area=screen.querySelectorAll('.grid');if(area[0])area[0].innerHTML=a.length?a.map(product).join(''):`<div class="empty" style="grid-column:1/-1"><div class="big">⌘</div><h2>No ${cat.dataset.cat} yet</h2><p>Try another category.</p></div>`;area[1]?.remove()}
});
