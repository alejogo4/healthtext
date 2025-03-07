import Link from "next/link"

const TrendingSection = () => {
  return (
    <section className="trending-section">
      <div className="container-fluid">
        <div className="trending-products">
          <h1 className="tp-title wow fadeInUp">trending of the week</h1>
          <div className="row" data-masonry='{"percentPosition": true }'>
            <div className="col-lg-4 col-md-4">
              <div className="trending-product mb-150 wow fadeInLeft">
                <img src="https://placehold.co/562x425" alt="" />
                <div className="trending-product-hover">
                  <a href="#" title="" className="cart-product">
                    <img src="/images/heart.svg" alt="" />
                  </a>
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="pd-btns">
                    <li>
                      <a href="#" title="">
                        quick add
                      </a>
                    </li>
                    <li>
                      <a href="#" title="">
                        quick view
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="trending-product center wow fadeInUp" data-wow-delay="200ms">
                <img src="https://placehold.co/562x1000" alt="" />
                <div className="trending-product-hover">
                  <a href="#" title="" className="cart-product">
                    <img src="/images/heart.svg" alt="" />
                  </a>
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="pd-btns">
                    <li>
                      <a href="#" title="">
                        quick add
                      </a>
                    </li>
                    <li>
                      <a href="#" title="">
                        quick view
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="trending-product mb-150 wow fadeInRight" data-wow-delay="400ms">
                <img src="https://placehold.co/562x425" alt="" />
                <div className="trending-product-hover">
                  <a href="#" title="" className="cart-product">
                    <img src="/images/heart.svg" alt="" />
                  </a>
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="pd-btns">
                    <li>
                      <a href="#" title="">
                        quick add
                      </a>
                    </li>
                    <li>
                      <a href="#" title="">
                        quick view
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="trending-product wow fadeInUp" data-wow-delay="600ms">
                <img src="https://placehold.co/562x425" alt="" />
                <div className="trending-product-hover">
                  <a href="#" title="" className="cart-product">
                    <img src="/images/heart.svg" alt="" />
                  </a>
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="pd-btns">
                    <li>
                      <a href="#" title="">
                        quick add
                      </a>
                    </li>
                    <li>
                      <a href="#" title="">
                        quick view
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="trending-product wow fadeInUp" data-wow-delay="800ms">
                <img src="https://placehold.co/562x425" alt="" />
                <div className="trending-product-hover">
                  <a href="#" title="" className="cart-product">
                    <img src="/images/heart.svg" alt="" />
                  </a>
                  <h3>
                    <Link href="/shop-single" title="">
                      Casual Jacket
                    </Link>
                  </h3>
                  <span className="price">$25.45</span>
                  <ul className="pd-btns">
                    <li>
                      <a href="#" title="">
                        quick add
                      </a>
                    </li>
                    <li>
                      <a href="#" title="">
                        quick view
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrendingSection

