const CartSidebar = () => {
  return (
    <div className="cart-sidebar">
      <div className="cart-sidebar-header">
        <h3>shopping cart</h3>
        <a href="#" title="" className="cls-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.6657 11.7242C12.926 11.9846 12.926 12.4067 12.6656 12.667C12.4052 12.9274 11.9831 12.9274 11.7228 12.667L7.99931 8.94285L4.27551 12.6666C4.01518 12.927 3.59304 12.927 3.33271 12.6666C3.07238 12.4063 3.07238 11.9842 3.33271 11.7238L7.05658 7.99998L3.33298 4.27573C3.07271 4.01535 3.07271 3.59325 3.33311 3.33292C3.59344 3.07259 4.01558 3.07263 4.27591 3.333L7.99944 7.05718L11.7233 3.33332C11.9836 3.07297 12.4057 3.07297 12.6661 3.33332C12.9264 3.59367 12.9264 4.01578 12.6661 4.27613L8.94211 8.00005L12.6657 11.7242Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
      <div className="cart-body">
        <ul className="cart-tabs">
          <li className="active">
            <a href="#" title="">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.3617 20.625H5.63672C3.36797 20.625 1.51172 18.7687 1.51172 16.5V16.3625L1.92422 5.3625C1.99297 3.09375 3.84922 1.375 6.04922 1.375H15.9492C18.1492 1.375 20.0055 3.09375 20.0742 5.3625L20.4867 16.3625C20.5555 17.4625 20.143 18.4937 19.3867 19.3188C18.6305 20.1438 17.5992 20.625 16.4992 20.625C16.4992 20.625 16.4305 20.625 16.3617 20.625ZM6.04922 2.75C4.53672 2.75 3.36797 3.91875 3.29922 5.3625L2.88672 16.5C2.88672 18.0125 4.12422 19.25 5.63672 19.25H16.4992C17.2555 19.25 17.943 18.9062 18.4242 18.3563C18.9055 17.8062 19.1805 17.1187 19.1805 16.3625L18.768 5.3625C18.6992 3.85 17.5305 2.75 16.018 2.75H6.04922Z"
                  fill="white"
                />
                <path
                  d="M11 9.625C8.31875 9.625 6.1875 7.49375 6.1875 4.8125C6.1875 4.4 6.4625 4.125 6.875 4.125C7.2875 4.125 7.5625 4.4 7.5625 4.8125C7.5625 6.7375 9.075 8.25 11 8.25C12.925 8.25 14.4375 6.7375 14.4375 4.8125C14.4375 4.4 14.7125 4.125 15.125 4.125C15.5375 4.125 15.8125 4.4 15.8125 4.8125C15.8125 7.49375 13.6813 9.625 11 9.625Z"
                  fill="white"
                />
              </svg>
            </a>
          </li>
          {/* Add other tabs here */}
        </ul>
        <ul className="cart-sidebar-products">
          {/* Example product item */}
          <li>
            <div className="cart-product-column">
              <div className="card-product-thumb-sd">
                <img src="https://placehold.co/102x119" alt="" />
              </div>
              <div className="card-product-thumb-info">
                <a href="#" title="" className="close-cart-product">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.2">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.62485 7.99394C8.79918 8.16832 8.79916 8.45095 8.6248 8.62528C8.45044 8.79961 8.16778 8.79961 7.99345 8.62524L5.50004 6.1314L3.00643 8.62501C2.8321 8.79934 2.54942 8.79934 2.37509 8.62501C2.20076 8.45068 2.20076 8.168 2.37509 7.99367L4.86875 5.50001L2.37527 3.00609C2.20098 2.83174 2.20098 2.54908 2.37536 2.37475C2.54969 2.20042 2.83236 2.20045 3.0067 2.3748L5.50013 4.86867L7.99376 2.37502C8.1681 2.20068 8.45076 2.20068 8.6251 2.37502C8.79945 2.54936 8.79945 2.83202 8.6251 3.00637L6.13138 5.50006L8.62485 7.99394Z"
                        fill="black"
                      />
                    </g>
                  </svg>
                </a>
                <a href="#" title="" className="edit-btn">
                  Edit
                </a>
                <span>short one piece</span>
                <h4>
                  <a href="#" title="">
                    Women's summer
                  </a>
                </h4>
                <div className="price-sd">
                  <del>$98.00</del>
                  <span>$50.00</span>
                </div>
                <div className="quantity">
                  <button className="minus-btn" type="button" name="button">
                    <i>-</i>
                  </button>
                  <input type="text" name="name" value="1" />
                  <button className="plus-btn" type="button" name="button">
                    <i>+</i>
                  </button>
                </div>
              </div>
            </div>
          </li>
          {/* Add more product items here */}
        </ul>
      </div>
      <div className="cart-footer">
        <p>
          <span>Congratulations!</span> You've got free shipping
        </p>
        <img src="/images/progress.png" alt="" />
        <div className="product-price-total">
          <strong>Subtotal</strong>
          <span>$1,547.00.00</span>
        </div>
        <span>
          Tax included{" "}
          <a href="#" title="">
            Shipping
          </a>{" "}
          calculated at checkout.
        </span>
        <div className="agree-terms">
          <label className="containerr">
            I agree with{" "}
            <a href="#" title="">
              {" "}
              Terms &amp; Conditions
            </a>
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
        <ul className="cart-sidebar-btns">
          <li>
            <a href="#" title="">
              View cart
            </a>
          </li>
          <li>
            <a href="#" title="" className="checkout">
              Check out
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CartSidebar

