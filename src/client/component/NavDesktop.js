import axios from "axios";

const NavDT = {
    render() {
        return /*html */ `
            <nav class="amado-nav">
                <ul id="menu-list">
                    <li class="active"><a href="/">Home</a></li>
                    <li><a href="/shop">Shop</a></li>
                </ul>
            </nav>
        `;
    },
};
export default NavDT;