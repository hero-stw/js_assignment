import { get } from "../../utils/api/product";
import Footer from "./component/Footer";
import NavBar from "./component/NavMobile";
import NewsLetter from "./component/NewsLetter";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { addToCart } from "../../utils/crud/cart";
import { reRender } from "../../utils/api/interface";
import Heading from "./component/Header";
import Search from "./component/Search";
import $ from "jquery";

const ProductDetail = {
    async render(id) {
        const {data} = await get(id);
        console.log(data);
        return /*html*/ `
        <div id="search-container">
        ${Search.render()}
        </div>
        <div class="main-content-wrapper d-flex clearfix">
            ${NavBar.render()}
            <header>
                ${Heading.render()}
            </header>
            <div class="single-product-area section-padding-100 clearfix">
            <div class="container-fluid">
                <!--
                <div class="row">
                    <div class="col-12">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mt-50">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Furniture</a></li>
                                <li class="breadcrumb-item"><a href="#">Chairs</a></li>
                                <li class="breadcrumb-item active" aria-current="page">white modern chair</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                -->
                <div class="row">
                    <div class="col-12 col-lg-7">
                        <div class="single_product_thumb">
                            <div id="product_details_slider" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators" id="image-list">
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <a class="gallery_img" href="${data.image}">
                                            <img class="d-block w-100" src="${data.image}" alt="First slide">
                                        </a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-5">
                        <div class="single_product_desc">
                            <!-- Product Meta Data -->
                            <div class="product-meta-data">
                                <div class="line"></div>
                                <p class="product-price">${data.price}</p>
                                <a href="product-details.html">
                                    <h6>${data.name}</h6>
                                </a>
                                <!-- Ratings & Review -->
                                <div class="ratings-review mb-15 d-flex align-items-center justify-content-between">
                                    <div class="ratings">
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                    </div>
                                    <div class="review">
                                        <a href="#">Write A Review</a>
                                    </div>
                                </div>
                                <!-- Avaiable -->
                                <p class="avaibility"><i class="fa fa-circle"></i> In Stock</p>
                            </div>

                            <div class="short_overview my-5">
                                <p>${data.desc}</p>
                            </div>

                            <!-- Add to Cart Form -->
                            <div class="cart clearfix">
                                <div class="cart-btn d-flex mb-50">
                                    <p>Qty</p>
                                    <div class="quantity">
                                        <span class="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1) effect.value--;return false;"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
                                        <input type="number" class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1">
                                        <span class="qty-plus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i class="fa fa-caret-up" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                                <button  name="addtocart" class="btn amado-btn" id="btnAddTocart">Add to cart</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        ${NewsLetter.render()}
        ${Footer.render()}
        `;
    },
    afterRender(id) {
        console.log(id);
        const btnAddTocart = document.querySelector("#btnAddTocart");
        const inputValue = document.querySelector("#qty");
        btnAddTocart.addEventListener("click", async() => {
            const {data} = await get(id);
            console.log(data);
            addToCart({...data, quantity: inputValue.value ? +inputValue.value : 1}, function(){
                toastr.success("Add to cart successfully!");
            });
            reRender(ProductDetail, "#app");
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
        $(document).ready(function () {
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
        });    
    }
};
export default ProductDetail;