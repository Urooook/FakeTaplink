import React from 'react';
import {ImageBlockProps} from "../../../blocksContext";
import styles from './ImageBlock.module.css';

export const ImageBlock = ({image}: ImageBlockProps) => {
    if(image === null) {
        return <>Not Found</>
    }
    return (
            <div className={styles.imageWrapper}>
                <img alt="not fount" className={styles.image} width={"350px"} draggable={false} src={image}/>
                <br/>
            </div>
    );
};