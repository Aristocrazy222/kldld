// Меню:открытие и закрытиеconst menuBtn = document.getElementById('menu-btn');const mobileMenu = document.getElementById('mobile-menu');menuBtn?.addEventListener('click',() =>{mobileMenu.classList.toggle('hidden')}
);// График роста брендаif (document.getElementById('growthChart')){new Chart(document.getElementById('growthChart'),{type:'line',data:{labels:['2018','2019','2020','2021','2022','2023','2024','2025'],datasets:[{label:'Рост бренда',data:[0,50,150,300,500,750,1000,1250],borderColor:'rgba(59,130,246,1)',backgroundColor:'rgba(59,130,246,0.2)',fill:true,tension:0.4 }
] }
,options:{responsive:true,maintainAspectRatio:false,plugins:{tooltip:{backgroundColor:'rgba(0,0,0,0.7)',titleColor:'#fff',bodyColor:'#fff' }
 }
,scales:{y:{beginAtZero:true }
 }
 }
 }
)}
// Принципы брендаif (document.getElementById('principlesChart')){new Chart(document.getElementById('principlesChart'),{type:'pie',data:{labels:['Качество','Доступность','Стиль','Удобство'],datasets:[{data:[30,20,25,25],backgroundColor:['#3B82F6','#34D399','#FBBF24','#F87171'] }
] }
,options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{color:'#374151' }
 }
,tooltip:{backgroundColor:'rgba(0,0,0,0.7)',titleColor:'#fff',bodyColor:'#fff' }
 }
 }
 }
)}
// ================== Аккаунт ===================if (document.getElementById('account-menu')){const notyf = new Notyf();const el = id => document.getElementById(id);el('tab-register-btn').onclick = showRegister;el('tab-login-btn').onclick = showLogin;el('profile-link').onclick = showProfile;el('orders-link').onclick = showOrders;el('logout-btn').onclick = () =>{localStorage.setItem('loggedIn','false');notyf.info('Вы вышли из аккаунта');showLogin()}
;el('registration-form').onsubmit = e =>{e.preventDefault();const pw = el('password').value;if (pw.length < 8) return notyf.error('Пароль должен быть не менее 8 символов');localStorage.setItem('userFirstName',el('first-name').value);localStorage.setItem('userLastName',el('last-name').value);localStorage.setItem('userEmail',el('email').value);localStorage.setItem('userPassword',pw);localStorage.setItem('loggedIn','true');notyf.success('Регистрация успешна');showAccount()}
;el('login-form').onsubmit = e =>{e.preventDefault();if (el('login-email').value === localStorage.getItem('userEmail') && el('login-password').value === localStorage.getItem('userPassword')){localStorage.setItem('loggedIn','true');notyf.success('Вход выполнен');showAccount()}
 else notyf.error('Неверный email или пароль')}
;function showRegister(){el('registration-form').classList.remove('hidden');el('login-form').classList.add('hidden');el('tabs').classList.remove('hidden');el('account-menu').classList.add('hidden');el('tab-register-btn').classList.add('border-b-2','border-blue-600');el('tab-login-btn').classList.remove('border-b-2','border-blue-600')}
 function showLogin(){el('login-form').classList.remove('hidden');el('registration-form').classList.add('hidden');el('tabs').classList.remove('hidden');el('account-menu').classList.add('hidden');el('tab-login-btn').classList.add('border-b-2','border-blue-600');el('tab-register-btn').classList.remove('border-b-2','border-blue-600')}
 function showAccount(){el('tabs').classList.add('hidden');el('registration-form').classList.add('hidden');el('login-form').classList.add('hidden');el('account-menu').classList.remove('hidden');updateProfile();showProfile()}
 function updateProfile(){el('user-name').textContent = `${localStorage.getItem('userFirstName')}
 ${localStorage.getItem('userLastName')}
`;el('profile-first-name').value = localStorage.getItem('userFirstName') || '';el('profile-last-name').value = localStorage.getItem('userLastName') || '';el('profile-email').value = localStorage.getItem('userEmail') || ''}
 function showProfile(){el('profile-section').classList.remove('hidden');el('orders-section').classList.add('hidden')}
 function showOrders(){el('profile-section').classList.add('hidden');el('orders-section').classList.remove('hidden');const orders = JSON.parse(localStorage.getItem('orders') || '[]');const list = el('orders-list');list.innerHTML = '';if (!orders.length){el('orders-empty').classList.remove('hidden')}
 else{el('orders-empty').classList.add('hidden');orders.forEach(o =>{const li = document.createElement('li');li.className = 'p-4 border rounded-lg';li.textContent = `Заказ #${o.id}
 — ${o.date}
 — ${o.total}
`;list.appendChild(li)}
)}
 }
 if (localStorage.getItem('loggedIn') === 'true') showAccount();else showRegister()}
// ================== Корзина ===================if (document.getElementById('cart-items')){const notyf = new Notyf();let cart = JSON.parse(localStorage.getItem('cart')) || [];cart = cart.map(i => ({...i,qty:Number(i.qty) || 1,price:Number(i.price) || 0 }
));const fmt = n => n.toLocaleString('ru-RU') + ' ₸';const el = id => document.getElementById(id);const container = el('cart-items');const emptyMsg = el('empty-msg');const summary = el('summary');const totalEl = el('total-price');function renderCart(){container.innerHTML = '';if (!cart.length){emptyMsg.classList.remove('hidden');summary.classList.add('hidden');return}
 emptyMsg.classList.add('hidden');summary.classList.remove('hidden');let total = 0;cart.forEach(item =>{const line = item.price * item.qty;total += line;const row = document.createElement('div');row.className = 'flex justify-between items-center';row.innerHTML = ` <div class="flex items-center space-x-4 w-2/3"> <img src="${item.image}
" alt="${item.name}
" class="w-20 h-20 object-contain rounded-lg" /> <div class="flex-1"> <p class="font-medium text-gray-800">${item.name}
</p> <p class="text-sm text-gray-600">${fmt(item.price)}
 × ${item.qty}
</p> </div> </div> <p class="font-semibold text-gray-800">${fmt(line)}
</p>`;container.appendChild(row)}
);totalEl.textContent = fmt(total);localStorage.setItem('cart',JSON.stringify(cart))}
 renderCart();el('checkout-btn')?.addEventListener('click',() =>{el('cart-view').classList.add('hidden');el('payment-form').classList.remove('hidden')}
);el('pay-form')?.addEventListener('submit',e =>{e.preventDefault();notyf.success('Оплата проведена!');renderOrder();el('payment-form').classList.add('hidden');el('address-form').classList.remove('hidden')}
);function renderOrder(){const orders = JSON.parse(localStorage.getItem('orders') || '[]');orders.push({id:Date.now(),date:new Date().toLocaleDateString(),total:el('total-price').textContent,status:'Оплачен' }
);localStorage.setItem('orders',JSON.stringify(orders));cart = [];localStorage.removeItem('cart')}
 el('addr-form')?.addEventListener('submit',e =>{e.preventDefault();notyf.success('Заказ завершён!');setTimeout(() => location.href = 'account.html',500)}
)}
// ================== Контакты ===================if (document.getElementById('contact-form')){const form = document.getElementById('contact-form');const modal = document.getElementById('modal');form.addEventListener('submit',e =>{e.preventDefault();form.reset();modal.classList.remove('hidden')}
);window.closeModal = function (){modal.classList.add('hidden')}
}
// ================== Каталог ===================if (typeof products !== 'undefined'){function addToCart(name,price,image){const cart = JSON.parse(localStorage.getItem('cart')) || [];cart.push({name,price,image }
);localStorage.setItem('cart',JSON.stringify(cart));const toast = document.getElementById('toast');toast.textContent = `«${name}
» добавлен в корзину`;toast.classList.add('opacity-100');setTimeout(() => toast.classList.remove('opacity-100'),3000)}
 window.addToCart = addToCart}
