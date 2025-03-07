import Link from "next/link"

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link href="/" title="">
              <img src="/images/logo.png" alt="Glance Logo" />
            </Link>
          </div>
          <div className="header-social">
            <a href="#" title="" className="share-btn">
              <i className="flaticon-share"></i>
            </a>
            <div className="banner-social">
              <h3>social media</h3>
              <ul className="social-links">
                <li>
                  <a href="#" title="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="menu-other-links">
            <li>
              <a href="#" title="" className="search-btn">
                <img src="/images/search.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#" title="" className="cart-btn">
                <img src="/images/cart.png" alt="" />
                <span className="cart-number">5</span>
              </a>
            </li>
            <li>
              <Link href="/login" title="">
                <img src="/images/user.svg" alt="" />
              </Link>
            </li>
          </ul>
          <div className="menu">
            <div className="menu-btn">
              <span className="bar1"></span>
              <span className="bar2"></span>
              <span className="bar3"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

