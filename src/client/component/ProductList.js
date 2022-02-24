import { getAll } from "../../../utils/api/product";

const ProductList = {
    async render() {
        const { data } = await getAll();
        return /*html */ `
        <div class="products-catagories-area clearfix">
                <div class="amado-pro-catagory clearfix" id="product-list">   
                    ${data
        .map(
            (pro) => `
                        <div class="single-products-catagory clearfix">
                            <a href="products/${pro.id}">
                            <img src="${pro.image}" alt="" />
                            <div class="hover-content">
                                <div class="line"></div>
                                <p>From $${pro.price}</p>
                                <h4>${pro.name}</h4>
                            </div>
                            </a>
                        </div>
                    `
        )
        .join("")}
                </div>
            </div>
        `;
    },
};
export default ProductList;