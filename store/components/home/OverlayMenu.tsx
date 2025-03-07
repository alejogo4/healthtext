import Link from "next/link"

const OverlayMenu = () => {
  return (
    <div className="overlay-menu">
      <ul className="menu-links">
        <li>
          <a href="#" title="">
            Home
          </a>
          <ul>
            <li>
              <Link href="/">women</Link>
            </li>
            <li>
              <Link href="/index-2">man</Link>
            </li>
            <li>
              <Link href="/index-3">kids</Link>
            </li>
            <li>
              <Link href="/index_4">Electric</Link>
            </li>
            <li>
              <Link href="/index_5">furniture</Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" title="">
            shop
          </a>
          <ul>
            <li>
              <Link href="/shop-category">Shop Category</Link>
            </li>
            <li>
              <Link href="/shop-single">Shop Single</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" title="">
            blog
          </a>
          <ul>
            <li>
              <Link href="/single-article">Blog</Link>
            </li>
            <li>
              <Link href="/blog-single">Blog Single</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/contact">contact us</Link>
        </li>
        <li>
          <a href="#" title="">
            Pages
          </a>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
            <li>
              <Link href="/signup">Sign up</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/account">account</Link>
            </li>
            <li>
              <Link href="/404">404</Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="marquee3" data-duration="60000" data-gap="0" data-duplicated="true">
        <ul>
          <li>Glance</li>
          <li>Glance</li>
          <li>Glance</li>
          <li>Glance</li>
          <li>Glance</li>
          <li>Glance</li>
        </ul>
      </div>
    </div>
  )
}

export default OverlayMenu

