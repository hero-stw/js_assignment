const Search = {
    render() {
        return /*html*/`
        <div class="search-wrapper section-padding-100">
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
                    <ul id="search-result">
                        
                    </ul>
                </div>

                </div>
            </div>
            </div>
        </div>
        
        `;
    },
};
export default Search;