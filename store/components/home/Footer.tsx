const Footer = () => {
  return (
    <footer>
      <div className="main-footer">
        <h1 className="section-bg-title">Glance</h1>
        <div className="container-fluid">
          <div className="footer-widgets">
            <div className="widget widget-links wow fadeInLeft">
              <h3 className="widget-title">CUSTOMER SERVICE</h3>
              <ul className="wd-links">
                <li>
                  <a href="#" title="">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Track My Order
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
            <div className="widget widget-links wow fadeInLeft" data-wow-delay="200ms">
              <h3 className="widget-title">WEBSITE</h3>
              <ul className="wd-links">
                <li>
                  <a href="#" title="">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Affiliates
                  </a>
                </li>
              </ul>
            </div>
            <div className="widget widget-links wow fadeInLeft" data-wow-delay="400ms">
              <h3 className="widget-title">Glance</h3>
              <ul className="wd-links">
                <li>
                  <a href="#" title="">
                    Heritage
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="widget widget-newsletter wow fadeInLeft" data-wow-delay="600ms">
              <h3 className="widget-title">NEWSLETTER</h3>
              <p>Subscribe and get 10% discount on your first purchase.</p>
              <form>
                <input type="email" name="email" placeholder="Email Address" />
                <button type="submit" className="theme-btn">
                  subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <div className="copyright wow slideInUp">
            <p>© 2023 Glance IND - ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

