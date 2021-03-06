import { getAll } from "../../../utils/api/product";
const ShopList = {
    async render() {
        const { data } = await getAll();
        return /*html*/ `
            <div class="amado_product_area section-padding-100">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-12">
                            <div class="product-topbar d-xl-flex align-items-end justify-content-between">
                                <div class="total-products">
                                    <p>Showing 1-8 0f 25</p>
                                        <div class="view d-flex">
                                            <a href="#"><i class="fa fa-th-large" aria-hidden="true"></i></a>
                                            <a href="#"><i class="fa fa-bars" aria-hidden="true"></i></a>
                                        </div> 
                                    
                                </div> 
                                
                                <div class="product-sorting d-flex">
                                    <div class="sort-by-date d-flex align-items-center mr-15">
                                        <p>Sort by</p>
                                        <form action="#" method="get">
                                            <select name="select" id="sortBydate">
                                                <option value="value">Date</option>
                                                <option value="value">Newest</option>
                                                <option value="value">Popular</option>
                                            </select>
                                        </form>
                                    </div>
                                    <div class="view-product d-flex align-items-center">
                                        <p>View</p>
                                        <form action="#" method="get">
                                            <select name="select" id="viewProduct">
                                                <option value="value">12</option>
                                                <option value="value">24</option>
                                                <option value="value">48</option>
                                                <option value="value">96</option>
                                            </select>
                                        </form>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        ${data
        .map(
            (pro) => /*html*/ `
                            <!-- Single Product Area -->
                            <div class="col-12 col-sm-6 col-md-12 col-xl-6">
                                
                                    <div class="single-product-wrapper">
                                        <!-- Product Image -->
                                        <div class="product-img">
                                            <img src="${pro.image}" alt="">
                                            <!-- Hover Thumb 
                                            <img class="hover-img" src="../../static/img/product-img/product2.jpg" alt=""> -->
                                        </div>

                                        <!-- Product Description -->
                                        <div class="product-description d-flex align-items-center justify-content-between">
                                            <!-- Product Meta Data -->
                                            <div class="product-meta-data">
                                                <div class="line"></div>
                                                <p class="product-price">$${pro.price}</p>
                                                <a href="products/${pro.id}">
                                                    <h6>${pro.name}</h6>
                                                </a>
                                            </div>
                                            
                                            <div class="ratings-cart text-right">
                                            <!--
                                                <div class="ratings">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                </div>-->
                                                <div class="cart">
                                                    <button data-id="${pro.id}" class="btn-add-cart" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="../../static/img/core-img/cart.png" alt=""></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                        `
        )
        .join("")}
                        
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <!-- Pagination -->
                            <nav aria-label="navigation">
                                <ul class="pagination justify-content-end mt-50">
                                    <li class="page-item active"><a class="page-link" href="#">01.</a></li>
                                    <li class="page-item"><a class="page-link" href="#">02.</a></li>
                                    <li class="page-item"><a class="page-link" href="#">03.</a></li>
                                    <li class="page-item"><a class="page-link" href="#">04.</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
    `;
    },
};
export default ShopList;