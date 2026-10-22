// Update these details with your real shop information.
const SHOP = {
  owner: "Your Name Here",
  experience: "Add your years of experience",
  phone: "9999999999",
  whatsapp: "919999999999", // India country code + mobile number, digits only
  address: "Enter your full shop address",
  hours: "Enter your opening and closing times",
  upi: "yourname@upi",
  mapUrl: "https://www.google.com/maps",
  paymentAmount: ""
};

document.querySelectorAll("[data-config]").forEach((el) => {
  const key = el.dataset.config;
  if (SHOP[key]) el.textContent = SHOP[key];
});

document.getElementById("callLink").href = `tel:${SHOP.phone}`;

const defaultMessage = "Hello Shri Laxmi Naryan Bike Repairing Center! I would like to ask about bike servicing.";
const whatsappUrl = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(defaultMessage)}`;
document.getElementById("whatsappLink").href = whatsappUrl;
document.getElementById("floatingWhatsApp").href = whatsappUrl;
document.getElementById("mapLink").href = SHOP.mapUrl;

const upiButton = document.getElementById("upiButton");
if (SHOP.upi && SHOP.upi !== "yourname@upi" && /^[^@\\s]+@[^@\\s]+$/.test(SHOP.upi)) {
  const params = new URLSearchParams({
    pa: SHOP.upi,
    pn: "Shri Laxmi Naryan Bike Repairing Center",
    cu: "INR"
  });
  if (SHOP.paymentAmount) params.set("am", SHOP.paymentAmount);
  upiButton.href = `upi://pay?${params.toString()}`;
} else {
  upiButton.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Please add your correct UPI ID in script.js first.");
  });
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("service").value = link.dataset.service;
  });
});

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const vehicle = document.getElementById("vehicle").value;
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  const bookingMessage = [
    "Hello Shri Laxmi Naryan Bike Repairing Center!",
    "",
    "I would like to enquire about a two-wheeler service.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Vehicle: ${vehicle}`,
    `Service: ${service}`,
    `Problem / Preferred time: ${message || "Not specified"}`,
    "",
    "Please confirm availability and charges."
  ].join("\\n");

  window.open(
    `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(bookingMessage)}`,
    "_blank",
    "noopener,noreferrer"
  );
});

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
