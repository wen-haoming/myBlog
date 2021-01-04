let isMount = true;
let workInProgressHook = null; // 指向我们当前运行hooks的指针

// 每种组件都有自己对应的fiber节点
const fiber = {
    stateNode: App,
    memoizedState: null // 保存对应hooks的数据 
}

function useState(initialState) {
    let hook;
    if (isMount) {
        hook = {
            memoizedState: initialState, // 创建的时候对应的 hook 的 memoizedState 就是 initialState
            next: null,
            queue: {
                pending: null // 如果我们调用多次 action 的时候就会把它放进
            }
        }
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook; // 如果没有值的话就是第一个
        } else {
            workInProgressHook.next = hook
        }
        workInProgressHook = hook;
    } else {
        hook = workInProgressHook
        workInProgressHook = workInProgressHook.next;
    }
    let baseState = hook.memoizedState

    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next;
        do {
            const action = firstUpdate.action;
            baseState = action(baseState)
            firstUpdate = firstUpdate.next
        } while (firstUpdate !== hook.queue.pending.next)
        hook.queue.pending = null;
    }
    hook.memoizedState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
    const update = {
        action,
        next: null
    }

    if (queue.pending === null) { // 实现一个环状链表
        // u0 -> u0 -> u0
        update.next = update;
    } else {
        update.next = queue.pending.next
        queue.pending.next = update
    }
    queue.pending = update
    schedule()
}

// 支撑我们mini react-hooks能运行起来需要这个 schedule 函数
function schedule() {
    workInProgressHook = fiber.memoizedState
    const app = fiber.stateNode();// 触发组件的render
    isMount = false;
    return app
}

function App() {
    const [num, updateNum] = useState(0)

    return {
        onClick() {
            updateNum(num => num + 1)
        }
    }
}

window.app = schedule()