import {
    UPDATE_LOCATION
} from './actions/app';

const initState = {
    page: 'Dashboard'
};

const app = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
        return {
            ...state,
            page: action.page,
        };
        default:
        return state;
    } 
}

export default app;
