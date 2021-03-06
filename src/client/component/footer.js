const Footer = {
    render() {
        return /*html */ `
        <footer class="footer_area clearfix">
            <div class="container">
            <div class="row align-items-center">
                <div class="col-12 col-lg-4">
                <div class="single_widget_area">
                    <!-- Logo -->
                    <div class="footer-logo mr-50">
                    <a href="index.html"
                        ><img src="../../static/img/core-img/logo2.png" alt=""
                    /></a>
                    </div>
                    <p class="copywrite">
                    Copyright &copy;
                    <script>
                        document.write(new Date().getFullYear());
                    </script>
                    All rights reserved | This template is made by HeroPham with
                    love<i class="fa fa-heart-o" aria-hidden="true"></i>
                    </p>
                </div>
                </div>
                <div class="col-12 col-lg-8">
                <div class="single_widget_area">
                    <!-- Footer Menu -->
                    <div class="footer_menu">
                    <nav class="navbar navbar-expand-lg justify-content-end">
                        <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#footerNavContent"
                        aria-controls="footerNavContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <i class="fa fa-bars"></i>
                        </button>
                        <div class="collapse navbar-collapse" id="footerNavContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                            <a class="nav-link" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="shop.html">Shop</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="product-details.html"
                                >Product</a
                            >
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="cart.html">Cart</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="checkout.html">Checkout</a>
                            </li>
                        </ul>
                        </div>
                    </nav>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </footer>
        `;
    }
};
export default Footer;