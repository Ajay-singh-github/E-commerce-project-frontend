var initialState={  
    mycart:{},
    user:{}
    }
    export default function RootReducer(state=initialState,action)
    {
        switch(action.type)
        {
            case "ADD_PRODUCT":
                state.mycart[action.payload[0]]=action.payload[1]
                console.log("STATE:",state.mycart)
                return {mycart:state.mycart,user:state.user}                      

    
            case "EDIT_PRODUCT":
                    state.mycart[action.payload[0]]=action.payload[1]
                    console.log("STATE:",state.mycart)
                    return {mycart:state.mycart,user:state.user}                      
    
    
            case "REMOVE_PRODUCT":
                        delete state.mycart[action.payload[0]]
                        console.log("STATE:",state.mycart)
                        return {mycart:state.mycart,user:state.user}                      

            case "ADD_USER":
                        state.user[action.payload[0]]=action.payload[1]
                        console.log("STATE:",state.user)
                        return {mycart:state.mycart,user:state.user}                      
            default:
                return {mycart:state.mycart,user:state.user}                      
            }
    
    
    }
    