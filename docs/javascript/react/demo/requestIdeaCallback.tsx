import React, { useEffect } from 'react';

function sleep(delay: number) {
    for (const start = Date.now(); Date.now() - start <= delay; ) {}
}

const works: Array<() => void> = [
    () => {
        console.log('第1个任务开始');
        // sleep(200);
        console.log('第1个任务结束');
    },
    () => {
        console.log('第2个任务开始');
        sleep(20);
        console.log('第2个任务结束');
    },
    () => {
        console.log('第3个任务开始');
        // sleep(20);
        console.log('第3个任务结束');
    },
];

window.requestIdleCallback(workLoop, { timeout: 1000 });

function workLoop(deadline) {
    // performUnitOfWork();
    console.log(`本帧的剩余时间为${parseInt(deadline.timeRemaining())}`);
    console.log(deadline.timeRemaining());
    while (
        (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
        works.length > 0
    ) {
        performUnitOfWork();
    }
    if (works.length > 0) {
        // window.requestIdleCallback(workLoop, { timeout: 1000 });
    }
}

function performUnitOfWork() {
    (works.shift() as () => void)();
}

export default () => {
    return (
        <div>
            <div></div>
        </div>
    );
};
