import NavDT from "./NavDesktop";
import { countCart, reRender } from "../../../utils/api/interface";
const Heading = { 
    render() {
        return /*html*/ `
            <div class="header-area clearfix">
                <!-- Close Icon -->
                <div class="nav-close">
                <i class="fa fa-close" aria-hidden="true"></i>
                </div>
                <!-- Logo -->
                <div class="logo">
                <a href="index.html"><img src="https://res.cloudinary.com/ecma-assignment/image/upload/v1645423995/logo_qabqno.png" alt="" /></a>
                </div>
                <!-- Amado Nav -->
                ${NavDT.render()}
                
                ${localStorage.getItem("user") ? /*html*/`
                <div x-data="{ open: false }" class="w-64 flex justify-left items-center mb-[100px] mt-[3rem]">
                    <div @click="open = !open" class="relative border-b-4 border-transparent py-3" :class="{'transform transition duration-300 ': open}" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100">
                        <div class="flex justify-center items-center space-x-3 cursor-pointer">
                        <div class="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                            <img id="avatarUser" src="${JSON.parse(localStorage.getItem("user")).avatar}" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="font-semibold dark:text-white text-gray-900 text-sm">
                            <div class="cursor-pointer" id="emailname">${JSON.parse(localStorage.getItem("user")).name}</div>
                        </div>
                        </div>
                        <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                        <ul class="space-y-3 dark:text-white">
                            ${JSON.parse(localStorage.getItem("user")).role == 1 ? /*html*/`
                                <li class="font-medium">
                                    <a href="/admin/dashboard/" class="flex items-center text-sm transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                        <div class="mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                        </svg>                                    
                                        </div>
                                        Dashboard
                                    </a>
                                </li>
                                <hr class="dark:border-gray-700">
                            ` 
        : ""}
                            
                            <li class="font-medium">
                                <a href="/account" class="flex items-center text-sm transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                    <div class="mr-3">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    Account
                                </a>
                            </li>
                            <hr class="dark:border-gray-700">
                            <li class="font-medium">
                            <button id="logout" class="flex items-center text-sm transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600">
                                <div class="mr-3 text-red-600">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                </div>
                                Logout
                            </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>    
                `: /*html*/`
                    <!-- Button Group -->
                    <div class="amado-btn-group mt-30 mb-0">
                    <a href="/signin" class="block text-center text-[1.2rem] py-[1rem] bg-gray-500 text-white min-w-165 w-full mb-15 ">Signin</a>
                    </div>
                    <div class="amado-btn-group mb-100">
                        <a href="/signup" class="w-full btn amado-btn mb-15 ">Signup</a>
                    </div>
                `}
                
                <!-- Cart Menu -->
                <div class="cart-fav-search mb-100">
                <a href="/cart" class="cart-nav"
                    ><img src="https://res.cloudinary.com/ecma-assignment/image/upload/v1645423995/cart_xj4wyo.png" alt="" /> Cart <span>(${countCart()})</span></a
                >
                
                <!--
                <a href="#" class="fav-nav"
                    ><img src="../../static/img/core-img/favorites.png" alt="" /> Favourite</a
                >-->
                <a class="search-nav" id="search_nav"
                    ><img src="https://res.cloudinary.com/ecma-assignment/image/upload/v1645423996/search_hzvopo.png" alt="" /> Search</a>
                </div>
                <!-- Social Button -->
                <div class="social-info d-flex justify-content-between">
                <a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                </div>
            </div>
        `;
    },
    afterRender() {
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
      }
};
export default Heading;