import Link from "next/link"

const CollectionSection = () => {
  return (
    <section className="collection-section">
      <div className="container-fluid">
        <div className="sec-title wow slideInUp">
          <h2>new collection</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus leo sit amet lorem egestas iaculis. Donec
            nibh enim, pharetra vel turpis
          </p>
        </div>
        <div className="swiper-container swiper2 product-categories v2">
          <div className="swiper-wrapper">
            {/* Repeat this block for each product */}
            {Array(30)
              .fill(0)
              .map((_, index) => (
                <div className="swiper-slide" key={index}>
                  <div className="product-cat">
                    <div className="product-img">
                      <img src="https://placehold.co/289x392" alt="" />
                      <span className="pro-category">new</span>
                    </div>
                    <div className="product-hover-info">
                      <div className="product-hover-head">
                        <ul className="pt-links">
                          <li>new</li>
                          <li>sales</li>
                        </ul>
                        <a href="#" title="" className="fvrt-product">
                          <img src="/images/icons/heart.svg" alt="" />
                        </a>
                      </div>
                      <div className="product-info-hover">
                        <h3>
                          <Link href="/shop-single" title="">
                            Casual Jacket
                          </Link>
                        </h3>
                        <span>Loues Vuitto</span>
                        <div className="pricee">
                          <span>$25.45</span>
                        </div>
                        <ul className="pro-colors">
                          <li className="clr1"></li>
                          <li className="clr2"></li>
                          <li className="clr3"></li>
                          <li className="clr4"></li>
                        </ul>
                        <ul className="variations">
                          <li>s</li>
                          <li>m</li>
                          <li>l</li>
                        </ul>
                        <ul className="pro-buttons">
                          <li>
                            <a href="#" title="" className="theme-btn">
                              quick add
                            </a>
                          </li>
                          <li>
                            <a href="#" title="" className="theme-btn quick-view-btn">
                              quick view
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3>
                        <Link href="/shop-single" title="">
                          Casual Jacket
                        </Link>
                      </h3>
                      <span className="product-price">$25.45</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* scrollbar */}
          <div className="swiper-scrollbar v2">
            <span className="swiper-scrollbar-drag">
              <span className="drag-inner">DISCOVER MORE</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionSection

