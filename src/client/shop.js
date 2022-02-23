import Footer from "./component/Footer";
import NavBar from "./component/NavMobile";
import NewsLetter from "./component/NewsLetter";
import Search from "./component/Search";
import { get } from "../../utils/api/product";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { addToCart } from "../../utils/crud/cart";
import { reRender } from "../../utils/api/interface";
import $ from "jquery";
import axios from "axios";
import Heading from "./component/Header";
const ShopPage = {
  render() {
    return /*html*/ `
        <div id="search-container">
        ${Search.render()}
        </div>
            <div class="main-content-wrapper d-flex clearfix">
                ${NavBar.render()}
                <header>
                    ${Heading.render()}
                </header>
                <div class="shop_sidebar_area">
                    <div class="widget catagory mb-50">
                        <h6 class="widget-title mb-30">Catagories</h6>
                        <div class="catagories-menu">
                            <ul id="catelist">
                            </ul>
                        </div>
                    </div>
                    <!-- ##### Single Widget ##### -->
                    <div class="widget price mb-50">
                        <!-- Widget Title -->
                        <h6 class="widget-title mb-30">Price</h6>
                        <div class="widget-desc">
                            <div class="slider-range">
                                <div data-min="10" data-max="1000" data-unit="$" class="slider-range-price ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" data-value-min="10" data-value-max="1000" data-label-result="">
                                    <div class="ui-slider-range ui-widget-header ui-corner-all"></div>
                                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
                                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
                                </div>
                                <div class="range-price">$10 - $1000</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="amado_product_area section-padding-100">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-12">
                            <div class="product-topbar d-xl-flex align-items-end justify-content-between">
                                <div class="total-products">
                                    <p>Showing 1-8 0f 25</p>
                                        <div class="view d-flex">
                                            <a href="#"><i class="fa fa-th-large" aria-hidden="true"></i></a>
                                            <a href="#"><i class="fa fa-bars" aria-hidden="true"></i></a>
                                        </div> 
                                    
                                </div> 
                                
                                <div class="product-sorting d-flex">
                                    <div class="sort-by-date d-flex align-items-center mr-15">
                                        <p>Sort by</p>
                                        <form action="#" method="get">
                                            <select name="select" id="sortBydate">
                                                <option value="value">Date</option>
                                                <option value="value">Newest</option>
                                                <option value="value">Popular</option>
                                            </select>
                                        </form>
                                    </div>
                                    <div class="view-product d-flex align-items-center">
                                        <p>View</p>
                                        <form action="#" method="get">
                                            <select name="select" id="viewProduct">
                                                <option value="value">12</option>
                                                <option value="value">24</option>
                                                <option value="value">48</option>
                                                <option value="value">96</option>
                                            </select>
                                        </form>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div class="row" id="product-list">
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <!-- Pagination -->
                            <nav aria-label="navigation">
                                <ul class="pagination justify-content-end mt-50">
                                    <li class="page-item active"><a class="page-link" href="#">01.</a></li>
                                    <li class="page-item"><a class="page-link" href="#">02.</a></li>
                                    <li class="page-item"><a class="page-link" href="#">03.</a></li>
                                    <li class="page-item"><a class="page-link" href="#">04.</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            ${NewsLetter.render()}
            ${Footer.render()}
        `;
  },
  afterRender() {
    let params = window.location.pathname;
    console.log(params);
    axios({
      url: "http://localhost:3500/products",
      method: "GET",
      responseType: "json",
    })
      .then((res) => {
        showProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      url: "http://localhost:3500/menus",
      method: "GET",
      responseType: "json",
    })
      .then((res) => {
        showData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    function showData(response) {
      const list = document.querySelector("#menu-list");
      list.innerHTML = response
        .map((item) => /*html*/ {
          if (params.includes(item.title.toLowerCase))
            return /*html*/ `<li class='active'><a href="${item.url}">${item.title}</a></li>`;
          else
            return /*html*/ `<li><a href="${item.url}">${item.title}</a></li>`;
        })
        .join("");
    }
    function showProducts(response) {
      const list = document.querySelector("#product-list");
      list.innerHTML = response
        .map(
          (pro) => /*html*/ `
            <!-- Single Product Area -->
            <div class="col-12 col-sm-6 col-md-12 col-xl-6">
                    <div class="single-product-wrapper">
                        <!-- Product Image -->
                        <div class="product-img">
                            <img src="${pro.image}" alt="">
                            <!-- Hover Thumb 
                            <img class="hover-img" src="../../static/img/product-img/product2.jpg" alt=""> -->
                        </div>

                        <!-- Product Description -->
                        <div class="product-description d-flex align-items-center justify-content-between">
                            <!-- Product Meta Data -->
                            <div class="product-meta-data">
                                <div class="line"></div>
                                <p class="product-price">$${pro.price}</p>
                                <a href="products/${pro.id}">
                                    <h6>${pro.name}</h6>
                                </a>
                            </div>
                            
                            <div class="ratings-cart text-right">
                            <!--
                                <div class="ratings">
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                </div>-->
                                <div class="cart">
                                    <button data-id="${pro.id}" class="btn-add-cart" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="../../static/img/core-img/cart.png" alt=""></button>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        `
        )
        .join("");
    }
    const btnAddTocart = document.querySelectorAll(".btn-add-cart");
    btnAddTocart.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", async () => {
        const { data } = await get(id);
        addToCart({ ...data, quantity: 1 }, function () {
          toastr.success("Add to cart successfully!");
        });
        reRender(ShopPage, "#app");
      });
    });
    axios({
      url: " http://localhost:3500/catePros",
      method: "GET",
      responseType: "json",
    })
      .then((res) => {
        document.querySelector("#catelist").innerHTML = res.data
          .map((item, index) => {
            if (index == 0)
              return /*html*/ `
                    <li class="cateitem active"><a href="#">${item.name}</a></li>
                `;
            else
              return /*html*/ `
                    <li class="cateitem"><a href="#">${item.name}</a></li>
                `;
          })
          .join("");
          filter(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      function filter(response) {
        
      }
    if (localStorage.getItem("user")) {
      const email = document.querySelector("#emailname");
      const logout = document.querySelector("#logout");
      const avatar = document.querySelector("#avatarUser");
      email.innerHTML = JSON.parse(localStorage.getItem("user")).email;
      avatar.src = JSON.parse(localStorage.getItem("user")).avatar;
      logout.addEventListener("click", function () {
        localStorage.removeItem("user");
        reRender(Heading, "header");
      });
    }
    window.onload = function () {
      let cateitem = document.querySelectorAll(".cateitem");
      console.log(cateitem);
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
            var result =
              label_result +
              " " +
              unit +
              ui.values[0] +
              " - " +
              unit +
              ui.values[1];
            t.closest(".slider-range").find(".range-price").html(result);
          },
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
    };
  },
};
export default ShopPage;
