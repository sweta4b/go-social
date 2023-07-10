export default function postReducer(state, action) {
  switch(action.type){
    case "get_post":
        return {...state, post: action.payload};
    case "sort" :
        return {...state, sortby: action.payload};
    case "user_post":
        return {...state, userpost: action.payload};
    default:
        return state;
  }
}