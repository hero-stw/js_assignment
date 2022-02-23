import Footer from "./component/footer";
import NavBar from "./component/nav_mb";
import NewsLetter from "./component/newsletter";
import ProductList from "./productlist";
import Search from "./component/search";
import Heading from "./component/header";
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
    let params = window.location.pathname;
    console.log(params);
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
      list.innerHTML = response
        .map((item) => /*html*/ {
          if (params.search(item.title.toLowerCase))
            return /*html*/ `<li class='active'><a href="${item.url}">${item.title}</a></li>`;
          else
            return /*html*/ `<li><a href="${item.url}">${item.title}</a></li>`;
        })
        .join("");
    }
    const amadoSearch = document.querySelector("#search_nav");
    amadoSearch.addEventListener("click", function () {
      document
        .querySelector("#search-container")
        .classList.toggle("search-wrapper-on");
    });
    const amadoMobNav = document.querySelector(".amado-navbar-toggler");
    const navClose = document.querySelector(".nav-close");
    amadoMobNav.addEventListener("click", function () {
      document.querySelector(".header-area").classList.toggle("bp-xs-on");
    });
    navClose.addEventListener("click", function () {
      document.querySelector(".header-area").classList.remove("bp-xs-on");
    });
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
  },
};
export default HomePage;
