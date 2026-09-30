import { initializeSaleList } from "./sale-list";
import { initializeSaleForm } from "./sale-form";
import { showSaleDetails } from "./sale-details";

const newSaleButton = document.getElementById("newSaleButton");

const salesListTab = document.getElementById("salesListTab");
const newSaleTab = document.getElementById("newSaleTab");
const salesListSection = document.getElementById("salesListSection");
const newSaleSection = document.getElementById("newSaleSection");

const salesTable = initializeSaleList({
    onView: showSaleDetails,
});

initializeSaleForm(salesTable);

function showSalesList() {
    salesListTab.classList.add("active");
    salesListTab.setAttribute("aria-selected", "true");
    salesListSection.classList.add("show", "active");

    newSaleTab.classList.remove("active");
    newSaleTab.setAttribute("aria-selected", "false");
    newSaleSection.classList.remove("show", "active");
}

function showNewSale() {
    newSaleTab.classList.add("active");
    newSaleTab.setAttribute("aria-selected", "true");
    newSaleSection.classList.add("show", "active");

    salesListTab.classList.remove("active");
    salesListTab.setAttribute("aria-selected", "false");
    salesListSection.classList.remove("show", "active");
}

salesListTab.addEventListener("click", showSalesList);
newSaleTab.addEventListener("click", showNewSale);

newSaleButton.addEventListener("click", () => {
    showNewSale();
});
