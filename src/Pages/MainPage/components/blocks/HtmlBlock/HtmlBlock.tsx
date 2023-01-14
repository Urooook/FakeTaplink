import React, {useContext} from 'react';
import {ThemeContext} from "../../../themeContext";
import styles from "../TextBlock/TextBlock.module.css";
import {TextBlockProps} from "../../../blocksContext";

export const HtmlBlock = ({ text }: TextBlockProps) => {
    const {
        theme: { color },
    } = useContext(ThemeContext)

    return (
        <div className={styles.container} style={{ color }}>
            <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
};