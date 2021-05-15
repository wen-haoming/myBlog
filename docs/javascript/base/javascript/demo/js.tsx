/**
 * desc: 'https://www.fileformat.info/info/unicode/block/basic_latin/list.htm 这个地址对每个字符都有对应的解释，其中比较重要有 [U+000A](https://www.fileformat.info/info/unicode/char/000a/index.htm)，[U+0020](https://www.fileformat.info/info/unicode/char/0020/index.htm)'
 */

import React from 'react';

export default () => {
    return (
        <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
            {Array(128)
                .fill('')
                .map((_, idx) => (
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginRight: 15,
                            marginBottom: 10,
                        }}
                    >
                        <span>{idx}</span>
                        <a
                            target="_blank"
                            href={`https://www.fileformat.info/info/unicode/char/00${idx.toString(
                                16,
                            )}/index.htm`}
                        >{`U+00${idx.toString(16)}`}</a>
                        <span
                            style={{
                                background: 'lightgreen',
                                display: 'inline-block',
                                textAlign: 'center',
                            }}
                        >
                            {`${String.fromCharCode(idx)}`}
                        </span>
                    </span>
                ))}
        </div>
    );
};
