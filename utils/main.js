import Navigo from "navigo";
import Products from "../src/admin";
import AddProduct from "../src/admin/addproduct";
import AddUser from "../src/admin/adduser";
import CateAdmin from "../src/admin/cate";
import AdminEditPage from "../src/admin/editproduct";
import AdminEditUser from "../src/admin/edituser";
import MenuEdit from "../src/admin/menu";
import OrderListAdmin from "../src/admin/order";
import Users from "../src/admin/users";
import SignIn from "../src/auth/signin";
import SignUp from "../src/auth/signup";
import HomePage from "../src/client";
import AccountPage from "../src/client/account";
import CartPage from "../src/client/cart";
import CheckoutPage from "../src/client/checkout";
import ProductDetail from "../src/client/detail";
import OrderDetailClient from "../src/client/orderdetail";
import ClientOrder from "../src/client/orders";
import ShopPage from "../src/client/shop";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (content, id) => {
    document.getElementById("app").innerHTML = await content.render(id);
    if (content.afterRender) content.afterRender(id);
};
router.on("/admin/*", () => {}, {
    before(done, match) {
        if (JSON.parse(localStorage.getItem("user"))) {
            const role = JSON.parse(localStorage.getItem("user")).role;
            if (role == 1) {
                done();
            } else {
                document.location.href = "/";
            }
        } else {
            document.location.href = "/";
        }
    },
});
router.on("/account/*", () => {}, {
    before(done, match) {
        if (JSON.parse(localStorage.getItem("user"))) {
            done();
        } else {
            document.location.href = "/";
        }
    },
});
router.on({
    "/": () => {
        print(HomePage);
    },
    "/signin": () => {
        print(SignIn);
    },
    "/signup": () => {
        print(SignUp);
    },
    "/shop": () => {
        print(ShopPage);
    },
    "/products": () => {
        print(ProductDetail);
    },
    "/products/:id": (value) => {
        print(ProductDetail, value.data.id);
    },
    "/cart": () => {
        print(CartPage);
    },
    "/checkout": () => {
        print(CheckoutPage);
    },
    "/account": () => {
        print(AccountPage);
    },
    "/account/orders": () => {
        print(ClientOrder);
    },
    "admin/dashboard/": () => {
        print(Products);
    },
    "admin/dashboard/users": () => {
        print(Users);
    },
    "admin/dashboard/categories": () => {
        print(CateAdmin);
    },
    "admin/dashboard/addproduct": () => {
        print(AddProduct);
    },
    "admin/dashboard/adduser": () => {
        print(AddUser);
    },
    "admin/dashboard/menu": () => {
        print(MenuEdit);
    },
    "admin/dashboard/orders": () => {
        print(OrderListAdmin);
    },
    "/admin/products/:id/edit": ({ data }) => print(AdminEditPage, data.id),
    "/admin/users/:id/edit": ({ data }) => print(AdminEditUser, data.id),
});
router.resolve();