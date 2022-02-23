import Footer from "./component/Footer";
import NavBar from "./component/NavMobile";
import NewsLetter from "./component/NewsLetter";
import Search from "./component/Search";
import { countTotal, reRender } from "../../utils/api/interface";
import { decreaseQuantity, increaseQuantity, removeItemInCart } from "../../utils/crud/cart";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Heading from "./component/Header";
import $ from "jquery";
const CartPage = {
    render() {
        let cart = [];
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        return /*html*/ `
        <div id="search-container">
        ${Search.render()}
        </div>
          <div class="main-content-wrapper d-flex clearfix">
            ${NavBar.render()}
            ${Heading.render()}
            <div class="cart-table-area section-padding-100">
              <div class="container-fluid">
                  <div class="row">
                      <div class="col-12 col-lg-8">
                          <div class="cart-title mt-50">
                              <h2>Shopping Cart</h2>
                          </div>

                          <div class="cart-table clearfix">
                              <table class="table table-responsive">
                                  <thead>
                                      <tr>
                                          <th colspan="2">Name</th>
                                          <th>Price</th>
                                          <th>Quantity</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  ${cart.map(item => {
        if (item.quantity >= 1)
            return /*html*/`
                                        <tr>
                                            <td class="cart_product_img">
                                                <a href="#"><img src="${item.image}" alt="Product"></a>
                                            </td>
                                            <td class="cart_product_desc">
                                                <h5>${item.name}</h5>
                                            </td>
                                            <td class="price">
                                                <span>$<span id="price">${item.price}</span></span>
                                            </td>
                                            <td class="qty">
                                                <div class="qty-btn d-flex">
                                                    <p>Qty</p>
                                                    <div class="quantity">
                                                        <button data-id="${item.id}" class="qty-minus btn-decrease btn-change">-</button>
                                                        <input type="number" value="${item.quantity}" class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1"/>
                                                        <button data-id="${item.id}" class="qty-plus btn-increase btn-change">+</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        `;
    }).join("")}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                      <div class="col-12 col-lg-4">
                          <div class="cart-summary">
                              <h5>Cart Total</h5>
                              <ul class="summary-table">
                                  <li><span>subtotal:</span> <span id='subtotal'>$ ${countTotal()}</span></li>
                                  <!--<li><span>delivery:</span> <span>Free</span></li>-->
                                  <li><span>total:</span> <span id="total">$ ${countTotal()}</span></li>
                              </ul>
                              <div class="cart-btn mt-100">
                                  <a href="/checkout" id="btn-checkout" class="btn amado-btn w-100">Checkout</a>
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
    afterRender() {
        const btns = document.querySelectorAll(".btn-change");
        btns.forEach(btn => {
            const id = btn.dataset.id;
            console.log(id);
            btn.addEventListener("click", () => {
                if(btn.classList.contains("btn-increase")){
                    increaseQuantity(id, () => reRender(CartPage, "#app"));
                } else if(btn.classList.contains("btn-decrease")){
                    decreaseQuantity(id, () => reRender(CartPage, "#app"));
                } else {
                    removeItemInCart(id, () => {
                        reRender(CartPage, "#app");
                        toastr.success("Remove item successfully!");
                    });
                }
            });
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
export default CartPage;