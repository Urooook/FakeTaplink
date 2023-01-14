export type Test = string | RegExp | ((char: string) => boolean);

export enum ParserState {
    EXPECT_NEW_INPUT
}

export interface ParserToken<T = unknown> {
    type: any;
    value?: T;
}

export interface ParserValue<T = unknown> extends ParserToken<T> {

}

export type ParserResult<T = unknown> = [ParserValue, Iterable<string>];

export type Parser<T = unknown, R = unknown> =
    (iterable: Iterable<string>, prev?: ParserValue) =>
        Generator<ParserState | ParserToken<T>, ParserResult<R>, Iterable<string> | undefined>;

export class ParserError extends Error {
    prev: ParserValue | undefined;

    constructor(message: string, prev: ParserValue | undefined) {
        super(message);
        this.prev = prev;
    }
}

export interface ParserOptions<T = unknown> {
    token?: string;
    tokenValue?(val: unknown): T;
}

export interface TakeOptions extends ParserOptions<string> {
    min?: number;
    max?: number;
}

export interface RepeatOptions<T = unknown> extends ParserOptions<T> {
    min?: number;
    max?: number;
}