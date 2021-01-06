

let isMount = true;
let workInProgressHook = null;

const fiber = {
    stateNode: App,
    memoizedState:null,
}


function useState(initialState){
    let hook
    if(isMount){
        hook = {
            memoizedState:initialState,
            next:null
        }
        if(!fiber.memoizedState){
            fiber.memoizedState = hook;
        }else{
            workInProgressHook.next = hook
        }
        workInProgressHook = hook;
    }else{
        hook = workInProgressHook
        workInProgressHook = workInProgressHook.next
    }
    
    // todo 
    
}

function dispatchAction(queue,action){
    const update = {
        action,
        next:null
    }
    if(queue.pending === null) {
        update.next = update
    }else{
        update.next = queue.pending.next
        queue.pending.next = update
    }
        
    queue.pending = update
    
    schedule();
}

function schedule(){
    const app = fiber.stateNode();

    workInProgressHook = fiber.memoizedState // 当每次执行schedule的时候都重新复位一下
    isMount = false;
    return app
}

function App() {
    const [num,  updateNum]  = useState(0)
    const [num2, updateNum2] = useState(0)
    const [num3, updateNum3] = useState(0)
    const [num4, updateNum4] = useState(0)

    return {
        onClick() {
            updateNum(num => num + 1)
            updateNum(num => num + 1)
            updateNum(num => num + 1)
            updateNum(num => num + 1)
        }
    }
}

window.app = schedule();