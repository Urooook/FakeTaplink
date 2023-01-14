import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {
    BlocksContext,
    CarouselBlockProps,
    CompoentNames,
    ComponentBlock,
    ImageBlockProps, LinkBlockProps,
    TextBlockProps
} from "../../../../blocksContext";
import {TextBlock} from "../../../blocks/TextBlock/TextBlock";
import {Textarea} from "../../../../../../components/UI/Textarea/Textarea";
import styles from "../TextEditor/TextEditor.module.css";
import {Button} from "../../../../../../components/UI/Button/Button";
import {CarouselBlock} from "../../../blocks/CarouselBlock/CarouselBlock";
import {ImageBlock} from "../../../blocks/ImageBlock/ImageBlock";
import {Input} from "../../../../../../components/UI/Input/Input";
import {LinkBlock} from "../../../blocks/LinkBlock/LinkBlock";

const initialTextEditorState: CarouselBlockProps = {
    images: [],
    labels: []
}

export const CarouselEditor = () => {
    const [selectedImage, setSelectedImage] = useState<string[] | ''>([]);
    const [labels, setLabels] = useState<string[]>([])
    const {blocks, activeBlock, onAddBlock, onDeleteBlock} = useContext(BlocksContext)
    console.log('AAAAA', activeBlock)

    useEffect(() => {
        console.log('qqq', activeBlock)
        if (!activeBlock?.id && onAddBlock) {

            // @ts-ignore
            onAddBlock({value: {...initialTextEditorState}, component: <CarouselBlock images={selectedImage} />, componentName: CompoentNames.CarouselLink,})
        }
    }, [activeBlock])



    const getBase64 = (file: File): Promise<any> | null => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    if (!onAddBlock || !onDeleteBlock) {
        return null;
    }

    const getImage = async (event: ChangeEvent<HTMLInputElement>, valueProp: any) => {
        if (!event.target.files) return
        const file = event.target.files[0]
        const base: string = await getBase64(file)
        console.log([...selectedImage, base])
        const a =[...selectedImage, base]
        setSelectedImage([...selectedImage, base]);

        // console.log(activeBlock)
        // console.log(base)
        if (activeBlock?.id) {
            const currentBlock = blocks.get(activeBlock?.id) as unknown as ComponentBlock<CarouselBlockProps>
            // console.log(currentBlock)

            if (currentBlock) {
                currentBlock.value["images"] = a

                // @ts-ignore
                onAddBlock({...currentBlock, component: <CarouselBlock  images={currentBlock.value.images} labels={currentBlock.value.labels} />,})
            }
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        valueProp: keyof CarouselBlockProps,
        index: number
    ) => {
        const l = labels;
            l[index] = e.target.value

        const b = [...l];
        setLabels([...l])
        if (activeBlock?.id) {
            const currentBlock = blocks.get(activeBlock?.id) as ComponentBlock<CarouselBlockProps>
            // console.log(currentBlock)
            if (currentBlock) {
                currentBlock.value["labels"] = b
                // @ts-ignore
                onAddBlock({...currentBlock, component: <CarouselBlock images={currentBlock.value.images} labels={currentBlock.value.labels} />})
            }
        }
    }
    console.log('BBBBBBBB', activeBlock)
    console.log(12)
    return (
        <div>
            {/*<h1>Upload and Display Image usign React Hook's</h1>*/}
            {selectedImage && selectedImage.map((el) => (
                <div key={el}>
                    <img alt="not fount" width={"250px"} src={el}/>
                </div>
            ))}
            <br/>

            <input
                className={styles.file}
                type="file"
                name="myImage"
                onChange={(event) => getImage(event, 'images')}
            />
            {
                selectedImage && selectedImage.map((el, i) => (
                    <Input
                        key={activeBlock?.value.text}
                        value={activeBlock?.value.text}
                        placeholder={`Label ${i + 1}`}
                        className={styles.inputText}
                        onChange={(e) => handleInputChange(e, 'labels', i)}
                    />
                ))
            }
        </div>
    );
};