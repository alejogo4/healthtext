const SubscribePopup = () => {
  return (
    <div className="popup subscribe-popup">
      <a href="#" title="" className="close-popup">
        <img src="/images/close2.png" alt="" />
      </a>
      <div className="row">
        <div className="col-lg-6 image-popup">
          <img src="https://placehold.co/692x832" alt="" />
        </div>
        <div className="col-lg-6 popup-content">
          <div className="inner-column">
            <div className="popup-title">
              <h2>Subscribe to our Newsletter!</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus enim nec elementum</p>
            </div>
            <form>
              <div className="input-field">
                <input type="email" name="email" placeholder="Your Email Address" />
                <div className="mail-icon">
                  <img src="/images/mail.svg" alt="" />
                </div>
              </div>
              <button type="submit" className="theme-btn v2 w-100">
                subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribePopup

