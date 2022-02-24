import Footer from "./component/Footer";
import NavBar from "./component/NavMobile";
import NewsLetter from "./component/NewsLetter";
import axios from "axios";
import Heading from "./component/Header";
const ClientOrder = {
    render() {
        return /*html*/ `
        <div class="main-content-wrapper d-flex clearfix">
          ${NavBar.render()}
          <header>
            ${Heading.render()}
          </header>
          <div class="max-w-4xl w-full flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 section-padding-100">
            <div class="overflow-x-auto w-full">
                
                <div class="min-w-screen min-h-screen flex items-center justify-center font-sans overflow-hidden">
                    <div class="w-full lg:w-5/6">
                        <div class="rounded my-6">
                            <div class="rounded my-6 relative">
                                <h1 class="mb-[3rem] font-sans">Orders list</h1>
                                <a href="/account" class="absolute top-0 right-0 z-[1000] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-product-modal">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                            <table class="min-w-max w-full table-auto">
                                <thead>
                                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th class="py-3 px-6 text-left">Time</th>
                                        <th class="py-3 px-6 text-left">Order ID</th>
                                        <th class="py-3 px-6 text-center">Total</th>
                                        <th class="py-3 px-6 text-center">Status</th>
                                        <th class="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="text-gray-600 text-sm font-light" id="order-list">
                                </tbody>
                            </table>
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
        axios({
            url: "http://localhost:3500/orders?_expand=orderDetail",
            method: "GET",
            responseType: "json",
        })
            .then((res) => {
                showData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        function showData(response) {
            const list = document.querySelector("#order-list");

            list.innerHTML = response
                .map(
                    (item) => /*html*/ `
            <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left whitespace-nowrap">
                    <div class="flex items-center">
                        
                        <span class="font-medium">${item.date}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>AMD-${item.orderDetailId}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex items-center justify-center">
                        <span>${item.total}</span>                    
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                     <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">${
    item.status
}</span> 
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                        <button class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 open-invoice">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <button class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
            <tr class="dropdowntr hidden">
              <td colspan="5">
              <div class="max-w-2xl mx-auto py-0 md:py-16">
              <article class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
                <div class="md:rounded-b-md  bg-white">
                  <div class="p-9 border-b border-gray-200">
                    <div class="space-y-6">
                      <div class="flex justify-between items-top">
                        <div class="space-y-4">
                          <div>
                            <img class="h-6 object-cover mb-4" src="../../static/img/core-img/logo.png">
                            <p class="font-bold text-lg"> Invoice </p>
                            <p> Amando </p>
                          </div>    
                          <div>
                            <p class="font-medium text-sm text-gray-400"> Billed To </p>
                            <p> ${item.orderDetail.firstname} ${
    item.orderDetail.lastname
}</p>
                            <p> ${item.orderDetail.email} </p>
                            <p> ${item.orderDetail.phone} </p>
                          </div>
                        </div>
                        <div class="space-y-2">
                          <div>
                            <p class="font-medium text-sm text-gray-400"> Invoice Number </p>
                            <p> AMD-${item.orderDetailId} </p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-gray-400"> Invoice Date </p>
                            <p> ${item.date} </p>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="p-9 border-b border-gray-200">
                    <p class="font-medium text-sm text-gray-400"> Note </p>
                    <p class="text-sm"> ${item.orderDetail.comment} </p>
                  </div>
                  <table class="w-full divide-y divide-gray-200 text-sm">
                    <thead>
                      <tr>
                        <th scope="col" class="px-9 py-4 text-left font-semibold text-gray-400"> Item </th>
                        <th scope="col" class="py-3 text-left font-semibold text-gray-400">Qty</th>
                        <th scope="col" class="py-3 text-left font-semibold text-gray-400"> Price </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    ${item.orderDetail.item_list
        .map((pro) => {
            return /*html*/ `
                        <tr>
                            <td class="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                                <div>
                                    <p> ${pro.name} </p>
                                    <!-- <p class="text-sm text-gray-400"> Nuclear-armed ICBM </p> -->
                                </div>
                            </td>
                            <td class="whitespace-nowrap text-gray-600 truncate">${pro.quantity}</td>
                            <td class="whitespace-nowrap text-gray-600 truncate"> ${pro.price} </td>
                        </tr>
                        `;
        })
        .join("")}
                      
                      
                    </tbody>
                  </table>
                  <div class="p-9 border-b border-gray-200">
                    <div class="space-y-3">
                      <div class="flex justify-between">
                        <div>
                          <p class="text-gray-500 text-sm"> Total </p>
                        </div>
                        <p class="text-gray-500 text-sm"> $${item.total} </p>
                      </div>
                    </div>
                  </div>
                  <div class="p-9 border-b border-gray-200">
                    <div class="space-y-3">
                      <div class="flex justify-between">
                        <div>
                          <p class="font-bold text-black text-lg"> Amount Due </p>
                        </div>
                        <p class="font-bold text-black text-lg"> $${
    item.total
} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
              </td>
              
            </tr>
            
            `
                )
                .join("");
        }
        window.onload = () => {
            const btn = document.querySelectorAll(".open-invoice");
            const trdrop = document.querySelectorAll(".dropdowntr");
            btn.forEach((btn, index) => {
                btn.addEventListener("click", () => {
                    trdrop[index].classList.toggle("hidden");
                });
            });
        };
    },
};
export default ClientOrder;