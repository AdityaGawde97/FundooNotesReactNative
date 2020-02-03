const initialState = {
    toggleView: false
}

const ViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_Grid_View': return {
            ...state,
            toggleView: !state.toggleView
        }

        default: return state
    }
};

export default ViewReducer;