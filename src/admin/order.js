import axios from "axios";
import { remove } from "../../utils/api/product";
import { update } from "../../utils/api/order";
import { reRender } from "../../utils/api/interface";
import AdminHeader from "./component/header";
import AdminSideBar from "./component/sidebar";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Products from "./index";

const OrderListAdmin = {
  render() {
    return /*html*/ `
        <div class="flex h-screen bg-gray-50 dark:bg-gray-900" :class="{ 'overflow-hidden': isSideMenuOpen}">
            ${AdminSideBar.render()}
            <div class="flex flex-col flex-1">
                ${AdminHeader.render()}
                
                <main class="h-full pb-16 overflow-y-auto">
                <div class="container px-6 mx-auto grid">
                        <div class="flex justify-between">
                            <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                Orders List
                            </h2>
                            
                        </div>
                        <div class="w-full overflow-hidden rounded-lg shadow-xs">
                            <div class="w-full overflow-x-auto">
                                <table class="w-full whitespace-no-wrap">
                                    <thead>
                                    <tr
                                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                    >
                                        <th class="px-4 py-3 ">Date</th>
                                        <th class="px-4 py-3 text-left">Order ID</th>
                                        <th class="px-4 py-3 text-center">Total</th>
                                        <th class="px-4 py-3 text-center">Status</th>
                                        <th class="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" id="order-list">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!--Pagination
                        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                            <span class="flex items-center col-span-3">
                            Showing 21-30 of 100
                            </span>
                            <span class="col-span-2"></span>
                            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul class="inline-flex items-center">
                                <li>
                                    <button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                                    <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                    </svg>
                                    </button>
                                </li>
                                <li>
                                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                    1
                                    </button>
                                </li>
                                <li>
                                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                    2
                                    </button>
                                </li>
                                <li>
                                    <button class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                                    3
                                    </button>
                                </li>
                                <li>
                                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                    4
                                    </button>
                                </li>
                                <li>
                                    <span class="px-3 py-1">...</span>
                                </li>
                                <li>
                                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                    8
                                    </button>
                                </li>
                                <li>
                                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                    9
                                    </button>
                                </li>
                                <li>
                                    <button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                                    <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                    </svg>
                                    </button>
                                </li>
                                </ul>
                            </nav>
                            </span>
                        </div>-->
                    </div>
                </main>      
            </div>
        </div>
        `;
  },
  afterRender() {
    // Get product
    let params = new URLSearchParams(document.location.search);
    let page = params.get("page");
    let per_page = params.get("per_page");
    console.log(page);
    console.log(per_page);
    axios({
      url: "http://localhost:3500/orders?_expand=orderDetail",
      method: "GET",
      responseType: "json",
    })
      .then((res) => {
        showData(res.data);
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
                        <span>${item.orderDetailId}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex items-center justify-center">
                        <span>${item.total}</span>                    
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <select data-id="${item.id}" name="" class="${
            item.status === "Pending"
              ? "bg-orange-200 text-orange-600"
              : item.status === "In Progress"
              ? "bg-yellow-200 text-yellow-600"
              : "bg-green-200 text-green-600"
          } px-3 text-xs py-[0.5rem] status" value="${item.status}">
                        <option value="Pending" ${
                          item.status === "Pending" ? "selected" : ""
                        }>Pending</option>
                        <option value="In Progress" ${
                          item.status === "In Progress" ? "selected" : ""
                        }>In Progress</option>
                        <option value="Done" ${
                          item.status === "Done" ? "selected" : ""
                        }>Done</option>
                    </select>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                        <button class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 open-invoice">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <button class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 btn-delete">
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
      // Change Status
      const status = document.querySelectorAll(".status");
      status.forEach((stat) => {
        const id = stat.dataset.id;
        stat.addEventListener("change", () => {
          console.log(stat.value);
          const confirm = window.confirm(
            "You want to change this order status?"
          );
          if (confirm) {
            update({
              id,
              status: stat.value,
            });
            reRender(OrderListAdmin, "#app");
          }
        });
      });

      // Delete Process
      const buttons = document.querySelectorAll(".btn-delete");
      buttons.forEach((btn) => {
        const id = btn.dataset.id;
        btn.addEventListener("click", () => {
          const confirm = window.confirm("You want to delete this product?");
          if (confirm) {
            remove(id).then(() => {
              toastr.success("Delete successfull");
              reRender(Products, "#app");
            });
          }
        });
      });
    };
  },
};
export default OrderListAdmin;
