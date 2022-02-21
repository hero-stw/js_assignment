import { get } from "../../utils/api/user";
import { update } from "../../utils/api/user";
import axios from "axios";
import AdminHeader from "./component/header";
import AdminSideBar from "./component/sidebar";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const AdminEditUser = {
    async render(id) {
        const { data } = await get(id);
        return /*html*/ `
            <div class="flex h-screen bg-gray-50 dark:bg-gray-900" :class="{ 'overflow-hidden': isSideMenuOpen}">
                ${AdminSideBar.render()}
                <div class="flex flex-col flex-1">
                    ${AdminHeader.render()}
                        <main class="h-full pb-16 overflow-y-auto">
                            <div class="container px-6 mx-auto grid">
                            <div class="relative px-4 py-[2rem] mb-8 mt-[3rem] bg-white rounded-lg shadow-md dark:bg-gray-800">
                                 <a href="/admin/dashboard" class="absolute top-[3rem] right-[3rem] z-[1000] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-product-modal">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            <div class="flex justify-between items-center relative w-full px-4 h-full md:h-auto">
                                <div class="relative">
                                    <div class="flex items-start justify-between p-[2rem] border-b rounded-t">
                                        <h3 class="text-xl font-semibold">Edit User</h3>
                                    </div>
                
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
                                                        required
                                                    />
                                                    </div>
                                                <div class="col-span-6 sm:col-span-3">
                                                    <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Role</label>
                                                        <select id="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                            <option value="1">Admin</option>
                                                            <option value="0">User</option>
                                                        </select>
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
                                                    required
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
                                                    placeholder = "${data.name ? data.name : "Please enter name!"}"
                                                    required
                                                />
                                                </div>
                                                <div class="col-span-6 sm:col-span-3">
                                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Product Thumb</label>
                                                        <input class=" block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="product_thumb" type="file">
                                                </div>
                                                <div class="col-span-full">
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
                                <div class="relative grid place-center p-[1rem]">
                                    <div class="relative image-frame max-w-[400px] max-h-[400px] overflow-hidden">
                                        <img
                                        id="previewImage"
                                        class="object-cover w-full h-full"
                                        src="${data.avatar}"
                                        alt=""
                                        loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                            </div>
            
                            </div>
                        </main>
                    </div>
            </div>
        `;
    },
    afterRender(id) {
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
                role: document.querySelector("#role").value,
                avatar: imgUploadedLink ? imgUploadedLink : imgPreview.src,
                password: document.querySelector("#pass").value,
                phone: document.querySelector("#phone").value,
                date : dateTime
            })
                .then((result) => {
                    console.log(result.data);
                    toastr.success("Edit user successfully");
                } )
                .catch((error) => console.log(error));
        });
    }
};
export default AdminEditUser;