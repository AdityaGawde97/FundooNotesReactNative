const initialState = {
    uid: ''
}

const UidReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_UID' : return {
            ...state,
            uid: action.payload
        }     
        
        default: return state
    }
};

export default UidReducer;