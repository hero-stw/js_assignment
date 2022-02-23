import AdminHeader from "./component/header";
import AdminSideBar from "./component/sidebar";
import axios from "axios";
import { update, remove, add } from "../../utils/api/category";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { reRender } from "../../utils/api/interface";
const CateAdmin = {
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
                                Category List
                            </h2>
                            <div class=" my-6">
                                <button
                                    class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    id="add-cate"
                                >
                                    Add new category
                                    <span class="ml-2" aria-hidden="true">+</span>
                                </button>
                            </div>
                        </div>
                        <div class="w-full overflow-hidden rounded-lg shadow-xs">
                            <div class="w-full overflow-x-auto">
                                <table class="w-full whitespace-no-wrap">
                                    <thead>
                                    <tr
                                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                    >
                                        <th class="px-4 py-3">Name</th>
                                        <th class="px-4 py-3">Status</th>
                                        <th class="px-4 py-3">Date</th>
                                        <th class="px-4 py-3">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" id="product-list">
                                        
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
    // let params = new URLSearchParams(document.location.search);
    // let page = params.get("page");
    // let per_page = params.get("per_page");
    // console.log(page);
    // console.log(per_page);
    axios({
      url: "http://localhost:3500/catePros",
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
      const list = document.querySelector("#product-list");
      list.innerHTML = response
        .map(
          (item) => /*html*/ `
                    <tr class="text-gray-700 dark:text-gray-400">             
                        <td class="px-4 py-3 text-sm flex items-center justify-between">
                        <input type="text" name="catename" class="catename" value="${
                          item.name
                        }" readonly/>
                        <button class="save-btn hidden font-semibold leading-tight text-white bg-black rounded-full p-[0.5rem]" data-id="${
                          item.id
                        }">Save</button>
                        </td>
                        <td class="px-4 py-3 text-xs">
                            <span
                                class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                            >
                            ${item.status == 1 ? "Available" : "Close"}    
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm">${item.date}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center space-x-4 text-sm">
                                <button
                                data-id=${item.id}
                                class="btn-delete flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete"
                                >
                                <svg
                                    class="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                    fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                    ></path>
                                </svg>
                                </button>
                            </div>
                        </td>
                </tr>
                
                `
        )
        .join("");
      const edits = document.querySelectorAll(".catename");
      const savebtn = document.querySelectorAll(".save-btn");
      edits.forEach((item) => {
        item.addEventListener("click", () => {
          item.removeAttribute("readonly");
          item.focus();
          item.nextElementSibling.classList.toggle("hidden");
        });
      });
      savebtn.forEach((item) => {
        item.addEventListener("click", () => {
          const id = item.dataset.id;
          update({
            id,
            name: item.previousElementSibling.value,
          })
            .then((result) => {
              console.log(result.data);
              toastr.success("Edit cate successfully");
              reRender(CateAdmin, "#app");
            })
            .catch((error) => console.log(error));
        });
      });
    }
    const btnAdd = document.querySelector("#add-cate");
    const edits = document.getElementsByTagName("tr");

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    btnAdd.addEventListener("click", function () {
      let template = /*html*/ `
              <tr class="text-gray-700 dark:text-gray-400">             
                      <td class="px-4 py-3 text-sm flex items-center justify-between">
                          <input type="text" name="catename" class="catename" value="" data-id="${edits.length}"placeholder="Enter Catename" />
                          <button class="save-btn hidden font-semibold leading-tight text-white bg-black rounded-full p-[0.5rem]" data-id="${edits.length}">Save</button>
                      </td>
                      <td class="px-4 py-3 text-xs">
                          <select id="status" class="text-green-700 bg-green-100 p-[0.5rem]">
                            <option value="1">Available</option>
                            <option value="0">Locked</option>
                          </select>
                      </td>
                      <td class="px-4 py-3 text-sm">${dateTime}</td>
                      <td class="px-4 py-3">
                          <div class="flex items-center space-x-4 text-sm">
                              <button
                              data-id=${edits.length}
                              class="btn-save flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                              aria-label="Delete"
                              >
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                              </button>
                          </div>
                      </td>
              </tr>
              `;
      document.querySelector("#product-list").innerHTML += template;
      let btnSave = document.querySelectorAll(".btn-save");
      btnSave.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          add({
            name: document.querySelector("input[data-id='" + id + "']").value,
            status: document.querySelector("#status").value,
            date: dateTime,
          })
            .then((result) => {
              console.log(result.data);
              toastr.success("Add cate successfully");
              reRender(CateAdmin, "#app");
            })
            .catch((error) => console.log(error));
        });
      });
    });
    const buttons = document.querySelectorAll(".btn-delete");
    buttons.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        const confirm = window.confirm("You want to delete this category");
        if (confirm) {
          remove(id).then(() => {
            toastr.success("Delete successfull");
            reRender(CateAdmin, "#app");
          });
        }
      });
    });
  },
};
export default CateAdmin;
