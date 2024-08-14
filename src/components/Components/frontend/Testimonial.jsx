import { Link } from "@inertiajs/inertia-react";
import "../../../assets/css/Testimonial.css";
import Locate from "../Locate";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

export default function Testimonial({
    testimonials,
    title,
    description,
    locate
}) {
    const [t] = useTranslation("global");
    const convertTestimonial = (testimonials) => {
        let firstLine = [];
        let secondLine = [];

        if (testimonials.length > 4) {
            firstLine = testimonials.filter((item, index) => index < 6);
            secondLine = testimonials.filter((item, index) => index > 6);
        } else {
            firstLine = testimonials;
        }

        const result = {
            firstLine: firstLine,
            secondLine: secondLine
        };

        return result;
    };

    const testimonialsData = convertTestimonial(testimonials);

    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="bg-white p-3 rounded-full z-10 mr-3 absolute -top-152 right-46 2xl:block xl:block lg:block md:block sm:block xs:hidden"
            >
                <svg
                    width={40}
                    height={40}
                    xmlns="http://www.w3.org/3000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                </svg>
            </button>
        );
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="bg-white p-3 rounded-full z-10 absolute right-0 -top-152 2xl:block xl:block lg:block md:block sm:block xs:hidden"
            >
                <svg
                    width={40}
                    height={40}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
                </svg>
            </button>
        );
    };

    const previousAndLastOneWord = (text) => {
        const words = text.split(" ");

        let lastOneWord = "";
        let previousWord = "";

        if (words.length >= 2) {
            lastOneWord = words.slice(-1).join(" ");
            previousWord = words.slice(0, -1).join(" ");
        } else {
            previousWord = text;
        }

        const result = {
            lastOneWord: lastOneWord,
            previousWord: previousWord
        };

        return result;
    };

    const testimonialTitle = previousAndLastOneWord(title);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.5, // Number of items to show at once
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1900, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1536, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1280, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 3.5
                }
            },
            {
                breakpoint: 1024, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 900, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 2.5
                }
            },
            {
                breakpoint: 768, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 640, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 1.5
                }
            },
            {
                breakpoint: 500, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 360, // Adjust the breakpoint as needed
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <>
            <div className=" pb-150">
                <div className=" text-center mx-auto 2xl:w-1/2 xl:w-2/3 lg:w-3/4 xs:w-full container">
                    <h2 className="text-white text-5xl sm:text-5xl xs:text-4xl mb-4 font-hiragino">
                        {t("Over 10,000+")}{" "}
                        <span className="text-gradient">{t("Reviews.")}</span>
                    </h2>
                </div>
                <div className=" carousel-container mt-12">
                    <Slider {...settings} className="carousel-left-to-right">
                        {testimonialsData.firstLine &&
                            testimonialsData.firstLine.map((value, index) => {
                                const info = JSON.parse(
                                    value.testimonial_meta.value
                                );
                                return (
                                    <div
                                        key={index}
                                        className="w-401 bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl"
                                    >
                                        <div className=" px-7 py-9 secondary-bg rounded-2xl">
                                            <div className=" flex items-center space-x-3 mb-8">
                                                <img
                                                    className="w-14 h-14 rounded-full"
                                                    src={info.user_profile}
                                                    alt=""
                                                />
                                                <div>
                                                    <h4 className=" text-xl text-white font-medium leading-tight">
                                                        {value.name}
                                                    </h4>
                                                    <p className="text-8F9CBB text-base">
                                                        {info.user_position}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-1 mb-4">
                                                {[...Array(5)].map(
                                                    (_, index) => (
                                                        <div key={index}>
                                                            {info.user_rating >=
                                                            index + 1 ? (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 18 18"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        d="M16.4884 8.04245L13.3173 10.8099L14.2672 14.9303C14.3175 15.1457 14.3031 15.3711 14.226 15.5784C14.1488 15.7857 14.0123 15.9656 13.8334 16.0957C13.6545 16.2258 13.4413 16.3003 13.2203 16.3099C12.9993 16.3194 12.7804 16.2636 12.591 16.1495L8.9973 13.9698L5.41136 16.1495C5.22192 16.2636 5.00303 16.3194 4.78205 16.3099C4.56107 16.3003 4.34781 16.2258 4.16894 16.0957C3.99006 15.9656 3.85351 15.7857 3.77635 15.5784C3.69919 15.3711 3.68485 15.1457 3.73511 14.9303L4.68363 10.8142L1.51183 8.04245C1.34407 7.89776 1.22276 7.70676 1.16312 7.49341C1.10348 7.28006 1.10815 7.05384 1.17656 6.84313C1.24497 6.63243 1.37407 6.44661 1.54766 6.30897C1.72126 6.17134 1.93162 6.08803 2.15238 6.06948L6.33316 5.70737L7.96511 1.81487C8.05034 1.61062 8.19409 1.43616 8.37826 1.31344C8.56243 1.19072 8.7788 1.12524 9.00011 1.12524C9.22143 1.12524 9.43779 1.19072 9.62197 1.31344C9.80614 1.43616 9.94989 1.61062 10.0351 1.81487L11.672 5.70737L15.8514 6.06948C16.0721 6.08803 16.2825 6.17134 16.4561 6.30897C16.6297 6.44661 16.7588 6.63243 16.8272 6.84313C16.8956 7.05384 16.9003 7.28006 16.8406 7.49341C16.781 7.70676 16.6597 7.89776 16.4919 8.04245H16.4884Z"
                                                                        fill="#E6F85E"
                                                                    />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="18"
                                                                    fill="#E6F85E"
                                                                    class="bi bi-star"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            <p className="text-E2E5EC font-normal text-base">
                                                {info.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
                <div className="carousel-container mt-5">
                    <Slider {...settings} className="carousel-right-to-left">
                        {testimonialsData.secondLine &&
                            testimonialsData.secondLine.map((value, index) => {
                                const info = JSON.parse(
                                    value.testimonial_meta.value
                                );
                                return (
                                    <div
                                        key={index}
                                        className="w-401 bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl"
                                    >
                                        <div className=" px-7 py-9 secondary-bg rounded-2xl">
                                            <div className=" flex items-center space-x-3 mb-8">
                                                <img
                                                    className="w-14 h-14 rounded-full"
                                                    src={info.user_profile}
                                                    alt=""
                                                />
                                                <div>
                                                    <h4 className=" text-xl text-white font-medium leading-tight">
                                                        {value.name}
                                                    </h4>
                                                    <p className="text-8F9CBB text-base">
                                                        {info.user_position}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1 mb-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M16.4884 8.04245L13.3173 10.8099L14.2672 14.9303C14.3175 15.1457 14.3031 15.3711 14.226 15.5784C14.1488 15.7857 14.0123 15.9656 13.8334 16.0957C13.6545 16.2258 13.4413 16.3003 13.2203 16.3099C12.9993 16.3194 12.7804 16.2636 12.591 16.1495L8.9973 13.9698L5.41136 16.1495C5.22192 16.2636 5.00303 16.3194 4.78205 16.3099C4.56107 16.3003 4.34781 16.2258 4.16894 16.0957C3.99006 15.9656 3.85351 15.7857 3.77635 15.5784C3.69919 15.3711 3.68485 15.1457 3.73511 14.9303L4.68363 10.8142L1.51183 8.04245C1.34407 7.89776 1.22276 7.70676 1.16312 7.49341C1.10348 7.28006 1.10815 7.05384 1.17656 6.84313C1.24497 6.63243 1.37407 6.44661 1.54766 6.30897C1.72126 6.17134 1.93162 6.08803 2.15238 6.06948L6.33316 5.70737L7.96511 1.81487C8.05034 1.61062 8.19409 1.43616 8.37826 1.31344C8.56243 1.19072 8.7788 1.12524 9.00011 1.12524C9.22143 1.12524 9.43779 1.19072 9.62197 1.31344C9.80614 1.43616 9.94989 1.61062 10.0351 1.81487L11.672 5.70737L15.8514 6.06948C16.0721 6.08803 16.2825 6.17134 16.4561 6.30897C16.6297 6.44661 16.7588 6.63243 16.8272 6.84313C16.8956 7.05384 16.9003 7.28006 16.8406 7.49341C16.781 7.70676 16.6597 7.89776 16.4919 8.04245H16.4884Z"
                                                        fill="#E6F85E"
                                                    />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M16.4884 8.04245L13.3173 10.8099L14.2672 14.9303C14.3175 15.1457 14.3031 15.3711 14.226 15.5784C14.1488 15.7857 14.0123 15.9656 13.8334 16.0957C13.6545 16.2258 13.4413 16.3003 13.2203 16.3099C12.9993 16.3194 12.7804 16.2636 12.591 16.1495L8.9973 13.9698L5.41136 16.1495C5.22192 16.2636 5.00303 16.3194 4.78205 16.3099C4.56107 16.3003 4.34781 16.2258 4.16894 16.0957C3.99006 15.9656 3.85351 15.7857 3.77635 15.5784C3.69919 15.3711 3.68485 15.1457 3.73511 14.9303L4.68363 10.8142L1.51183 8.04245C1.34407 7.89776 1.22276 7.70676 1.16312 7.49341C1.10348 7.28006 1.10815 7.05384 1.17656 6.84313C1.24497 6.63243 1.37407 6.44661 1.54766 6.30897C1.72126 6.17134 1.93162 6.08803 2.15238 6.06948L6.33316 5.70737L7.96511 1.81487C8.05034 1.61062 8.19409 1.43616 8.37826 1.31344C8.56243 1.19072 8.7788 1.12524 9.00011 1.12524C9.22143 1.12524 9.43779 1.19072 9.62197 1.31344C9.80614 1.43616 9.94989 1.61062 10.0351 1.81487L11.672 5.70737L15.8514 6.06948C16.0721 6.08803 16.2825 6.17134 16.4561 6.30897C16.6297 6.44661 16.7588 6.63243 16.8272 6.84313C16.8956 7.05384 16.9003 7.28006 16.8406 7.49341C16.781 7.70676 16.6597 7.89776 16.4919 8.04245H16.4884Z"
                                                        fill="#E6F85E"
                                                    />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M16.4884 8.04245L13.3173 10.8099L14.2672 14.9303C14.3175 15.1457 14.3031 15.3711 14.226 15.5784C14.1488 15.7857 14.0123 15.9656 13.8334 16.0957C13.6545 16.2258 13.4413 16.3003 13.2203 16.3099C12.9993 16.3194 12.7804 16.2636 12.591 16.1495L8.9973 13.9698L5.41136 16.1495C5.22192 16.2636 5.00303 16.3194 4.78205 16.3099C4.56107 16.3003 4.34781 16.2258 4.16894 16.0957C3.99006 15.9656 3.85351 15.7857 3.77635 15.5784C3.69919 15.3711 3.68485 15.1457 3.73511 14.9303L4.68363 10.8142L1.51183 8.04245C1.34407 7.89776 1.22276 7.70676 1.16312 7.49341C1.10348 7.28006 1.10815 7.05384 1.17656 6.84313C1.24497 6.63243 1.37407 6.44661 1.54766 6.30897C1.72126 6.17134 1.93162 6.08803 2.15238 6.06948L6.33316 5.70737L7.96511 1.81487C8.05034 1.61062 8.19409 1.43616 8.37826 1.31344C8.56243 1.19072 8.7788 1.12524 9.00011 1.12524C9.22143 1.12524 9.43779 1.19072 9.62197 1.31344C9.80614 1.43616 9.94989 1.61062 10.0351 1.81487L11.672 5.70737L15.8514 6.06948C16.0721 6.08803 16.2825 6.17134 16.4561 6.30897C16.6297 6.44661 16.7588 6.63243 16.8272 6.84313C16.8956 7.05384 16.9003 7.28006 16.8406 7.49341C16.781 7.70676 16.6597 7.89776 16.4919 8.04245H16.4884Z"
                                                        fill="#E6F85E"
                                                    />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M16.4884 8.04245L13.3173 10.8099L14.2672 14.9303C14.3175 15.1457 14.3031 15.3711 14.226 15.5784C14.1488 15.7857 14.0123 15.9656 13.8334 16.0957C13.6545 16.2258 13.4413 16.3003 13.2203 16.3099C12.9993 16.3194 12.7804 16.2636 12.591 16.1495L8.9973 13.9698L5.41136 16.1495C5.22192 16.2636 5.00303 16.3194 4.78205 16.3099C4.56107 16.3003 4.34781 16.2258 4.16894 16.0957C3.99006 15.9656 3.85351 15.7857 3.77635 15.5784C3.69919 15.3711 3.68485 15.1457 3.73511 14.9303L4.68363 10.8142L1.51183 8.04245C1.34407 7.89776 1.22276 7.70676 1.16312 7.49341C1.10348 7.28006 1.10815 7.05384 1.17656 6.84313C1.24497 6.63243 1.37407 6.44661 1.54766 6.30897C1.72126 6.17134 1.93162 6.08803 2.15238 6.06948L6.33316 5.70737L7.96511 1.81487C8.05034 1.61062 8.19409 1.43616 8.37826 1.31344C8.56243 1.19072 8.7788 1.12524 9.00011 1.12524C9.22143 1.12524 9.43779 1.19072 9.62197 1.31344C9.80614 1.43616 9.94989 1.61062 10.0351 1.81487L11.672 5.70737L15.8514 6.06948C16.0721 6.08803 16.2825 6.17134 16.4561 6.30897C16.6297 6.44661 16.7588 6.63243 16.8272 6.84313C16.8956 7.05384 16.9003 7.28006 16.8406 7.49341C16.781 7.70676 16.6597 7.89776 16.4919 8.04245H16.4884Z"
                                                        fill="#E6F85E"
                                                    />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M16.4884 8.04245L13.3173 10.8099L14.2672 14.9303C14.3175 15.1457 14.3031 15.3711 14.226 15.5784C14.1488 15.7857 14.0123 15.9656 13.8334 16.0957C13.6545 16.2258 13.4413 16.3003 13.2203 16.3099C12.9993 16.3194 12.7804 16.2636 12.591 16.1495L8.9973 13.9698L5.41136 16.1495C5.22192 16.2636 5.00303 16.3194 4.78205 16.3099C4.56107 16.3003 4.34781 16.2258 4.16894 16.0957C3.99006 15.9656 3.85351 15.7857 3.77635 15.5784C3.69919 15.3711 3.68485 15.1457 3.73511 14.9303L4.68363 10.8142L1.51183 8.04245C1.34407 7.89776 1.22276 7.70676 1.16312 7.49341C1.10348 7.28006 1.10815 7.05384 1.17656 6.84313C1.24497 6.63243 1.37407 6.44661 1.54766 6.30897C1.72126 6.17134 1.93162 6.08803 2.15238 6.06948L6.33316 5.70737L7.96511 1.81487C8.05034 1.61062 8.19409 1.43616 8.37826 1.31344C8.56243 1.19072 8.7788 1.12524 9.00011 1.12524C9.22143 1.12524 9.43779 1.19072 9.62197 1.31344C9.80614 1.43616 9.94989 1.61062 10.0351 1.81487L11.672 5.70737L15.8514 6.06948C16.0721 6.08803 16.2825 6.17134 16.4561 6.30897C16.6297 6.44661 16.7588 6.63243 16.8272 6.84313C16.8956 7.05384 16.9003 7.28006 16.8406 7.49341C16.781 7.70676 16.6597 7.89776 16.4919 8.04245H16.4884Z"
                                                        fill="#E6F85E"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-E2E5EC font-normal text-base">
                                                {info.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        </>
    );
}
