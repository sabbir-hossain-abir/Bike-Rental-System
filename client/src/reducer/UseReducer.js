
export let initialState = localStorage.getItem("User");

export const reducer = (state, action) =>{
    if(action.type === "USER"){
        return [action.payload,
        localStorage.setItem("User", action.payload)]
    }

    return state; 
    
}
