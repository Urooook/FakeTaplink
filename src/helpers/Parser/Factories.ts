import { intoIter, intoBufIter, seq as iterSeq } from './iter';
import {binsearchKey} from "./htmlTags";
import {
    Parser,
    ParserError,
    ParserOptions,
    ParserState,
    ParserToken,
    ParserValue,
    RepeatOptions,
    TakeOptions,
    Test
} from "./types";



function testChar(
    test: Test,
    char: string,
    prev: ParserValue | undefined
): boolean {
    switch (typeof test) {
        case 'string':
            if (test !== char) {
                throw new ParserError('Invalid string', prev);
            }

            break;

        case 'function':
            if (!test(char)) {
                throw new ParserError('Invalid string', prev);
            }

            break;

        default:
            if (!test.test(char)) {
                throw new ParserError('Invalid string', prev);
            }
    }

    return true;
}

export function tag(pattern: Iterable<Test>, opts: ParserOptions<string> = {}): Parser<string, string> {
    return function* (source, prev) {
        let
            iter = intoIter(source);

        let
            value = '';

        // @ts-ignore
        for (const test of pattern) {
            let
                chunk = iter.next(),
                char = chunk.value;

            if (chunk.done) {
                const
                    data = yield ParserState.EXPECT_NEW_INPUT;

                if (data == null) {
                    throw new ParserError('Invalid input', prev);
                }

                iter = intoIter(data);
                chunk = iter.next();
                char = chunk.value;
            }

            testChar(test, char, prev);
            value += char;
        }

        if (opts.token) {
            yield {
                type: opts.token,
                value: opts.tokenValue?.(value) ?? value
            }
        }

        const token = {
            type: 'TAG',
            value,
        };

        return [token, iter];
    };
}

export function take(
    test: Test,
    opts: TakeOptions = {}
): Parser<string, string> {
    return function* (source, prev) {
        const
            {min = 1, max = Infinity} = opts;

        const
            buffer: string[] = [];

        let
            iter = intoIter(source),
            count = 0;

        let
            value = '';

        while (true) {
            if (count >= max) {
                break;
            }

            let
                chunk = iter.next(),
                char = chunk.value;

            if (chunk.done) {
                if (count >= min) {
                    break;
                }

                const
                    data = yield ParserState.EXPECT_NEW_INPUT;

                if (data == null) {
                    throw new ParserError('Invalid input', prev);
                }

                source = data;
                iter = intoIter(source);
                chunk = iter.next();
                char = chunk.value;
            }

            try {
                if (testChar(test, char, prev)) {
                    count++;
                }

            } catch (err) {
                if (count < min) {
                    throw err;
                }

                buffer.push(char);
                break;
            }

            value += char;
        }

        if (opts.token && count > 0) {
            yield {
                type: opts.token,
                value: opts.tokenValue?.(value) ?? value
            }
        }

        const token = {
            type: 'TAKE',
            value,
        };

        return [token, buffer.length > 0 ? iterSeq(buffer, iter) : iter];
    };
}

export function seq<T = unknown ,R = unknown>(
    ...parsers: Parser[]
): Parser<T | T[], R[]>;

export function seq<T = unknown, R = unknown>(
    opts: ParserOptions,
    ...parsers: Parser[]
): Parser<T | T[], R[]>;

export function seq(
    optsOrParser: ParserOptions | Parser,
    ...parsers: Parser[]
): Parser {
    let
        opts: ParserOptions = {};

    if (typeof optsOrParser === 'function') {
        parsers.unshift(optsOrParser);

    } else {
        opts = optsOrParser;
    }

    return function* (source, prev): any {
        const
            value: unknown[] = [];

        let
            iter = intoIter(source),
            data;

        for (const parser of parsers) {
            const
                parsing = parser(iter, prev);

            while (true) {
                const
                    chunk = parsing.next(data);

                if (chunk.done) {
                    prev = chunk.value[0];
                    value.push(prev);

                    iter = intoIter(chunk.value[1]);
                    break;

                } else {
                    if (chunk.value === ParserState.EXPECT_NEW_INPUT) {
                        data = yield chunk.value;

                    } else {
                        yield chunk.value;
                    }
                }
            }
        }

        if (opts.token) {
            yield {
                type: opts.token,
                value: opts.tokenValue?.(value) ?? value
            };
        }

        const token = {
            type: 'SEQ',
            value
        };

        return [token, iter];
    };
}

export function or<T = unknown ,R = unknown>(
    ...parsers: Parser[]
): Parser<T, R>;

export function or<T = unknown, R = unknown>(
    opts: ParserOptions,
    ...parsers: Parser[]
): Parser<T, R>;

export function or(
    optsOrParser: ParserOptions | Parser,
    ...parsers: Parser[]
): Parser {
    let
        opts: ParserOptions = {};

    if (typeof optsOrParser === 'function') {
        parsers.unshift(optsOrParser);

    } else {
        opts = optsOrParser;
    }

    return function* (source, prev) {
        const
            yields: ParserToken[] = [];

        let
            value,
            done = false,
            iter = intoIter(source),
            data;

        outer: for (const parser of parsers) {
            const
                buffer: any = [],
                parsing = parser(intoBufIter(iter, buffer), prev);

            while (true) {
                try {
                    const
                        chunk: any = parsing.next(data);

                    if (chunk.done) {
                        done = true;
                        value = chunk.value[0];
                        iter = intoIter(chunk.value[1]);
                        break outer;

                    } else {
                        if (chunk.value === ParserState.EXPECT_NEW_INPUT) {
                            data = yield chunk.value;

                        } else {
                            yields.push(chunk.value);
                        }
                    }

                } catch (err) {
                    iter = buffer.length > 0 ? iterSeq(buffer, iter) : iter;
                    yields.splice(0, yields.length);
                    break;
                }
            }
        }

        if (!done) {
            throw new ParserError('Invalid data', prev);
        }

        yield* yields;

        if (opts.token) {
            yield {
                type: opts.token,
                value: opts.tokenValue?.(value) ?? value
            }
        }

        const token = {
            type: 'OR',
            value
        };

        return [token, iter];
    };
}

export function repeat<T = unknown, R = unknown>(
    parser: Parser<T, R>,
    opts: RepeatOptions<T[]> = {}
): Parser<T | T[], R[]> {
    return function* (source, prev) {
        const
            {min = 1, max = Infinity} = opts;

        const
            value: T[] = [],
            yields: ParserToken<T | T[]>[] = [];

        let
            iter = intoIter(source),
            count = 0,
            data;

        const
            globalBuffer: string[] = [];

        outer: while (true) {
            const
                buffer: string[] = count >= min ? [] : globalBuffer,
                parsing = parser(intoBufIter(iter, buffer), prev);

            while (true) {
                if (count >= max) {
                    yield* yields;
                    break outer;
                }

                try {
                    const
                        chunk: any = parsing.next(data);

                    if (chunk.done) {
                        prev = chunk.value[0];
                        iter = intoIter(chunk.value[1]);

                        value.push(<any>prev);
                        count++;

                        if (count >= min) {
                            yield* yields;
                            yields.splice(0, yields.length);
                        }

                        break;

                    } else {
                        if (chunk.value === ParserState.EXPECT_NEW_INPUT) {
                            data = yield chunk.value;

                            if (data == null) {
                                throw new ParserError('Invalid input', prev);
                            }

                            iter = intoIter(data);

                        } else {
                            yields.push(chunk.value);
                        }
                    }

                } catch (err) {
                    if (count < min) {
                        throw err;
                    }

                    iter = buffer.length > 0 ? iterSeq(buffer, iter) : iter;
                    break outer;
                }
            }
        }

        if (opts.token && count > 0) {
            yield {
                type: opts.token,
                value: opts.tokenValue?.(value) ?? value
            }
        }

        const token = {
            type: 'REPEAT',
            value
        };

        return [token, iter];
    };
}

export function opt<T = unknown, R = unknown>(
    parser: Parser<T, R>,
    opts?: ParserOptions<T[]>
): Parser<T | T[], R[]> {
    return repeat(parser, {min: 0, max: 1, ...opts})
}

export const
    ws = take(/\s/, {min: 0});