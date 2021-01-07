
const fiber = {
    stateNode:App,
    memoizedState:null
}

let isMount = true;
let workInProgressHook = null


function useState(initialState){
    let hook
    if(isMount){
        hook = {
            memoizedState:initialState,
            queue:{
                pending:null
            },
            next:null
        } 
        if(!workInProgressHook){
            fiber.memoizedState = hook
        }else{
             workInProgressHook.next = hook
        }
        workInProgressHook = hook
    }else{
        hook = workInProgressHook
        workInProgressHook =  workInProgressHook.next
    }

    let baseState = hook.memoizedState
    if(hook.queue.pending){
        let firstUpdate = hook.queue.pending
        do{
            let action = firstUpdate.action
            baseState = action(baseState)
            firstUpdate = firstUpdate.next
        }while(hook.queue.pending!== firstUpdate)
        hook.queue.pending = null;
        hook.memoizedState = baseState
    }

    return [baseState,dispatchAction.bind(null,hook.queue)]
}

function dispatchAction(queue, action){
    let update = {
        action,
        next:null
    }

    if(queue.pending === null){
        update.next = update
    }else{
        update.next = queue.pending.next;
        queue.pending.next = update
    }
    queue.pending = update
    schedule();
}

function schedule(){
    workInProgressHook = fiber.memoizedState
   let app =  fiber.stateNode();
    isMount = false 
    return app
}


function App(){
    const [num,  setNum] = useState(0)
    const [num1,setNum1] = useState(10)
    const [num2,setNum2] = useState(0)

    console.log(num,'num');
    console.log(num1,'num1');

    return {
        onClick(){
            setNum(num=>num+1)
            setNum(num=>num+1)
            setNum(num=>num+1)
        },
        onFocus(){
            setNum1(num=>num+10)
            setNum1(num=>num+10)
            setNum1(num=>num+10)
        }
    }
}

window.app = schedule()
