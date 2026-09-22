// ================= 商品数据集合 (可直接在此处扩充商品) =================
const products = [
  {
    id: 1,
    title: "OmniLens 神经光导 AR 智能镜",
    category: "tech",
    categoryName: "智能数码",
    priceCny: 1899,
    sales: 3240,
    rating: 4.9,
    stock: 42,
    freeShipping: true,
    tag: "爆款首发",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop&q=80",
    specs: ["超感青瞳", "深空哑黑", "星芒纯银"],
    description: "次世代 8K 微光波导模组，支持实时多国语言神经元同传同显，仅重 38 克。"
  },
  {
    id: 2,
    title: "Aegis-X 纳米级三防全天候温控机能风衣",
    category: "wear",
    categoryName: "机能穿戴",
    priceCny: 649,
    sales: 1880,
    rating: 4.8,
    stock: 85,
    freeShipping: true,
    tag: "智能恒温",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    specs: ["曜石黑 (M)", "曜石黑 (L)", "极光银 (L)"],
    description: "石墨烯瞬时微热传导，气孔自主排湿，轻松抵御零下 15 度至酷热环境。"
  },
  {
    id: 3,
    title: "CyberPaws 桌面仿生机械宠物伴侣 (二代)",
    category: "companion",
    categoryName: "仿生伴侣",
    priceCny: 1299,
    sales: 960,
    rating: 5.0,
    stock: 18,
    freeShipping: true,
    tag: "独家好物",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
    specs: ["机械原色", "荧光蓝定制版"],
    description: "内置微型多模态情绪感知引擎，无需喂养，具备温润机械触感与生动反馈。"
  },
  {
    id: 4,
    title: "星穹萃取 深空零压冻干咖啡晶仓盒装",
    category: "food",
    categoryName: "深空美食",
    priceCny: 89,
    sales: 12400,
    rating: 4.9,
    stock: 350,
    freeShipping: false,
    tag: "人气回购",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80",
    specs: ["24颗标准舱", "48颗超能备灾舱"],
    description: "深空零下 55 度冻干萃取，3秒冷水速溶，保留 99.2% 原生坚果与柑橘香气。"
  },
  {
    id: 5,
    title: "Pulse-Ring 微型全天候量子生命体征指环",
    category: "tech",
    categoryName: "智能数码",
    priceCny: 429,
    sales: 4520,
    rating: 4.7,
    stock: 120,
    freeShipping: true,
    tag: "无感监测",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",
    specs: ["钛金属 10号", "钛金属 12号", "钛金属 14号"],
    description: "医研级心率、血氧与压力连续跟踪，一次充电待机运行 14 个自然日。"
  },
  {
    id: 6,
    title: "Terra 模块化耐磨防磁通勤背包",
    category: "wear",
    categoryName: "机能穿戴",
    priceCny: 319,
    sales: 2190,
    rating: 4.6,
    stock: 64,
    freeShipping: false,
    tag: "通勤甄选",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    specs: ["深空黑 20L", "星云灰 24L"],
    description: "防磁防割裂 CORDURA 面料，附带磁吸快拆拓展模块与独立防震电脑仓。"
  }
];

// ================= 应用状态 =================
let currentCategory = "all";
let searchKeyword = "";
let sortMode = "general"; // general, sales, priceAsc, priceDesc
let onlyFreeShipping = false;
let currentCurrency = "CNY"; // CNY, USD (汇率按 1 USD = 7.2 CNY)
const USD_RATE = 7.2;

let cart = [];

// ================= 渲染商品列表 =================
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");

  let list = products.filter(item => {
    const matchCat = currentCategory === "all" || item.category === currentCategory;
    const matchSearch = item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchShip = !onlyFreeShipping || item.freeShipping;
    return matchCat && matchSearch && matchShip;
  });

  // 排序
  if (sortMode === "sales") {
    list.sort((a, b) => b.sales - a.sales);
  } else if (sortMode === "priceAsc") {
    list.sort((a, b) => a.priceCny - b.priceCny);
  } else if (sortMode === "priceDesc") {
    list.sort((a, b) => b.priceCny - a.priceCny);
  }

  if (list.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    empty.classList.add("flex");
    return;
  }

  empty.classList.add("hidden");
  empty.classList.remove("flex");

  grid.innerHTML = list.map(item => {
    const displayPrice = currentCurrency === "CNY" 
      ? `¥ ${item.priceCny}` 
      : `$ ${(item.priceCny / USD_RATE).toFixed(1)}`;

    return `
      <div class="group bg-cyber-card border border-cyber-border hover:border-cyber-cyan/60 rounded-2xl overflow-hidden transition duration-300 flex flex-col hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10">
        <div class="relative w-full h-48 overflow-hidden bg-slate-950">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100">
          <span class="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[11px] font-bold bg-cyber-cyan text-slate-950">${item.tag}</span>
          ${item.freeShipping ? `<span class="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] bg-slate-900/80 text-cyber-cyan border border-cyber-cyan/30">包邮</span>` : ''}
        </div>

        <div class="p-4 flex flex-col flex-grow justify-between gap-3">
          <div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>${item.categoryName}</span>
              <span class="font-mono text-cyber-amber flex items-center gap-0.5">★ ${item.rating}</span>
            </div>
            <h3 class="font-bold text-sm text-slate-100 group-hover:text-cyber-cyan transition line-clamp-2">
              ${item.title}
            </h3>
            <p class="text-xs text-slate-400 mt-1 line-clamp-2">${item.description}</p>
          </div>

          <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <span class="text-lg font-black text-cyber-cyan font-mono">${displayPrice}</span>
              <span class="text-[10px] text-slate-500 block">已交付 ${item.sales}+</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button onclick="openDetail(${item.id})" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition">
                规格
              </button>
              <button onclick="quickAddToCart(${item.id})" class="px-3 py-1.5 rounded-lg bg-cyber-cyan hover:bg-cyan-300 text-slate-950 text-xs font-bold transition flex items-center gap-1">
                加购
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ================= 购物车逻辑 =================
function quickAddToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;
  addToCart(item, item.specs[0], 1);
}

function addToCart(item, spec, quantity) {
  const existIndex = cart.findIndex(c => c.id === item.id && c.spec === spec);
  if (existIndex > -1) {
    cart[existIndex].quantity += quantity;
  } else {
    cart.push({
      id: item.id,
      title: item.title,
      priceCny: item.priceCny,
      spec: spec,
      quantity: quantity,
      image: item.image
    });
  }
  updateCartUI();
  toggleCartDrawer(true);
}

function updateCartUI() {
  const countBadge = document.getElementById("cartCountBadge");
  const listEl = document.getElementById("cartItemList");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountEl = document.getElementById("cartDiscount");
  const totalEl = document.getElementById("cartTotal");

  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  countBadge.textContent = totalCount;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="py-16 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
        <i data-lucide="package-open" class="w-8 h-8 text-slate-600"></i>
        <span>补给舱目前为空</span>
      </div>
    `;
    subtotalEl.textContent = "¥ 0.00";
    discountEl.textContent = "-¥ 0.00";
    totalEl.textContent = "¥ 0.00";
    if (window.lucide) lucide.createIcons();
    return;
  }

  let subtotal = 0;
  listEl.innerHTML = cart.map((c, index) => {
    subtotal += c.priceCny * c.quantity;
    const priceDisplay = currentCurrency === "CNY" ? `¥ ${c.priceCny}` : `$ ${(c.priceCny / USD_RATE).toFixed(1)}`;

    return `
      <div class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
        <img src="${c.image}" class="w-14 h-14 rounded-lg object-cover bg-slate-950">
        <div class="flex-grow min-w-0">
          <h4 class="text-xs font-bold text-slate-100 truncate">${c.title}</h4>
          <span class="text-[10px] text-cyber-cyan block">规格: ${c.spec}</span>
          <span class="text-xs font-mono text-slate-200">${priceDisplay}</span>
        </div>
        <div class="flex items-center gap-1">
          <button onclick="changeCartQty(${index}, -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center">-</button>
          <span class="text-xs font-mono px-1">${c.quantity}</span>
          <button onclick="changeCartQty(${index}, 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center">+</button>
        </div>
      </div>
    `;
  }).join("");

  const discount = subtotal > 500 ? 50 : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  if (currentCurrency === "CNY") {
    subtotalEl.textContent = `¥ ${subtotal.toFixed(2)}`;
    discountEl.textContent = `-¥ ${discount.toFixed(2)}`;
    totalEl.textContent = `¥ ${finalTotal.toFixed(2)}`;
  } else {
    subtotalEl.textContent = `$ ${(subtotal / USD_RATE).toFixed(2)}`;
    discountEl.textContent = `-$ ${(discount / USD_RATE).toFixed(2)}`;
    totalEl.textContent = `$ ${(finalTotal / USD_RATE).toFixed(2)}`;
  }

  if (window.lucide) lucide.createIcons();
}

function changeCartQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartDrawerBackdrop");
  if (open) {
    backdrop.classList.remove("hidden");
    drawer.classList.remove("translate-x-full");
  } else {
    drawer.classList.add("translate-x-full");
    backdrop.classList.add("hidden");
  }
}

// ================= SKU 详情弹窗 =================
function openDetail(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById("productModal");
  const content = document.getElementById("modalContent");

  const priceDisplay = currentCurrency === "CNY" ? `¥ ${item.priceCny}` : `$ ${(item.priceCny / USD_RATE).toFixed(1)}`;

  content.innerHTML = `
    <div class="h-64 md:h-full bg-slate-950">
      <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
    </div>
    <div class="p-6 flex flex-col justify-between gap-4">
      <div>
        <span class="text-xs text-cyber-cyan font-mono">${item.categoryName} · 序列号 #${item.id}</span>
        <h2 class="text-lg font-bold text-white mt-1">${item.title}</h2>
        <div class="flex items-center gap-3 my-2 text-xs">
          <span class="text-xl font-black text-cyber-cyan font-mono">${priceDisplay}</span>
          <span class="text-slate-400">剩余配额: ${item.stock}</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
        
        <div class="mt-4">
          <label class="text-xs text-slate-400 block mb-2 font-medium">选择配置/规格：</label>
          <div class="flex flex-wrap gap-2" id="modalSpecGroup">
            ${item.specs.map((spec, i) => `
              <button class="spec-btn px-3 py-1 rounded-lg text-xs border ${i === 0 ? 'border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan' : 'border-slate-700 bg-slate-800 text-slate-300'} transition" onclick="selectModalSpec(this, '${spec}')">
                ${spec}
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 pt-4 border-t border-slate-800">
        <button id="confirmAddToCartBtn" class="flex-grow py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs hover:bg-cyan-300 transition">
          加入能量补给舱
        </button>
      </div>
    </div>
  `;

  let selectedSpec = item.specs[0];
  window.selectModalSpec = function(btn, spec) {
    document.querySelectorAll(".spec-btn").forEach(b => {
      b.classList.remove("border-cyber-cyan", "bg-cyber-cyan/20", "text-cyber-cyan");
      b.classList.add("border-slate-700", "bg-slate-800", "text-slate-300");
    });
    btn.classList.add("border-cyber-cyan", "bg-cyber-cyan/20", "text-cyber-cyan");
    btn.classList.remove("border-slate-700", "bg-slate-800", "text-slate-300");
    selectedSpec = spec;
  };

  document.getElementById("confirmAddToCartBtn").onclick = function() {
    addToCart(item, selectedSpec, 1);
    modal.classList.add("hidden");
  };

  modal.classList.remove("hidden");
}

// ================= 事件监听与初始化 =================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();

  // 分类切换
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => {
        b.classList.remove("bg-cyber-cyan", "text-slate-950");
        b.classList.add("bg-slate-800", "text-slate-300");
      });
      btn.classList.add("bg-cyber-cyan", "text-slate-950");
      btn.classList.remove("bg-slate-800", "text-slate-300");

      currentCategory = btn.getAttribute("data-cat");
      renderProducts();
    });
  });

  // 搜索
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    searchKeyword = e.target.value.trim();
    renderProducts();
  });
  document.getElementById("searchSubmitBtn").addEventListener("click", () => {
    searchKeyword = searchInput.value.trim();
    renderProducts();
  });

  // 热搜词
  document.querySelectorAll(".hot-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const kw = tag.getAttribute("data-keyword");
      searchInput.value = kw;
      searchKeyword = kw;
      renderProducts();
    });
  });

  // 排序
  document.getElementById("sortGeneralBtn").addEventListener("click", function() {
    sortMode = "general";
    resetSortBtnStyles();
    this.classList.add("text-cyber-cyan", "bg-slate-800");
    renderProducts();
  });

  document.getElementById("sortSalesBtn").addEventListener("click", function() {
    sortMode = "sales";
    resetSortBtnStyles();
    this.classList.add("text-cyber-cyan", "bg-slate-800");
    renderProducts();
  });

  document.getElementById("sortPriceBtn").addEventListener("click", function() {
    resetSortBtnStyles();
    this.classList.add("text-cyber-cyan", "bg-slate-800");
    const icon = document.getElementById("priceSortIcon");
    if (sortMode === "priceAsc") {
      sortMode = "priceDesc";
      icon.textContent = "↓";
    } else {
      sortMode = "priceAsc";
      icon.textContent = "↑";
    }
    renderProducts();
  });

  function resetSortBtnStyles() {
    document.querySelectorAll(".sort-btn").forEach(b => {
      b.classList.remove("text-cyber-cyan", "bg-slate-800");
      b.classList.add("text-slate-400");
    });
  }

  // 包邮筛选
  document.getElementById("freeShippingCheck").addEventListener("change", (e) => {
    onlyFreeShipping = e.target.checked;
    renderProducts();
  });

  // 购物车抽屉开关
  document.getElementById("openCartBtn").addEventListener("click", () => toggleCartDrawer(true));
  document.getElementById("closeCartBtn").addEventListener("click", () => toggleCartDrawer(false));
  document.getElementById("cartDrawerBackdrop").addEventListener("click", () => toggleCartDrawer(false));

  // 模态弹窗关闭
  document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("productModal").classList.add("hidden");
  });

  // 浏览全系好物
  document.getElementById("exploreAllBtn").addEventListener("click", () => {
    window.scrollTo({ top: 400, behavior: 'smooth' });
  });

  // 重置筛选
  document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    currentCategory = "all";
    searchKeyword = "";
    searchInput.value = "";
    onlyFreeShipping = false;
    document.getElementById("freeShippingCheck").checked = false;
    renderProducts();
  });

  // 结账结算模拟
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("补给舱为空，无法办理出库。");
      return;
    }
    alert("🚀 订单已接入量子网络，正在安排无人货舱配送！");
    cart = [];
    updateCartUI();
    toggleCartDrawer(false);
  });

  // 字号调节
  const body = document.body;
  document.getElementById("fontSizeNormalBtn").onclick = () => {
    body.className = body.className.replace(/font-size-\w+/g, '') + ' font-size-normal';
  };
  document.getElementById("fontSizeLargeBtn").onclick = () => {
    body.className = body.className.replace(/font-size-\w+/g, '') + ' font-size-large';
  };
  document.getElementById("fontSizeXlBtn").onclick = () => {
    body.className = body.className.replace(/font-size-\w+/g, '') + ' font-size-xl';
  };

  // 币种切换
  document.getElementById("currencyCnyBtn").onclick = function() {
    currentCurrency = "CNY";
    this.classList.add("bg-cyber-cyan/20", "text-cyber-cyan");
    document.getElementById("currencyUsdBtn").classList.remove("bg-cyber-cyan/20", "text-cyber-cyan");
    renderProducts();
    updateCartUI();
  };
  document.getElementById("currencyUsdBtn").onclick = function() {
    currentCurrency = "USD";
    this.classList.add("bg-cyber-cyan/20", "text-cyber-cyan");
    document.getElementById("currencyCnyBtn").classList.remove("bg-cyber-cyan/20", "text-cyber-cyan");
    renderProducts();
    updateCartUI();
  };

  // 高对比护眼切换
  document.getElementById("highContrastToggle").onclick = () => {
    body.classList.toggle("high-contrast");
  };
});
