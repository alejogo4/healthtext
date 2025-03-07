import Link from "next/link"

const FeaturedProducts = () => {
  return (
    <section className="featured-products-section">
      <div className="container-fluid">
        <div className="sec-title wow fadeInUp">
          <h2>Featured Products</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus leo sit amet lorem egestas iaculis. Donec
            nibh enim, pharetra vel turpis
          </p>
        </div>
        <div className="featured-products row">
          <div className="col-lg-4 col-md-4">
            <div className="featured wow fadeInUp">
              <img src="https://placehold.co/562x822" alt="" />
              <div className="featured-hover">
                <span className="hvr"></span>
                <div className="hvr-content">
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="varies">
                    <li>S</li>
                    <li>m</li>
                    <li>l</li>
                  </ul>
                  <a href="#" title="" className="quick-add">
                    quick add
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="featured wow fadeInLeft" data-wow-delay="300ms">
              <img src="https://placehold.co/562x822" alt="" />
              <div className="featured-hover">
                <span className="hvr"></span>
                <div className="hvr-content">
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="varies">
                    <li>S</li>
                    <li>m</li>
                    <li>l</li>
                  </ul>
                  <a href="#" title="" className="quick-add">
                    quick add
                  </a>
                </div>
              </div>
              <div className="featured-hover v2">
                <span className="hvr"></span>
                <div className="hvr-content">
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="varies">
                    <li>S</li>
                    <li>m</li>
                    <li>l</li>
                  </ul>
                  <a href="#" title="" className="quick-add">
                    quick add
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="featured wow fadeInRight" data-wow-delay="500ms">
              <img src="https://placehold.co/562x822" alt="" />
              <div className="featured-hover">
                <span className="hvr"></span>
                <div className="hvr-content">
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="varies">
                    <li>S</li>
                    <li>m</li>
                    <li>l</li>
                  </ul>
                  <a href="#" title="" className="quick-add">
                    quick add
                  </a>
                </div>
              </div>
              <div className="featured-hover v2">
                <span className="hvr"></span>
                <div className="hvr-content">
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="varies">
                    <li>S</li>
                    <li>m</li>
                    <li>l</li>
                  </ul>
                  <a href="#" title="" className="quick-add">
                    quick add
                  </a>
                </div>
              </div>
              <div className="featured-hover v3">
                <span className="hvr"></span>
                <div className="hvr-content">
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="varies">
                    <li>S</li>
                    <li>m</li>
                    <li>l</li>
                  </ul>
                  <a href="#" title="" className="quick-add">
                    quick add
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

