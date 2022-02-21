import { get } from "../../utils/api/order"
import Footer from "./component/footer"
import Heading from "./component/header"
import NavBar from "./component/nav_mb"
import NewsLetter from "./component/newsletter"
import { countTotal } from "../../utils/api/interface"
import toastr from 'toastr';
import "toastr/build/toastr.min.css";
const OrderDetailClient = {
    async render(id) {
        const { data } = get(id);
        console.log(data);
        let cart = [];
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        return /*html*/ `
        <div class="main-content-wrapper d-flex clearfix">
          ${NavBar.render()}
          <header>
            ${Heading.render()}
          </header>
          <div class="cart-table-area section-padding-100">
            <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-8">
                <div class="checkout_details_area mt-50 clearfix">
                    <div class="cart-title">
                    <h2>Order Detail</h2>
                    <p>${data.date}</p>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="first_name"
                            value=""
                            placeholder="First Name"
                            required
                        />
                        </div>
                        <div class="col-md-6 mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="last_name"
                            value=""
                            placeholder="Last Name"
                            required
                        />
                        </div>
                        <div class="col-12 mb-3">
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="Email"
                            value=""
                        />
                        </div>
                        <div class="col-12 mb-3">
                        <input
                            type="text"
                            class="form-control mb-3"
                            id="street_address"
                            placeholder="Address"
                            value=""
                        />
                        </div>
                        <div class="col-12 mb-3">
                        <input
                            type="number"
                            class="form-control"
                            id="phone_number"
                            min="0"
                            placeholder="Phone No"
                            value=""
                        />
                        </div>
                        <div class="col-12 mb-3">
                        <textarea
                            name="comment"
                            class="form-control w-100"
                            id="comment"
                            cols="30"
                            rows="10"
                            placeholder="Notes"
                        ></textarea>
                        </div>

                        <div class="col-12">
                        </div>
                    </div>
                </div>
                </div>
                <div class="col-12 col-lg-4">
                <div class="cart-summary mt-[118px]">
                    <h5>Items List</h5>
                    <ul class="summary-table">
                        ${cart.map(item => {
                            if (item.quantity >=1)
                            return /*html*/ `
                                <li class="mb-[1rem]">
                                    <div>
                                        <p class="mb-[0.5rem] text-[#fbb710]">${item.name}<span class="text-[.8rem] mb-0 ml-[1rem]">$${item.price}</span></p>
                                        
                                    </div>

                                    <div> <span class="text-[14px]">x</span>
                                      ${item.quantity}
                                    </div>
                                </li>
                            `
                        }).join("")}
                    </ul>
                </div>
                <div class="cart-summary mt-[3rem]">
                    <h5>Cart Total</h5>
                    <ul class="summary-table">
                    <li class="mb-[24px]"><span>subtotal:</span> <span>$${countTotal()}</span></li>
                    <!--<li><span>delivery:</span> <span>Free</span></li> -->
                    <li class="mb-[24px]"><span>total:</span> <span>$${countTotal()}</span></li>
                    </ul>

                    <div class="payment-method">
                    <!-- Cash on delivery -->
                        <div class=" custom-checkbox mr-sm-2">
                        <input
                            type="radio"
                            class=""
                            id="cod"
                            name="payment"
                            value="cod"
                            checked
                        />
                        <label class="" for="cod"
                            >Cash on Delivery</label
                        >
                        </div>
                        <!-- Paypal -->
                        <div class="custom-checkbox mr-sm-2 flex items-center justify-between">
                            <div class="flex items-center gap-[5px] justify-center">
                                <input
                                    type="radio"
                                    class=""
                                    id="paypal"
                                    name="payment"
                                    value="card"
                                />
                                <label class="mb-0" for="paypal"
                                    >Paypal
                                </label>
                            </div>
                            <img class="ml-15" src="./static/img/core-img/paypal.png" alt=""/>
                        </div>
                    </div>

                    <div class="cart-btn mt-100">
                        <button id="btn-checkout" class="btn amado-btn w-100">Checkout</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        ${NewsLetter.render()}
        ${Footer.render()}
        `
    }
}
export default OrderDetailClient;