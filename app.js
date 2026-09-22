// ================= 商品全域矩阵数据 =================
const products = [
  {
    id: 1,
    title: "OmniLens 8K 神经光导 AR 智能镜",
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
    description: "次世代 8K 微光波导模组，支持实时跨语言同声传显，全重仅 38g，适配全天候无感佩戴。"
  },
  {
    id: 2,
    title: "Aegis-X 纳米三防石墨烯温控机能风衣",
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
    description: "石墨烯瞬时微热传导，纳米自呼吸微孔防水透气，无惧极端严寒与潮湿暴雨。"
  },
  {
    id: 3,
    title: "CyberPaws 二代桌面仿生机械伴侣犬",
    category: "companion",
    categoryName: "仿生伴侣",
    priceCny: 1299,
    sales: 960,
    rating: 5.0,
    stock: 18,
    freeShipping: true,
    tag: "独家好物",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
    specs: ["机械原色", "荧光蓝特别版"],
    description: "内置多模态情绪感知引擎，支持手势交互与自主巡航，金属亲肤温润触感反馈。"
  },
  {
    id: 4,
    title: "星穹超萃 深空零下55度冻干冷萃咖啡晶仓",
    category: "food",
    categoryName: "深空美食",
    priceCny: 89,
    sales: 12400,
    rating: 4.9,
    stock: 350,
    freeShipping: false,
    tag: "人次回购",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80",
    specs: ["24颗标准装", "48颗分享装"],
    description: "超低温真空结晶锁香工艺，冷热水3秒速溶，还原 99.2% 现磨阿拉比卡原生风味。"
  },
  {
    id: 5,
    title: "Pulse-Ring 钛合金全天候生命体征指环",
    category: "tech",
    categoryName: "智能数码",
    priceCny: 429,
    sales: 4520,
    rating: 4.7,
    stock: 120,
    freeShipping: true,
    tag: "无感监测",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",
    specs: ["钛晶黑 10号", "钛晶银 12号", "陨石灰 14号"],
    description: "医疗级微循环监测，全天候持续追踪心率、血氧与睡眠节律，支持 14 天超长续航。"
  },
  {
    id: 6,
    title: "Terra 模块化防磁耐磨机能通勤包",
    category: "wear",
    categoryName: "机能穿戴",
    priceCny: 319,
    sales: 2190,
    rating: 4.6,
    stock: 64,
    freeShipping: false,
    tag: "防磁甄选",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    specs: ["深空黑 20L", "星云灰 24L"],
    description: "防磁防割裂 CORDURA 面料，配备外挂快拆磁吸锁扣与悬浮减震数码独立收纳仓。"
  }
];

// ================= 终端运行状态 =================
let currentCategory = "all";
let searchKeyword = "";
let sortMode = "general"; // general, sales, priceAsc, priceDesc
let onlyFreeShipping = false;
let currentCurrency = "CNY"; // CNY, USD
const USD_RATE = 7.2;

let cart = [];

// ================= 核心商品网格渲染函数 =================
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");

  if (!grid) return;

  const filtered = products.filter(item => {
    const matchCat = (currentCategory === "all") || (item.category === currentCategory);
    const matchSearch = item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchShip = !onlyFreeShipping || item.freeShipping;
    return matchCat && matchSearch && matchShip;
  });

  // 排序算法
  if (sortMode === "sales") {
    filtered.sort((a, b) => b.sales - a.sales);
  } else if (sortMode === "priceAsc") {
    filtered.sort((a, b) => a.priceCny - b.priceCny);
  } else if (sortMode === "priceDesc") {
    filtered.sort((a, b) => b.priceCny - a.priceCny);
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (empty) {
      empty.classList.remove("hidden");
      empty.classList.add("flex");
    }
    return;
  }

  if (empty) {
    empty.classList.add("hidden");
    empty.classList.remove("flex");
  }

  grid.innerHTML = filtered.map(item => {
    const priceText = currentCurrency === "CNY" 
      ? `¥ ${item.priceCny}` 
      : `$ ${(item.priceCny / USD_RATE).toFixed(1)}`;

    return `
      <div class="group bg-cyber-card border border-cyber-border hover:border-cyber-cyan/70 rounded-2xl overflow-hidden transition duration-300 flex flex-col hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10">
        <!-- 封面与状态角标 -->
        <div class="relative w-full h-48 overflow-hidden bg-slate-950">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100" loading="lazy">
          <span class="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-cyber-cyan text-slate-950 shadow">${item.tag}</span>
          ${item.freeShipping ? `<span class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] bg-slate-950/80 text-cyber-cyan border border-cyber-cyan/40">包邮</span>` : ''}
        </div>

        <!-- 详细信息 -->
        <div class="p-4 flex flex-col flex-grow justify-between gap-3">
          <div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>${item.categoryName}</span>
              <span class="font-mono text-cyber-amber">★ ${item.rating}</span>
            </div>
            <h3 class="font-bold text-sm text-slate-100 group-hover:text-cyber-cyan transition line-clamp-2">
              ${item.title}
            </h3>
            <p class="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">${item.description}</p>
          </div>

          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <span class="text-lg font-black text-cyber-cyan font-mono">${priceText}</span>
              <span class="text-[10px] text-slate-500 block font-mono">已交付: ${item.sales}+</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button onclick="openDetail(${item.id})" class="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs transition">
                规格
              </button>
              <button onclick="quickAddToCart(${item.id})" class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyber-cyan to-blue-500 hover:brightness-110 text-slate-950 text-xs font-black transition shadow">
                + 加购
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ================= 购物车核心业务 =================
function quickAddToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;
  addToCart(item, item.specs[0], 1);
}

function addToCart(item, spec, quantity) {
  const existing = cart.find(c => c.id === item.id && c.spec === spec);
  if (existing) {
    existing.quantity += quantity;
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
  const badge = document.getElementById("cartCountBadge");
  const listEl = document.getElementById("cartItemList");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountEl = document.getElementById("cartDiscount");
  const totalEl = document.getElementById("cartTotal");

  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  if (badge) badge.textContent = totalCount;

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="py-20 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
        <span class="text-3xl">📦</span>
        <span>补给舱当前为空，快去选购好物吧</span>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "¥ 0.00";
    if (discountEl) discountEl.textContent = "-¥ 0.00";
    if (totalEl) totalEl.textContent = "¥ 0.00";
    return;
  }

  let subtotal = 0;
  listEl.innerHTML = cart.map((c, index) => {
    subtotal += c.priceCny * c.quantity;
    const priceDisplay = currentCurrency === "CNY" ? `¥ ${c.priceCny}` : `$ ${(c.priceCny / USD_RATE).toFixed(1)}`;

    return `
      <div class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
        <img src="${c.image}" class="w-14 h-14 rounded-lg object-cover bg-slate-950">
        <div class="flex-grow min-w-0">
          <h4 class="text-xs font-bold text-slate-100 truncate">${c.title}</h4>
          <span class="text-[10px] text-cyber-cyan block">规格: ${c.spec}</span>
          <span class="text-xs font-mono text-slate-300">${priceDisplay}</span>
        </div>
        <div class="flex items-center gap-1">
          <button onclick="changeCartQty(${index}, -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center">-</button>
          <span class="text-xs font-mono px-1">${c.quantity}</span>
          <button onclick="changeCartQty(${index}, 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center">+</button>
        </div>
      </div>
    `;
  }).join("");

  const discount = subtotal >= 500 ? 50 : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  if (currentCurrency === "CNY") {
    if (subtotalEl) subtotalEl.textContent = `¥ ${subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-¥ ${discount.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `¥ ${finalTotal.toFixed(2)}`;
  } else {
    if (subtotalEl) subtotalEl.textContent = `$ ${(subtotal / USD_RATE).toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$ ${(discount / USD_RATE).toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$ ${(finalTotal / USD_RATE).toFixed(2)}`;
  }
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
  if (!drawer || !backdrop) return;
  if (open) {
    backdrop.classList.remove("hidden");
    drawer.classList.remove("translate-x-full");
  } else {
    drawer.classList.add("translate-x-full");
    backdrop.classList.add("hidden");
  }
}

// ================= SKU 规格详情弹窗 =================
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
        <span class="text-xs text-cyber-cyan font-mono">${item.categoryName} · 配额编号 #${item.id}</span>
        <h2 class="text-lg font-bold text-white mt-1">${item.title}</h2>
        <div class="flex items-center gap-3 my-2 text-xs">
          <span class="text-xl font-black text-cyber-cyan font-mono">${priceDisplay}</span>
          <span class="text-slate-400">实时库存: ${item.stock}</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
        
        <div class="mt-4">
          <label class="text-xs text-slate-400 block mb-2 font-medium">配置规格：</label>
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
        <button id="confirmAddToCartBtn" class="flex-grow py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-blue-600 text-slate-950 font-black text-xs hover:brightness-110 transition shadow">
          确认调度进补给舱
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

// ================= 事件监听与 DOM 驱动初始化 =================
function initApp() {
  renderProducts();
  updateCartUI();

  // 品类切换监听
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => {
        b.classList.remove("bg-cyber-cyan", "text-slate-950");
        b.classList.add("bg-slate-900", "text-slate-300");
      });
      btn.classList.add("bg-cyber-cyan", "text-slate-950");
      btn.classList.remove("bg-slate-900", "text-slate-300");

      currentCategory = btn.getAttribute("data-cat");
      renderProducts();
    });
  });

  // 搜索框实时匹配
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value.trim();
      renderProducts();
    });
  }
  const searchSubmitBtn = document.getElementById("searchSubmitBtn");
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener("click", () => {
      searchKeyword = searchInput ? searchInput.value.trim() : "";
      renderProducts();
    });
  }

  // 实时热搜标签快捷填入
  document.querySelectorAll(".hot-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const kw = tag.getAttribute("data-keyword");
      if (searchInput) searchInput.value = kw;
      searchKeyword = kw;
      renderProducts();
    });
  });

  // 综合排序
  document.getElementById("sortGeneralBtn")?.addEventListener("click", function() {
    sortMode = "general";
    resetSortBtnStyles();
    this.classList.add("text-cyber-cyan", "bg-slate-800");
    renderProducts();
  });

  // 销量排序
  document.getElementById("sortSalesBtn")?.addEventListener("click", function() {
    sortMode = "sales";
    resetSortBtnStyles();
    this.classList.add("text-cyber-cyan", "bg-slate-800");
    renderProducts();
  });

  // 价格升降序
  document.getElementById("sortPriceBtn")?.addEventListener("click", function() {
    resetSortBtnStyles();
    this.classList.add("text-cyber-cyan", "bg-slate-800");
    const icon = document.getElementById("priceSortIcon");
    if (sortMode === "priceAsc") {
      sortMode = "priceDesc";
      if (icon) icon.textContent = "↓";
    } else {
      sortMode = "priceAsc";
      if (icon) icon.textContent = "↑";
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
  document.getElementById("freeShippingCheck")?.addEventListener("change", (e) => {
    onlyFreeShipping = e.target.checked;
    renderProducts();
  });

  // 购物车抽屉展开与关闭
  document.getElementById("openCartBtn")?.addEventListener("click", () => toggleCartDrawer(true));
  document.getElementById("closeCartBtn")?.addEventListener("click", () => toggleCartDrawer(false));
  document.getElementById("cartDrawerBackdrop")?.addEventListener("click", () => toggleCartDrawer(false));

  // 模态弹窗关闭
  document.getElementById("closeModalBtn")?.addEventListener("click", () => {
    document.getElementById("productModal")?.classList.add("hidden");
  });

  // 平滑滚动浏览全系
  document.getElementById("exploreAllBtn")?.addEventListener("click", () => {
    window.scrollTo({ top: 460, behavior: 'smooth' });
  });

  // 重置筛选状态
  document.getElementById("resetFiltersBtn")?.addEventListener("click", () => {
    currentCategory = "all";
    searchKeyword = "";
    if (searchInput) searchInput.value = "";
    onlyFreeShipping = false;
    const check = document.getElementById("freeShippingCheck");
    if (check) check.checked = false;
    renderProducts();
  });

  // 模拟出库结算
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("补给舱当前为空，请先选购商品！");
      return;
    }
    alert("🚀 结算完成！已向量子配送中枢提交调度指令，即刻出库。");
    cart = [];
    updateCartUI();
    toggleCartDrawer(false);
  });

  // 无障碍字号调节
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

  // 双币种动态换算
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

  // 高对比护眼滤镜
  document.getElementById("highContrastToggle").onclick = () => {
    body.classList.toggle("high-contrast");
  };
}

// 页面加载完成后立即注水
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}