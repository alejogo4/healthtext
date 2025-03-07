const SearchBox = () => {
  return (
    <div className="search-box">
      <div className="search-box-content">
        <form>
          <div className="input_field">
            <input type="text" name="search" placeholder="Search our store" />
            <button type="submit">
              <img src="/images/icons/search.svg" alt="" />
            </button>
          </div>
        </form>
        <a href="#" title="" className="close-search">
          <img src="/images/icons/close3.svg" alt="" />
        </a>
      </div>
    </div>
  )
}

export default SearchBox

