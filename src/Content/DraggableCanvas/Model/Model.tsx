import DoublyLinkedList from "../../../helpers/DataStructures/DoublyLinkedList/DoublyLinkedList";
import React, {Component, ReactElement, ReactNode, SyntheticEvent} from "react";
import { on as viewOn } from '../../../helpers/visitor';
import {DraggableElement} from "../DraggableElement/DraggableElement";
import {Nullable} from "../../../helpers/DataStructures/DoublyLinkedList/DoublyLLTypes";
import DoublyLinkedListNode from "../../../helpers/DataStructures/DoublyLinkedList/DoublyLinkedListNode";

interface ModelProps {
    data: JSX.Element[]
}

interface ModelState {
    model: DoublyLinkedList
}

type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
}

export default class Model extends Component<ModelProps, ModelState>{
    // constructor(props: ModelProps) {
    //     super(props.data);
    // }

    // get head(): Nullable<DoublyLinkedListNode<any>> {
    //     return this.state.model.head;
    // }
    //
    // get tail(): any {
    //     return this.state.model.tail;
    // }
    //
    // insertBefore(cb: (value: any) => boolean, newValue: any) {
    //     this.state.model.insertBefore(cb, newValue);
    // }
    //
    // insertAfter(cb: (value: any) => boolean, newValue: any) {
    //     this.state.model.insertAfter(cb, newValue);
    // }

    push(elem: JSX.Element, id: number, wrapper?: boolean): void {
        let {model} = this.state
        let pp = elem;

        if(!wrapper) {
            pp = this.#prepareToDraggable(elem, id);
        }

         model.push(pp);
         this.setState({model})
    }

    // pop() {
    //     let {model} = this.state
    //
    //     model= this.state.model.pop()
    //     this.setState({model})
    //     // console.log([...this.state.model.values()].length)
    // }
    deleteAll() {
        return this.state.model.clean();
    }

    #makeRightPosition(evt: HTMLElementEvent<HTMLButtonElement>): void {
        let {model} = this.state
        console.log(evt.target.parentNode!.children)
        console.log([...model.values()].map((el: any) => el.props.id))
        const newPositions: number[] = [];
        const newDraggableArray: Element[] =[...evt.target.parentNode!.children]
        newDraggableArray.forEach((el: any) => {
            // console.log(el.id)
            return newPositions.push(Number(el.id))
        });
        // console.log(newDraggableArray[0].id)
        const oldDraggableArray: unknown[] = [...model.values()];
        // console.log(oldDraggableArray.length)

        const newModel: DoublyLinkedList = new DoublyLinkedList();

        // this.deleteAll();
        // let i=0;
        let indexValue: number[] =[];

        // console.log(this.state.model.length())
        newPositions.forEach((el: number) => {
            const pos = oldDraggableArray.find((item: any, index) => {
                indexValue.push(index);
                    return item.props.id === el;
           })
            newModel.push(pos);
        })
        // this.deleteAll();

        this.setState({model: newModel})
        // console.log(this.state.modal)


        console.log(newPositions)

        // console.log('MODEL')
        // model = newModel

        // console.log(newModel)
        //    this.setState({newModel})
    }

    #prepareToDraggable(block: JSX.Element, id?: number): ReactElement {
        const addOutline1 = (e: any) => {
            if (e.target.parentNode.classList.contains('items') || e.target.classList.contains('items')) {
                e.target.style.background = e.target.style.background === 'red' ? 'transparent' : 'red';
            }
        };

        const accept = [
                viewOn('click', addOutline1),
                viewOn('dragstart', (evt: HTMLElementEvent<HTMLButtonElement>) => (evt.target as Element).classList.add('box')),
                viewOn('dragend', (evt: HTMLElementEvent<HTMLButtonElement>) => {
                    (evt.target as Element).classList.remove('box');
                    console.log(evt)
                    this.#makeRightPosition(evt)
                }),
            ];

        return <DraggableElement accept={accept} elem={block} id={id} />
    }

    componentDidMount() {
        const model: DoublyLinkedList = new DoublyLinkedList()
        this.state = {model};
        // console.log(1111111111111111)
        if(this.props.data) {
            let index = 0;
            for(const item of this.props.data){
                // console.log(this)
                this.push(item, index)
                index++;
            }
            // this.push(<div>
            //     8               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet blanditiis ea fugiat laborum maxime quisquam soluta sunt ut voluptatibus.
            // </div>, 8)
        }
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        // console.log('prevState', prevState && [...prevState.model.values()].map((el: any) => el.props.id))
        // Typical usage (don't forget to compare props):
        if (this.props.data!== prevProps.data) {
            console.log('PREV', prevProps.data)
        }
    }

    values() {
            return this.state.model.values();
        }


    render(): any {
        const values = this.state ? [...this.values()] : null
        console.log('Render')
        console.log(values?.map((el: any) => el.props.id));
        return values
        // return (<h1>123s</h1>);
    }

}