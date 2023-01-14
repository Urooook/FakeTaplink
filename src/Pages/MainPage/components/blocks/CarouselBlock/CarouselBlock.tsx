import React, {useContext} from 'react';
import {CarouselBlockProps, ImageBlockProps, TextBlockProps} from "../../../blocksContext";
import {ThemeContext} from "../../../themeContext";
import styles from "../TextBlock/TextBlock.module.css";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const CarouselBlock = ({ images, labels }: CarouselBlockProps) => {
    const {
        theme: { color },
    } = useContext(ThemeContext)
    console.log("IIII", labels)
    return (
        <Carousel>
            {/*<div>*/}
            {/*    <img src="https://kupit-kota.ru/wp-content/uploads/2022/07/kak-uhajivat-za-kotenkom-2048x1536.jpeg" />*/}
            {/*    <p className="legend">Legend 1</p>*/}
            {/*</div>*/}
            {
                images.map((img: string, i) => (
                    <div key={img}>
                        <img src={img} />
                        <p className="legend">{labels ? labels[i] : ''}</p>
                    </div>
                ))
            }

        </Carousel>
    )
}