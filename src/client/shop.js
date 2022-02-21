import Footer from "./component/footer";
import NavBar from "./component/nav_mb";
import NewsLetter from "./component/newsletter";
import ShopSideBar from "./component/shopsidebar";
import Search from "./component/search";
import { get } from "../../utils/api/product";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { addToCart } from "../../utils/crud/cart";
import { reRender } from "../../utils/api/interface";
import $ from "jquery";
import axios from "axios";
import Heading from "./component/header";
import ShopList from "./component/shoplist";
const ShopPage = {
    async render() {
        return /*html*/ `
        <div id="search-container">
        ${Search.render()}
        </div>
            <div class="main-content-wrapper d-flex clearfix">
                ${NavBar.render()}
                <header>
                    ${Heading.render()}
                </header>
                ${ShopSideBar.render()}
                ${await ShopList.render()}
            </div>
            ${NewsLetter.render()}
            ${Footer.render()}
        `;
    },
    afterRender() {
        let params = window.location.pathname;
        console.log(params);
        axios({
            url: "https://brybdp.sse.codesandbox.io/menus",
            method: "GET",
            responseType: "json",
        }).then((res)=> {
            showData(res.data);
        }).catch((err)=>{
            console.log(err);
        });
        function showData(response) {
            const list = document.querySelector("#menu-list");
            list.innerHTML = response.map((item)=> /*html*/ {
                if(params.search((item.title).toLowerCase))
                    return /*html*/`<li class='active'><a href="${item.url}">${item.title}</a></li>`;
                else return /*html*/`<li><a href="${item.url}">${item.title}</a></li>`;  
            }).join("");
        }
        const btnAddTocart = document.querySelectorAll(".btn-add-cart");
        btnAddTocart.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener("click", async ()=>{
                const {data} = await get(id);
                addToCart({...data, quantity: 1}, function(){
                    toastr.success("Add to cart successfully!");
                });
                reRender(ShopPage, "#app");
            });
        });
        axios({
            url: "https://brybdp.sse.codesandbox.io//catePros",
            method: "GET",
            responseType: "json",
        }).then((res)=> {
            document.querySelector("#catelist").innerHTML = res.data.map((item, index) => {
                if (index == 0) 
                    return /*html*/ `
                    <li class="cateitem active"><a href="#">${item.name}</a></li>
                `;
                else 
                    return /*html*/ `
                    <li class="cateitem"><a href="#">${item.name}</a></li>
                `;
            }).join("");
        }).catch((error)=> {
            console.log(error);
        });
        $(".slider-range-price").each(function () {
            var min = jQuery(this).data("min");
            var max = jQuery(this).data("max");
            var unit = jQuery(this).data("unit");
            var value_min = jQuery(this).data("value-min");
            var value_max = jQuery(this).data("value-max");
            var label_result = jQuery(this).data("label-result");
            var t = $(this);
            $(this).slider({
                range: true,
                min: min,
                max: max,
                values: [value_min, value_max],
                slide: function (event, ui) {
                    var result = label_result + " " + unit + ui.values[0] + " - " + unit + ui.values[1];
                    t.closest(".slider-range").find(".range-price").html(result);
                }
            });
        });
        var amadoSearch = $(".search-nav");
        var searchClose = $(".search-close");

        amadoSearch.on("click", function () {
            $("#app").toggleClass("search-wrapper-on");
        });

        searchClose.on("click", function () {
            $("#app").removeClass("search-wrapper-on");
        });
        var amadoMobNav = $(".amado-navbar-toggler");
        var navClose = $(".nav-close");

        amadoMobNav.on("click", function () {
            $(".header-area").toggleClass("bp-xs-on");
        });

        navClose.on("click", function () {
            $(".header-area").removeClass("bp-xs-on");
        });
        if(localStorage.getItem("user")) {
            const email = document.querySelector("#emailname");
            const logout = document.querySelector("#logout");
            const avatar = document.querySelector("#avatarUser");
            email.innerHTML = JSON.parse(localStorage.getItem("user")).email;
            avatar.src = JSON.parse(localStorage.getItem("user")).avatar;
            logout.addEventListener("click", function(){
                localStorage.removeItem("user");
                reRender(Heading,"header");
            });
        }
    }

};
export default ShopPage;