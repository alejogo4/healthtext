const MarqueeSection = () => {
  return (
    <section className="marquee-section">
      <div className="marquee" data-duration="17000" data-gap="10" data-duplicated="true">
        <h2>The best fashion store can deliver</h2>
      </div>
      <div className="marquee2" data-duration="17000" data-gap="37" data-duplicated="true">
        <h2>The best fashion store can deliver</h2>
      </div>
    </section>
  )
}

export default MarqueeSection

