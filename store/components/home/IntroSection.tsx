const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="container">
        <div className="sec-title wow fadeInUp">
          <h2>Glance video intro</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus leo sit amet lorem egestas iaculis. Donec
            nibh enim, pharetra vel turpis
          </p>
        </div>
        <div className="video-intro wow fadeInUp">
          <video id="video1" controls autoPlay loop>
            <source src="/video2.mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}

export default IntroSection

