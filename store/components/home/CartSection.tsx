import Link from "next/link"

const CartSection = () => {
  return (
    <section className="cart-section">
      <div className="container-fluid">
        <div className="cart-product">
          <div className="cart-product-slider-column">
            <div className="circle-container">
              <div className="circle delay1"></div>
              <div className="circle delay2"></div>
              <div className="circle delay3"></div>
              <div className="circle delay4"></div>
            </div>
            <div className="cart-product-large-slider">
              <div className="cart-product-large-image">
                <img src="/images/1.png" alt="" />
              </div>
              <div className="cart-product-large-image">
                <img src="/images/jacket1.png" alt="" />
              </div>
              <div className="cart-product-large-image">
                <img src="/images/jacket3.png" alt="" />
              </div>
            </div>
          </div>
          <div className="cart-product-content">
            <div className="cart-product-info wow fadeInUp">
              <h2>Studiofit Light Grey Hooded Jacket</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus leo sit amet lorem egestas iaculis.
                Donec nibh enim, pharetra vel turpis non, vulputate luctus ex. Phasellus pharetra ut dolor ac rutrum.
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
            <div className="cart-product-thumb-slider">
              <div className="cart-product-thumb">
                <img src="https://placehold.co/679x1019" alt="" />
              </div>
              <div className="cart-product-thumb">
                <img src="https://placehold.co/679x1019" alt="" />
              </div>
              <div className="cart-product-thumb">
                <img src="https://placehold.co/679x1019" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartSection

