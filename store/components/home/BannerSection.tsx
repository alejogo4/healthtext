import Link from "next/link"

const BannerSection = () => {
  return (
    <section className="banner-section">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className="sml-banner wow fadeInLeft">
            <img src="https://placehold.co/944x614" alt="" />
            <div className="banner-caption">
              <h3>lingerie</h3>
              <p>Lorem ipsum dolor sit consectetur adipiscing elit.</p>
              <Link href="/shop-single" title="" className="theme-btn">
                shop now
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="sml-banner wow fadeInRight">
            <img src="https://placehold.co/944x614" alt="" />
            <div className="banner-caption">
              <h3>jewelry</h3>
              <p>Lorem ipsum dolor sit consectetur adipiscing elit.</p>
              <Link href="/shop-single" title="" className="theme-btn">
                shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerSection

