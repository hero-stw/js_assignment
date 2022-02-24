import axios from "axios";

const Search = {
    render() {
        return /*html*/ `
        <div class="search-wrapper section-padding-100 overflow-hidden">
            <div class="search-close">
            <i class="fa fa-close" aria-hidden="true"></i>
            </div>
            <div class="container">
            <div class="row">
                <div class="col-12">
                <div class="search-content">
                    <form action="#" method="get">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Type your keyword..."
                    />
                    <button type="submit">
                        <img src="../../static/img/core-img/search.png" alt="" />
                    </button>
                    </form>
                    <ul id="search-result" class="flex gap-[1rem] items-center space-evenly overflow-x-scroll">
                        
                    </ul>
                </div>

                </div>
            </div>
            </div>
        </div>
        
        `;
    },
    afterRender() {
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
    }
};
export default Search;