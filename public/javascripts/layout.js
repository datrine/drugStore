var controller = new AbortController()
var signal = controller.signal;
let loading_div;
async function searchRand(text) {
    controller.abort();
    controller = new AbortController()
    signal = controller.signal;
    var result = await fetch("/search?text=" + text, {
        method: "post", signal: signal
    }).then(res => res.json()).catch(err => { console.log("error: " + err.message); });
    return result;
}
function showCart() {
    var cart = document.getElementById("divCart")
    cart.classList.contains("w3-hide") ? cart.classList.remove("w3-hide") : cart.classList.add("w3-hide")
}
function w3_openSidebar() {
    document.getElementById("main_sidebar").style.display = "block"
    document.getElementById("main_overlay").style.display = "block"
}
function w3_closeSidebar() {
    document.getElementById("main_sidebar").style.display = "none"
    document.getElementById("main_overlay").style.display = "none"
}
function menuCollapser() {
    var menu_bar = document.getElementById("menu_bar")
    menu_bar.classList.toggle("w3-show")
}
function accountLargeDropDown() {
    var cart = document.getElementById("div_AccLarge")
    cart.classList.toggle("w3-show")
}
window.addEventListener("resize", (e) => {
})
function accountDropDown() {
    var menu_bar = document.getElementById("account_dropdown_menu")
    menu_bar.classList.toggle("w3-show")
}
function logger() {
    ShowReactLogin()
    var cart = document.getElementById("div_AccLarge")
    cart.classList.remove("w3-show")
}
function loggerSmall() {
    ShowReactLogin()
    document.getElementById("main_sidebar").style.display = "none"
    document.getElementById("main_overlay").style.display = "none"
}
$(function () {
    loading_div = document.getElementById("loading")
    $(".inputQuickSearch").on("input", function (e) {
        var text = $("#inputQuickSearch").val()
        if (text != "") {
            searchRand(text).then(results => {
                if (results) {
                    buildSearch(results)
                }
            }).catch(err => console.log(err))
        }

    })
    $("#searchProd").on("click", function (e) {
        window.location.href = "/product?product=" + $("#inputQuickSearch").val()
    })
    function buildSearch(listings) {
        var divGuesser = document.querySelector("#searh_dtl");
        divGuesser.innerHTML = "";
        if (listings.length > 0) {
            listings.forEach(function (element) {
                var option = document.createElement("option")
                option.value = element.name;
                divGuesser.appendChild(option)
            });
        }
    }
})