import { get } from "../../utils/api/user";
import { update } from "../../utils/api/user";
import Footer from "./component/Footer";
import NavBar from "./component/NavMobile";
import NewsLetter from "./component/Newsletter";
import { countTotal } from "../../utils/api/interface";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";
import { reRender } from "../../utils/api/interface";
import Heading from "./component/Header";
import $ from "jquery";
import Search from "./component/Search";
const AccountPage = {
    async render() {
        let id = JSON.parse(localStorage.getItem("user")).id;
        const {data} = await get(id);
        return /*html*/ `
        <div id="search-container">
        ${Search.render()}
        </div>
        <div class="main-content-wrapper d-flex clearfix">
          ${NavBar.render()}
          <header>
            ${Heading.render()}
          </header>
        <div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 section-padding-100">
    
            <!--Main Col-->
            <div id="profile" class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
            
        
                <div class="p-4 md:p-12 text-center lg:text-left">
                    <!-- Image for mobile view-->
                    <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style=""></div>
                    
                    <h1 class="text-3xl font-bold pt-8 lg:pt-0">${data.name}</h1>
                    <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                    <form id="form-edit-pro" method="POST">
                                        <div class="p-6 space-y-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <div class="col-span-6 sm:col-span-3">
                                                    <label
                                                        for="user-name"
                                                        class="text-sm font-medium text-gray-900 block mb-2"
                                                        >Username/Email</label
                                                    >
                                                    <input
                                                        type="text"
                                                        name="user-name"
                                                        id="user-name"
                                                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                        value = "${data.username}"
                                                    />
                                                    </div>

                                                <div class="col-span-6 sm:col-span-3">
                                                <label
                                                    for="brand"
                                                    class="text-sm font-medium text-gray-900 block mb-2"
                                                    >Password</label
                                                >
                                                <input
                                                    type="password"
                                                    name="brand"
                                                    id="pass"
                                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                    value = "${data.password}"
                                                    required=""
                                                />
                                                </div>
                                                <div class="col-span-6 sm:col-span-3">
                                                <label
                                                    for="price"
                                                    class="text-sm font-medium text-gray-900 block mb-2"
                                                    >Phone</label
                                                >
                                                <input
                                                    type="text"
                                                    name="price"
                                                    id="phone"
                                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                    placeholder = "${data.phone ? data.phone : "Please enter phone number!"}"
                                                    value = "${data.phone ? data.phone : "Please enter phone number!"}"
                                                />
                                                </div>
                                                <div class="col-span-6 sm:col-span-3">
                                                <label
                                                    for="nameU"
                                                    class="text-sm font-medium text-gray-900 block mb-2"
                                                    >Name</label
                                                >
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="nameU"
                                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                    value = "${data.name ? data.name : "Please enter name!"}"
                                                    placeholder = "${data.name ? data.name : "Please enter name!"}"
                                                />
                                                </div>
                                                <div class="col-span-6 sm:col-span-3">
                                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Product Thumb</label>
                                                        <input class=" block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="product_thumb" type="file">
                                                </div>
                                                <div class="col-span-6 sm:col-span-3">
                                                    <a href="/account/orders" class="text-sm font-medium text-gray-900 block mb-2"
                                                        >Your Orders</a>
                                                </div>
                                            </div>
                                            
                                        </div>
                
                                        <div class="p-6 border-t border-gray-200 rounded-b">
                                            <button
                                            class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                            Update
                                            </button>
                                        </div>
                                    </form>
                </div>
            </div>
            
            <!--Img Col-->
            <div class="w-full lg:w-2/5">
                <img id="previewImage" src="${data.avatar}" class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block">
            </div>
        
        </div>
        </div>
        ${NewsLetter.render()}
        ${Footer.render()}
        `;
    },
    afterRender() {
        let id = JSON.parse(localStorage.getItem("user")).id;
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
        const formEdit = document.querySelector("#form-edit-pro");
        const imgPost = document.querySelector("#product_thumb");
        const imgPreview = document.querySelector("#previewImage");
        let imgUploadedLink = "";

        imgPost.addEventListener("change", (e) => {
            imgPreview.src = URL.createObjectURL(imgPost.files[0]);
        });
        formEdit.addEventListener("submit", async (e) => {
            e.preventDefault();
            const file = imgPost.files[0];
            if(file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "fckljd3m");
                const {data} = await axios({
                    url: "https://api.cloudinary.com/v1_1/ecma-assignment/image/upload",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-formendcoded",
                    },
                    data: formData,
                });
                imgUploadedLink = data.url;
            }
            var today = new Date();
            var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+" "+time;
            update({
                id, 
                username: document.querySelector("#user-name").value,
                email: document.querySelector("#user-name").value,
                name: document.querySelector("#nameU").value,
                avatar: imgUploadedLink ? imgUploadedLink : imgPreview.src,
                password: document.querySelector("#pass").value,
                phone: document.querySelector("#phone").value,
                date : dateTime
            })
                .then((result) => {
                    console.log(result.data);
                    toastr.success("Edit information successfully");
                    localStorage.setItem("user", JSON.stringify(result.data));
                    reRender(Heading,"header");
                } )
                .catch((error) => console.log(error));
        });
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
export default AccountPage;