import { getAll } from "../../utils/api/menu"
import AdminHeader from "./component/header";
import AdminSideBar from "./component/sidebar";

const MenuEdit = {
    async render() {
        const {data} = await getAll();
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
                                        <h3 class="text-xl font-semibold">Menu</h3>
                                        <div class="">
                                            <button
                                                href="#"
                                                class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                            >
                                                Add Menu
                                                <span class="ml-2" aria-hidden="true">+</span>
                                            </button>
                                        </div>
                                    </div>
                
                                    <form id="form-edit-pro" method="POST">
                                        <div class="p-6 space-y-6">
                                            <div class="grid grid-cols-6 gap-6">
                                            ${data.map(item => {
                                                return /*html*/`
                                                <div class="col-span-6 sm:col-span-3">
                                                    <label
                                                        for="user-name"
                                                        class="text-sm font-medium text-gray-900 block mb-2"
                                                        >Title</label
                                                    >
                                                    <input
                                                        type="text"
                                                        name="user-name"
                                                        id="user-name"
                                                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                        value = "${item.title}"
                                                    />
                                                </div>
                                                <div class="col-span-6 sm:col-span-3">
                                                    <label
                                                        for="user-name"
                                                        class="text-sm font-medium text-gray-900 block mb-2"
                                                        >URL</label
                                                    >
                                                    <input
                                                        type="text"
                                                        name="user-name"
                                                        id="user-name"
                                                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                        value = "${item.url}"
                                                    />
                                                </div>
                                                `
                                            }).join("")}
                                                
                                                
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
                            </div>
            
                            </div>
                        </main>
                    </div>
            </div>
        `
    }
}
export default MenuEdit;