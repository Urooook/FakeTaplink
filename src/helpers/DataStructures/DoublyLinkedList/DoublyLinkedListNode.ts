import {Nullable} from "./DoublyLLTypes";


export default class DoublyLinkedListNode<T = unknown> {
    prev: Nullable<DoublyLinkedListNode<T>> = null;

    next: Nullable<DoublyLinkedListNode<T>> = null;

    constructor(public value: T) {}
}