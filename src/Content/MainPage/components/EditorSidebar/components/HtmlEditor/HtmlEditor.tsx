import React, {useState} from 'react';
import {Textarea} from "../../../../../../components/UI/Textarea/Textarea";
import styles from "./HtmlEditor.module.css";
import {Button} from "../../../../../../components/UI/Button/Button";
import {opt, or, repeat, seq, tag, take, ws} from "../../../../../../helpers/Parser/Factories";
import {binsearchKey} from "../../../../../../helpers/Parser/htmlTags";
import {Parser} from "../../../../../../helpers/Parser/types";

type parserResult = {
    res: string,
    errors: string[]
}

export const HtmlEditor = () => {
    const [errors, setErrors] = useState<string[]>([])
    const [html, setHtml] = useState<any>('')

    const xmlNameRgxp = /[^ <>"'=/]/;

    const xmlAttrValue = seq(
        tag('='),
        ws,
        tag('"'),
        take(/[^"]/, {token: "CREATE_ATTR_VALUE"}),
        tag('"')
    )

    const xmlAttr = seq(
        ws,
        take(xmlNameRgxp, {token: "CREATE_ATTE_KEY"}),
        ws,
        opt(xmlAttrValue)
    )

    const xmlTag = seq(
        ws,
        tag('<'),
        ws,
        take(xmlNameRgxp, {token: 'CREATE_TAG'}),
        ws,
        repeat(xmlAttr, {min: 0}),
        ws,
        tag('>', {token: 'END_CREATE_TAG'})
    )

    const xmlEndTag = seq(
        ws,
        tag('</'),
        ws,
        take(xmlNameRgxp, {token: 'END_TAG'}),
        ws,
        tag('>' )
    );

    const xmlText = seq(
        take(/[^<>]/, {token: 'TEXT'})
    );

    const xml: Parser = repeat(
        or(
            seq(
                xmlTag,
                opt((...args) => or(
                    seq(xmlText, xml, opt(xmlText)),
                    xml
                )(...args)),
                xmlEndTag
            ),
            xmlText
        ),
        {min: 0}
    )

    const parseHtml = (html: string) => {
        const tokens  = xml(html.replace(/(\s)\1+/gm, '').replace(/\n/gm, ''));
        const stackStartTags = [];
        const stackEndTags = [];
        const errorMessages = [];
        let depth = 0;
        let res = '';

        // @ts-ignore
        for(const token of tokens) {
            const val = token.value;

            switch (token.type){
                case 'CREATE_TAG': {
                    const isHtmlTag = binsearchKey(val)
                    if(isHtmlTag === -1) {
                        errorMessages.push(`${val} не является html тегом`);
                    }
                    stackStartTags.push(val);
                    res+= ' '.repeat(depth)
                    res += `<span style="color: red;">&lt${val}</span>`;
                    depth+= 3;
                    break;
                }
                case 'CREATE_ATTE_KEY': {
                    res += ` <span style="color: #101b98;">${val}</span>`;
                    break;
                }
                case 'CREATE_ATTR_VALUE': {
                    res+= `=<span style="color: green;">"${val}"</span>`;
                    break;
                }
                case 'END_CREATE_TAG': {
                    res += `<span style="color: red;">&gt</span> \n`
                    break;
                }
                case 'END_TAG': {
                    stackEndTags.push(val);
                    depth-= 3;
                    res+= ' '.repeat(depth)
                    res+= `<span style="color: red;">&lt/${val}&gt</span>\n`;
                    break;
                }
                case 'TEXT': {
                    const a = depth+1
                    res+= ' '.repeat(a)
                    if( val === '\n') {
                        res += val;
                    } else {
                        res += `<span style="color: black; font-family: Arial">${val}</span> \n`;
                    }
                    break;
                }
            }
        }

        // while ()

        // console.log(stackStartTags)
        // console.log(stackEndTags)
        return {res, errors: errorMessages};
    }


//    const a = xml(`
//      <div >
// <b >qwe</b>
// <li>
// <a>dddd</a>
// sdsd
// </li>
// </div>
//     `)
// a.next();
//
//     console.log(    a.next(`<a>dddd</a>
// sdsd
// </li>
// </div>`))



    const parseHtmlObject = () => {
        // @ts-ignore
        return new Promise((resolve) => resolve(parseHtml(html))).then((el: parserResult) => {
            setHtml(el.res)
            setErrors(el.errors)
        })
    }

    // parseHtmlObject();

    // setHtml(parseHtmlObject)


    return (
        <>
            {
                errors.length > 0 && errors.map((err) => <div style={{color: 'red'}}>{err}</div>)
            }

            <Textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className={styles.htmlCode}
                placeholder={'Some text...'}
            />

            <pre>
                <code>
                   {/*<textarea>*/}
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                   {/*</textarea>*/}
                </code>
            </pre>

            <Button onClick={parseHtmlObject}>Remove</Button>


        </>
    )
};