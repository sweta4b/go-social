export default function bookmarkReducer(state, action) {
    switch (action.type) {
        case "set_bookmark":
            return { ...state, bookmark: action.payload }
        default:
            return state;
    }
}