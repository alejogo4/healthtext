import Image from 'next/image';
import Script from 'next/script';

import Header from '@components/home/Header';
import MainSlider from '@components/home/MainSlider';
import AboutSection from '@components/home/AboutSection';
import LookbookSection from '@components/home/LookbookSection';
import CategorySection from '@components/home/CategorySection';
import MarqueeSection from '@components/home/MarqueeSection';
import ProductsSlider from '@components/home/ProductsSlider';
import CollectionSection from '@components/home/CollectionSection';
import TrendingSection from '@components/home/TrendingSection';
import IntroSection from '@components/home/IntroSection';
import TestimonialSection from '@components/home/TestimonialSection';
import FeaturedProducts from '@components/home/FeaturedProducts';
import BannerSection from '@components/home/BannerSection';
import BrandSection from '@components/home/BrandSection';
import CartSection from '@components/home/CartSection';
import LatestNewsSection from '@components/home/LatestNewsSection';
import Footer from '@components/home/Footer';
import CartSidebar from '@components/home/CartSidebar';
import SearchBox from '@components/home/SearchBox';
import QuickViewPopup from '@components/home/QuickViewPopup';
import OverlayMenu from '@components/home/OverlayMenu';
import SubscribePopup from '@components/home/SubscribePopup';

export default function Home() {
  return (
    <>
      <div className='page-wrapper home1'>
        <div className='pointer' id='pointer'></div>

        <Header />
        <CartSidebar />
        <SearchBox />
        <QuickViewPopup />
        <OverlayMenu />

        <MainSlider />
        <AboutSection />
        <LookbookSection />
        <CategorySection />
        <MarqueeSection />
        <ProductsSlider />
        <CollectionSection />
        <TrendingSection />
        <IntroSection />
        <TestimonialSection />
        <FeaturedProducts />
        <BannerSection />
        <BrandSection />
        <CartSection />
        <LatestNewsSection />
        <Footer />
      </div>

      {/* Scroll To Top */}
      <div className='scroll-to-top scroll-to-target' data-target='html'>
        <span className='fa fa-angle-up'></span>
      </div>

      <SubscribePopup />

      <Script src='js/jquery.js' strategy='beforeInteractive' />
      <Script
        src='js/jquery-migrate-1.4.1.min.js'
        strategy='beforeInteractive'
      />
      <Script src='js/slick.min.js' strategy='beforeInteractive' />
      <Script src='js/slick-animation.min.js' strategy='beforeInteractive' />
      <Script src='js/popper.min.js' strategy='beforeInteractive' />
      <Script src='js/bootstrap.min.js' strategy='beforeInteractive' />
      <Script src='js/jquery.fancybox.js' strategy='beforeInteractive' />
      <Script src='js/wow.js' strategy='beforeInteractive' />
      <Script src='js/appear.js' strategy='beforeInteractive' />
      <Script src='js/swiper-bundle.min.js' strategy='beforeInteractive' />
      <Script src='js/jquery.marquee.min.js' strategy='beforeInteractive' />
      <Script
        src='/js/masonry.pkgd.min.js'
        integrity='sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D'
        crossOrigin='anonymous'
        async
        strategy='afterInteractive'
      />
      <Script src='js/video.js' strategy='afterInteractive' />
      <Script src='js/script.js' strategy='afterInteractive' />
    </>
  );
}
