
export let adminInitialState = localStorage.getItem("Admin");

export const adminreducer = (adminState, action) =>{
    if(action.type === "ADMIN"){
        return [action.payload,
        localStorage.setItem("Admin", action.payload)]
    }

    return adminState; 
    
}
