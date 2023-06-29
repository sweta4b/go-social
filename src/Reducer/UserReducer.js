export default function userReducer(state, action){
    switch(action.type){
        case "get_user":
            return (state = action.payload)
        case "update_user":
            return state.map((user) => (user._id === action.payload._id ? action.payload : user));
            default:
                return state;
    }
}