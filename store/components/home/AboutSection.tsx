import Link from "next/link"

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xl-5">
            <div className="about-text">
              <h3 className="title wow fadeInUp" data-wow-duration="2s" data-wow-delay="400ms">
                <span>GLANCE</span> Themes are compatible with major plugins and much more!
              </h3>
              <p className="wow fadeInUp" data-wow-duration="2s" data-wow-delay="700ms">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus leo sit amet lorem egestas iaculis.
                Donec nibh enim, pharetra vel turpis non, vulputate luctus ex. Phasellus pharetra ut dolor ac rutrum.
                Curabitur molestie nec mi in congue. Nam luctus ante quis urna molestie, ut venenatis diam sagittis. Nam
                ligula velit,
              </p>
              <Link
                href="/about"
                title=""
                className="theme-btn wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay="900ms"
              >
                about me
              </Link>
            </div>
          </div>
          <div className="col-xl-7 about-images">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                <div className="abt-img wow fadeInUp">
                  <img src="https://placehold.co/330x520" alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                <div className="abt-img wow fadeInUp" data-wow-delay="300ms">
                  <img src="https://placehold.co/330x520" alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                <div className="abt-img wow fadeInUp" data-wow-delay="500ms">
                  <img src="https://placehold.co/330x520" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

