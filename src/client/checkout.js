import { countTotal } from "../../utils/api/interface";
import Footer from "./component/Footer";
import NavBar from "./component/NavMobile";
import NewsLetter from "./component/Newsletter";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { add, addOrderDetail } from "../../utils/api/order";
import Heading from "./component/Header";

const CheckoutPage = {
    render() {
        let cart = [];
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
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
                    <h2>Checkout</h2>
                    </div>

                    <form>
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
                    </form>
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
                            `;
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
                            <img class="ml-15" src="https://res.cloudinary.com/ecma-assignment/image/upload/v1645423995/paypal_mqejxk.png" alt=""/>
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
        `;
    },
    afterRender() {
        document.querySelector("#btn-checkout").addEventListener("click", (e)=> {
            e.preventDefault();
            var today = new Date();
            var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+" "+time;
            let cart = [];
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            addOrderDetail({
                item_list: cart,
                firstname : document.querySelector("#first_name").value,
                lastname : document.querySelector("#last_name").value,
                email : document.querySelector("#email").value,
                address : document.querySelector("#street_address").value,
                phone : document.querySelector("#phone_number").value,
                comment : document.querySelector("#comment").value,
                payment : document.querySelector("input[name=payment]:checked").value,
            }).then((res)=>{
                if(localStorage.getItem("user")) {
                    add({
                        userId: JSON.parse(localStorage.getItem("user")).id,
                        orderDetailId: res.data.id,
                        status: "Pending",
                        total: countTotal(),
                        date: dateTime
                    });
                } else {
                    add({
                        orderDetailId: res.data.id,
                        status: "Pending",
                        date: dateTime
                    });
                    // Add order billing email feature
                }
                toastr.success("Order successfully");
            })
                .catch((error) => console.log(error));
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
export default CheckoutPage;