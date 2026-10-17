/*
  3B Autos demo website
  IMPORTANT: Replace WHATSAPP_NUMBER with the real business number in international format,
  digits only, including Qatar country code 974. Example format: 974XXXXXXXX.
  Demo products and price ranges are illustrative only; verify before publishing.
*/
const WHATSAPP_NUMBER = ""; // Example: "97470255592"

const parts = [
  {id:"3BA-001",name:"Used Alternator",category:"Electrical",car:"Toyota Camry • confirm year/engine",condition:"Used",price:350,image:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80",description:"Example listing. Ask us to confirm compatibility and availability."},
  {id:"3BA-002",name:"Radiator Assembly",category:"Cooling",car:"Nissan Altima • confirm year/engine",condition:"Used",price:280,image:"https://images.unsplash.com/photo-1635784063384-5f1d8e6b8e19?auto=format&fit=crop&w=700&q=80",description:"Example listing. Check fitment with your vehicle details."},
  {id:"3BA-003",name:"Engine Assembly",category:"Engine",car:"Toyota / selected models • verify fitment",condition:"Used",price:1800,image:"https://images.unsplash.com/photo-1635784063384-5f1d8e6b8e19?auto=format&fit=crop&w=700&q=80",description:"Example listing only. Engine code, mileage and warranty must be confirmed."},
  {id:"3BA-004",name:"Front Headlight",category:"Body",car:"Selected sedan models • confirm side/model",condition:"Used",price:220,image:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80",description:"Example listing. Ask us to verify the exact part number."},
  {id:"3BA-005",name:"Starter Motor",category:"Electrical",car:"Honda / selected models • verify fitment",condition:"Used",price:190,image:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80",description:"Example listing. Condition and availability subject to confirmation."},
  {id:"3BA-006",name:"Gearbox Assembly",category:"Transmission",car:"Selected models • match gearbox code",condition:"Used",price:2400,image:"https://images.unsplash.com/photo-1635784063384-5f1d8e6b8e19?auto=format&fit=crop&w=700&q=80",description:"Example listing only. Verify gearbox code and warranty terms."},
  {id:"3BA-007",name:"Engine Cooling Fan",category:"Cooling",car:"Selected models • confirm connector",condition:"Used",price:160,image:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80",description:"Example listing. Contact us with the vehicle year and VIN if available."},
  {id:"3BA-008",name:"Door Mirror",category:"Body",car:"Selected models • left/right side required",condition:"Used",price:140,image:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80",description:"Example listing. Color, side and electrical functions need confirmation."}
];

const partsGrid = document.getElementById("partsGrid");
const searchInput = document.getElementById("partSearch");
const categoryFilter = document.getElementById("categoryFilter");

function money(value) {
  return new Intl.NumberFormat("en-QA", {maximumFractionDigits:0}).format(value);
}

function renderParts() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const category = categoryFilter?.value || "all";
  const filtered = parts.filter(part => {
    const matchesQuery = [part.name, part.category, part.car, part.id, part.condition].join(" ").toLowerCase().includes(query);
    const matchesCategory = category === "all" || part.category === category;
    return matchesQuery && matchesCategory;
  });

  if (!filtered.length) {
    partsGrid.innerHTML = '<div class="no-results">No matching demo listings. Contact us and tell us which part you need.</div>';
    return;
  }

  partsGrid.innerHTML = filtered.map(part => `
    <article class="part-card">
      <div class="part-image">
        <img src="${part.image}" alt="${part.name}" loading="lazy" onerror="this.style.display='none'">
        <span class="part-badge">${part.condition} • DEMO</span>
      </div>
      <div class="part-content">
        <span class="part-category">${part.category} · ${part.id}</span>
        <h3>${part.name}</h3>
        <div class="part-meta">${part.car}</div>
        <div class="part-bottom">
          <div class="part-price">QAR ${money(part.price)} <small>illustrative</small></div>
          <button type="button" data-part-id="${part.id}">Ask about part ↗</button>
        </div>
      </div>
    </article>
  `).join("");

  partsGrid.querySelectorAll("[data-part-id]").forEach(button => {
    button.addEventListener("click", () => {
      const part = parts.find(item => item.id === button.dataset.partId);
      if (part) openWhatsApp(`Hello 3B Autos, I am interested in this spare part:\nPart: ${part.name}\nProduct ID: ${part.id}\nIllustrative price: QAR ${money(part.price)}\nVehicle: ${part.car}\nPlease confirm actual availability, compatibility and final price.`);
    });
  });
}

function openWhatsApp(message) {
  if (!WHATSAPP_NUMBER || !/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
    alert("The business WhatsApp number is not configured yet. Please add the real number in script.js (WHATSAPP_NUMBER).");
    document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

searchInput?.addEventListener("input", renderParts);
categoryFilter?.addEventListener("change", renderParts);

document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const car = String(data.get("car") || "").trim();
  const service = String(data.get("service") || "").trim();
  const details = String(data.get("details") || "").trim();
  const message = `Hello 3B Autos, I would like to make an inquiry.\nName: ${name}\nMobile: ${phone}\nCar: ${car || "Not specified"}\nService/Inquiry: ${service}\nDetails: ${details || "Not provided"}`;
  openWhatsApp(message);
});

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("serviceSelect");
    if (select) {
      const wanted = link.dataset.service;
      const option = [...select.options].find(item => item.text.toLowerCase() === wanted.toLowerCase());
      if (option) select.value = option.value;
      else if (wanted) {
        const other = [...select.options].find(item => item.text === "Other");
        if (other) select.value = other.value;
      }
    }
  });
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

renderParts();
