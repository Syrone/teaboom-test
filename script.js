const packages = [
  { weight: "100 г", sku: "01306", oldPrice: 34920, price: 32640 },
  { weight: "500 г", sku: "01307", oldPrice: 164600, price: 143200 },
  { weight: "1000 г", sku: "01308", oldPrice: 259200, price: 206400 },
  { weight: "5000 г", sku: "01309", oldPrice: 871000, price: 632000 },
];

const optionsContainer = document.querySelector("#packaging-options");
const skuElement = document.querySelector("#product-sku");
const currentPriceElement = document.querySelector("#current-price");
const oldPriceElement = document.querySelector("#old-price");
const imageTrigger = document.querySelector(".product__image-trigger");
const productImageElement = imageTrigger.querySelector(".product__image");
const thumbnailsContainer = document.querySelector("#product-thumbnails");
const imageViewer = document.querySelector("#product-image-viewer");
const imageViewerCloseButton = imageViewer.querySelector(".product-image-viewer__close");
const imageViewerImage = imageViewer.querySelector("#product-image-viewer-image");
const productImages = [
  {
    src: "assets/ananasovij-ulun.jpg",
    alt: "Ананасовый улун — чай с ароматом спелого ананаса",
  },
];
const rubleFormatter = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const wholeRubleFormatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
});

function formatPrice(kopecks) {
  const rubles = kopecks / 100;
  const formatter = kopecks % 100 === 0 ? wholeRubleFormatter : rubleFormatter;
  return `${formatter.format(rubles)}\u00a0₽`;
}

function selectPackage(selectedPackage, selectedButton) {
  optionsContainer.querySelectorAll(".packaging__option").forEach((button) => {
    const isSelected = button === selectedButton;
    button.setAttribute("aria-pressed", String(isSelected));
  });

  skuElement.textContent = selectedPackage.sku;
  currentPriceElement.textContent = formatPrice(selectedPackage.price);
  oldPriceElement.textContent = formatPrice(selectedPackage.oldPrice);
}

function selectProductImage(selectedIndex) {
  const selectedImage = productImages[selectedIndex];

  thumbnailsContainer.querySelectorAll(".product__thumbnail").forEach((button, index) => {
    button.setAttribute("aria-pressed", String(index === selectedIndex));
  });

  productImageElement.src = selectedImage.src;
  productImageElement.alt = selectedImage.alt;
  imageViewerImage.src = selectedImage.src;
  imageViewerImage.alt = selectedImage.alt;
}

packages.forEach((productPackage, index) => {
  const button = document.createElement("button");
  button.className = "packaging__option";
  button.type = "button";
  button.textContent = productPackage.weight;
  button.setAttribute("aria-pressed", String(index === 0));
  button.addEventListener("click", () => selectPackage(productPackage, button));
  optionsContainer.append(button);
});

selectPackage(packages[0], optionsContainer.firstElementChild);

productImages.forEach((productImage, index) => {
  const button = document.createElement("button");
  const thumbnail = document.createElement("img");
  button.className = "product__thumbnail";
  button.type = "button";
  button.setAttribute("aria-label", `Показать фотографию ${index + 1}`);
  button.setAttribute("aria-pressed", "false");
  thumbnail.src = productImage.src;
  thumbnail.alt = "";
  thumbnail.width = 72;
  thumbnail.height = 72;
  button.append(thumbnail);
  button.addEventListener("click", () => selectProductImage(index));
  thumbnailsContainer.append(button);
});

selectProductImage(0);

imageTrigger.addEventListener("click", () => imageViewer.showModal());
imageViewerCloseButton.addEventListener("click", () => imageViewer.close());
imageViewer.addEventListener("click", (event) => {
  if (event.target === imageViewer) {
    imageViewer.close();
  }
});
