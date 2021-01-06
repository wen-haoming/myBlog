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
            queue: {
                pending: null
            },
            memoizedState: initialState,
            next: null
        }
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        } else {
            workInProgressHook.next = hook;
        }
        workInProgressHook = hook;
    } else {
        hook = workInProgressHook;
        workInProgressHook = workInProgressHook.next;
    }

    let baseState = hook.memoizedState;
    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next;

        do {
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
        } while (firstUpdate !== hook.queue.pending)

        hook.queue.pending = null;
    }
    hook.memoizedState = baseState;

    return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
    // 创建update
    const update = {
      action,
      next: null
    }
  
    // 环状单向链表操作
    if (queue.pending === null) {
      update.next = update;
    } else {
      update.next = queue.pending.next;
      queue.pending.next = update;
    }
    queue.pending = update;
  
    // 模拟React开始调度更新
    schedule();
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