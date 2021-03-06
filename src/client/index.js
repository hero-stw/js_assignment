import Footer from "./component/Footer";
import NavBar from "./component/NavMobile";
import NewsLetter from "./component/NewsLetter";
import ProductList from "./component/ProductList";
import Search from "./component/Search";
import Heading from "./component/Header";
import axios from "axios";
import { reRender } from "../../utils/api/interface";

const HomePage = {
    async render() {
        return /*html */ `
        <div id="search-container">
        ${Search.render()}
        </div>
         <div class="main-content-wrapper d-flex clearfix">
            ${NavBar.render()}
            <header>
            ${Heading.render()}
            </header>
            ${await ProductList.render()}
        </div>
         ${NewsLetter.render()}
         ${Footer.render()}
        `;
    },
    afterRender() {
        axios({
            url: "http://localhost:3500/menus",
            method: "GET",
            responseType: "json",
        })
            .then((res) => {
                showData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        function showData(response) {
            const list = document.querySelector("#menu-list");
            let params = window.location.pathname;
            list.innerHTML = response
                .map((item) => /*html*/ {
                    if (params.search(item.title.toLowerCase))
                        return /*html*/ `<li class='active'><a href="${item.url}">${item.title}</a></li>`;
                    else
                        return /*html*/ `<li><a href="${item.url}">${item.title}</a></li>`;
                })
                .join("");
        }
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
        Search.afterRender()
    },
};
export default HomePage;