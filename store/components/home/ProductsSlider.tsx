import Link from "next/link"

const ProductsSlider = () => {
  return (
    <section className="products-slider-section">
      <div className="container-fluid">
        <div className="product-slider wow slideInUp">
          <div className="product-slide">
            <img src="https://placehold.co/1704x929" alt="" />
            <div className="product-card">
              <span>Deodorant</span>
              <h3>
                <Link href="/shop-single" title="">
                  Women's Perfume
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper lacus id libero porta blandit.{" "}
              </p>
              <div className="price">
                <span>$25.45</span>
                <del>$35.00</del>
              </div>
              <div className="cart-items-add">
                <div className="quantity">
                  <button className="plus-btn" type="button" name="button">
                    <i className="fa fa-plus"></i>
                  </button>
                  <input type="text" name="name" value="1" />
                  <button className="minus-btn" type="button" name="button">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <Link href="/shop-single" title="" className="theme-btn">
                  buy now
                </Link>
              </div>
            </div>
          </div>
          <div className="product-slide">
            <img src="https://placehold.co/1704x929" alt="" />
            <div className="product-card">
              <span>Deodorant</span>
              <h3>
                <Link href="/shop-single" title="">
                  Women's Perfume
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper lacus id libero porta blandit.{" "}
              </p>
              <div className="price">
                <span>$25.45</span>
                <del>$35.00</del>
              </div>
              <div className="cart-items-add">
                <div className="quantity">
                  <button className="plus-btn" type="button" name="button">
                    <i className="fa fa-plus"></i>
                  </button>
                  <input type="text" name="name" value="1" />
                  <button className="minus-btn" type="button" name="button">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <Link href="/shop-single" title="" className="theme-btn">
                  buy now
                </Link>
              </div>
            </div>
          </div>
          <div className="product-slide">
            <img src="https://placehold.co/1704x929" alt="" />
            <div className="product-card">
              <span>Deodorant</span>
              <h3>
                <Link href="/shop-single" title="">
                  Women's Perfume
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper lacus id libero porta blandit.{" "}
              </p>
              <div className="price">
                <span>$25.45</span>
                <del>$35.00</del>
              </div>
              <div className="cart-items-add">
                <div className="quantity">
                  <button className="plus-btn" type="button" name="button">
                    <i className="fa fa-plus"></i>
                  </button>
                  <input type="text" name="name" value="1" />
                  <button className="minus-btn" type="button" name="button">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <Link href="/shop-single" title="" className="theme-btn">
                  buy now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsSlider

