const phoneInput = document.getElementById("tel");
const form = document.getElementById("submitForm");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const menuLinks = document.querySelectorAll(".menu-link");
const variantsSelect = document.getElementById("variants");
const firstNameInput = document.getElementById("firstName");
const submitButton = document.getElementById("submitButton");
const slidesWrapper = document.querySelector(".comments-swiper-wrapper");

const comments = [
  "yJN_St-UyqQ",
  "KOTZ9MS2Glo",
  "zlW55aAxLE0",
  "0jjlo91pxkM",
  "ZWeAS0KTQbA",
  "aD-QQduOnmc",
  "nHwrf6rOB3c",
];

// Responsive menu
menuButton.addEventListener("click", function () {
  window.scrollTo(0, 0);
  mobileMenu.classList.toggle("translate-x-0");
  mobileMenu.classList.toggle("translate-x-full");
  document.documentElement.classList.toggle("overflow-y-hidden");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.remove("translate-x-0");
    document.documentElement.classList.remove("overflow-y-hidden");
  });
});

// Setup features swiper
new Swiper(".features-swiper", {
  spaceBetween: 16,
  slidesPerView: "auto",
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
  navigation: {
    prevEl: ".features-swiper-btn-prev",
    nextEl: ".features-swiper-btn-next",
  },
});

// Setup gallery swiper
new Swiper(".gallery-swiper", {
  loop: true,
  spaceBetween: 12,
  centeredSlides: true,
  slidesPerView: "auto",
  breakpoints: { 425: { spaceBetween: 20 } },
  navigation: { prevEl: ".btn-prev", nextEl: ".btn-next" },
});

// Setup comments
comments.forEach((_, index) => {
  const slide = document.createElement("div");

  slide.classList.add(
    "swiper-slide",
    "comments-swiper-slide",
    "relative",
    "h-full",
    "bg-white/5",
    "rounded-2xl"
  );

  const button = document.createElement("button");
  button.addEventListener("click", () => updateSlides(index));
  button.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "absolute",
    "top-1/2",
    "right-1/2",
    "-translate-y-1/2",
    "translate-x-1/2",
    "size-12",
    "bg-primary",
    "rounded-full"
  );
  const img = document.createElement("img");
  img.setAttribute("width", "20");
  img.setAttribute("height", "20");
  img.setAttribute("alt", "Play icon");
  img.classList.add("size-5", "translate-x-0.5");
  img.setAttribute("src", "./src/assets/images/icons/play.svg");

  button.appendChild(img);
  slide.appendChild(button);

  slidesWrapper.appendChild(slide);
});

// Setup comments swiper
new Swiper(".comments-swiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  breakpoints: {
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    450: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
  },
  navigation: {
    prevEl: ".comments-swiper-btn-prev",
    nextEl: ".comments-swiper-btn-next",
  },
});

// Update comments swiper slides
function updateSlides(activeIndex) {
  const slides = document.querySelectorAll(".comments-swiper-slide");

  slides.forEach((slide, index) => {
    slide.innerHTML = "";

    if (activeIndex === index) {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("allowfullscreen", "");
      iframe.classList.add("size-full", "rounded-2xl");
      iframe.setAttribute("title", "YouTube video player");
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${comments[index]}`
      );
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      slide.appendChild(iframe);
    } else {
      const button = document.createElement("button");
      button.addEventListener("click", () => updateSlides(index));
      button.classList.add(
        "flex",
        "items-center",
        "justify-center",
        "absolute",
        "top-1/2",
        "right-1/2",
        "-translate-y-1/2",
        "translate-x-1/2",
        "size-12",
        "bg-primary",
        "rounded-full"
      );
      const img = document.createElement("img");
      img.setAttribute("width", "20");
      img.setAttribute("height", "20");
      img.setAttribute("alt", "Play icon");
      img.classList.add("size-5", "translate-x-0.5");
      img.setAttribute("src", "./src/assets/images/icons/play.svg");

      button.appendChild(img);
      slide.appendChild(button);
    }
  });
}

// Phone input formatting
IMask(phoneInput, { mask: "+{998} (00) 000-00-00" });

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const tel = phoneInput.value.trim();
  const variant = variantsSelect.value;
  const firstName = firstNameInput.value.trim();

  if (submitButton.disabled) return;
  if (tel.length !== 19) return alert("Telefon raqam xato kiritildi!");

  const apiBaseUrl =
    "https://script.google.com/macros/s/AKfycbx3l7RhlQ6PSuuNzjginqG0w7AfL_TsnWWmCcGIaomxwSDHI5TmlVj-TpsnK5PZYhNT9g/exec";

  const data = JSON.stringify([
    formatDate(new Date()),
    firstName,
    `+${extractNumbers(tel)}`,
    variant,
  ]);

  const url = `${apiBaseUrl}?data=${encodeURIComponent(data)}`;

  submitButton.disabled = true;
  submitButton.textContent = "Yuborilmoqda...";

  fetch(url, { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "/src/pages/success.html";
      } else {
        alert("Xatolik yuz berdi, qaytadan urinib ko'ring!");
      }
    })
    .catch(() => alert("Noma'lum xatolik, qaytadan urinib ko'ring!"))
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Yuborish";
    });
});

// Utils
function extractNumbers(text = "") {
  return text.replace(/\D/g, "");
}

function formatDate(input) {
  const date = new Date(input);

  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}-${month}-${year}`;
}
