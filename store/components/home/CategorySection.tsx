import Link from "next/link"

const CategorySection = () => {
  return (
    <section className="category-section">
      <div className="container-fluid">
        <div className="sec-title wow slideInUp">
          <h2>GLANCE Category</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus leo sit amet lorem egestas iaculis. Donec
            nibh enim, pharetra vel turpis
          </p>
        </div>
        <div className="swiper-container swiper1 product-categories">
          <div className="swiper-wrapper">
            {/* Repeat this block for each category */}
            {Array(24)
              .fill(0)
              .map((_, index) => (
                <div className="swiper-slide" key={index}>
                  <div className="product-cat">
                    <Link href="#" title="" className="box-link"></Link>
                    <div className="product-thumb">
                      <img src="https://placehold.co/393x450" alt="" />
                    </div>
                    <h3>
                      <Link href="#" title="">
                        women clothes
                      </Link>
                    </h3>
                  </div>
                </div>
              ))}
          </div>
          {/* pagination */}
          <div className="swiper-pagination"></div>

          {/* scrollbar */}
          <div className="swiper-scrollbar">
            <span className="swiper-scrollbar-drag">
              <span className="drag-inner">DISCOVER MORE</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection

