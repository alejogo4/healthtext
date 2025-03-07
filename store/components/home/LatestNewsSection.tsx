import Link from "next/link"

const LatestNewsSection = () => {
  return (
    <section className="latest-news-section">
      <div className="container-fluid">
        <div className="sec-title wow fadeInUp">
          <h2>latest news</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus leo sit amet lorem egestas iaculis. Donec
            nibh enim, pharetra vel turpis
          </p>
        </div>
        <div className="blog-posts">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div className="post wow fadeInLeft" data-wow-delay={`${index * 200}ms`} key={index}>
                <div className="post-thumb">
                  <img src="https://placehold.co/350x310" alt="" />
                </div>
                <div className="post-info">
                  <h3>
                    <Link href="/blog-single" title="">
                      Nearly 13 Million US Children Infected Since Covid Pandemic
                    </Link>
                  </h3>
                  <ul className="meta">
                    <li>
                      <img src="/images/icons/icon5.svg" alt="" />
                      <a href="#" title="">
                        08 July 2022
                      </a>
                    </li>
                    <li>
                      <img src="/images/icons/icon6.svg" alt="" />
                      <a href="#" title="">
                        07:41 PM IST
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
        <div className="full-button text-center wow slideInUp">
          <a href="#" title="" className="theme-btn">
            view all
          </a>
        </div>
      </div>
    </section>
  )
}

export default LatestNewsSection

