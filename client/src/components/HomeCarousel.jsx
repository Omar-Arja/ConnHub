import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeCarousel = () => {
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const slides = [
        { img: 'Software-and-IT-jpg.webp', caption: 'Discover amazing services' },
        { img: 'mobile-app.webp', caption: 'Connect with professionals' },
        { img: 'website.jpg', caption: 'Find what you need' }
    ];

    return (
        <div className="carousel-container">
            <Slider {...setting}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        <img src={slide.img} alt={`Slide ${index + 1}`} />
                        <div className="slide-overlay"></div>
                        <div className="slide-content">
                            <h2>{slide.caption}</h2>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeCarousel;