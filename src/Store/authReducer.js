const initialState  = {
  currentUser: null
}


export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_ CURRENTUSER": 
    return {
      ...state,
      currentUser: action.payload
    }
    default: 
    return {...state}
  }
}
