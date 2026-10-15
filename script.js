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
