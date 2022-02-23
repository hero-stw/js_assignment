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
    const amadoSearch = document.querySelector("#search_nav");
    amadoSearch.addEventListener("click", function () {
      document
        .querySelector("#search-container")
        .classList.toggle("search-wrapper-on");
    });
    const searchClose = document.querySelector(".search-close");
    searchClose.addEventListener("click", function () {
      document
        .querySelector("#search-container")
        .classList.remove("search-wrapper-on");
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
    // Search
    var searchInput = document.querySelector("#search");
    var searchRes = document.querySelector("#search-result");
    searchInput.addEventListener("keyup", () => {
      axios({
        url: "http://localhost:3500/products?q=" + searchInput.value,
        method: "GET",
        responseType: "json",
      })
        .then((res) => {
          searchRes.innerHTML = res.data
            .map((item) => {
              return /*html*/ `
            <li class="search-res-item pt-[2rem] max-w-[300px] min-w-[300px]">
              <a href="/products/${item.id}" class="overflow-hidden flex items-center gap-[1rem]">
                <img src="${item.image}" alt="" class="search-res-thumb w-[100px] h-[100px] object-cover">
                <div class="text-left">
                  <h4 class="title">${item.name}</h4>
                  <p class="search-price">$${item.price}</p>
                </div>
              </a>
            </li>
            `;
            })
            .join("");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
export default HomePage;
