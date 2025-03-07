import Link from "next/link"

const QuickViewPopup = () => {
  return (
    <div className="shop-single-section popup-quick-view">
      <div className="shop-product-single">
        <a href="#" title="" className="close-popup">
          <img src="/images/close2.png" alt="" />
        </a>
        <div className="shop-product-main-image">
          <span className="pr-bar">new</span>
          <div className="cart-product-large-slider">
            <div className="cart-product-large-image">
              <img src="https://placehold.co/679x1019" alt="" />
            </div>
            <div className="cart-product-large-image">
              <img src="https://placehold.co/679x1019" alt="" />
            </div>
            <div className="cart-product-large-image">
              <img src="https://placehold.co/679x1019" alt="" />
            </div>
          </div>
        </div>
        <div className="shop-product-single-info">
          <h3>
            <Link href="/shop-single">Studiofit Light Grey Hooded Jacket</Link>
          </h3>
          <div className="prod-ratings">
            <ul className="ratings">
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
            </ul>
            <span>4.5</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus leo sit amet lorem egestas iaculis. Donec
            nibh enim, pharetra vel turpis non, vulputate luctus ex.{" "}
          </p>
          <div className="price">
            <span>$25.45</span>
            <del>$35.00</del>
          </div>
          <div className="size-colors">
            <div className="product-size">
              <span>Size</span>
              <a href="#" title="">
                size guide
              </a>
              <ul className="size-list">
                <li className="active">l</li>
                <li>m</li>
                <li>s</li>
                <li>xl</li>
                <li>xll</li>
              </ul>
            </div>
            <div className="product-colors">
              <span>color</span>
              <ul className="colors-list">
                <li className="active">
                  <span className="clr1"></span>
                </li>
                <li>
                  <span className="clr2"></span>
                </li>
                <li>
                  <span className="clr3"></span>
                </li>
                <li>
                  <span className="clr4"></span>
                </li>
                <li>
                  <span className="clr5"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="cart-items-add">
            <div className="quantity">
              <button className="plus-btn" type="button" name="button">
                <i className="fa fa-plus"></i>
              </button>
              <input type="text" name="name" value="1" aria-autocomplete="list" />
              <button className="minus-btn" type="button" name="button">
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <Link href="/shop-single" className="theme-btn">
              buy now
            </Link>
            <a href="#" title="" className="theme-btn">
              add to cart
            </a>
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
          <div className="promo">
            <img src="/images/vt.png" alt="" />
            50% off Studiofit Light Grey Hooded Jacket code FGLPW245
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewPopup

