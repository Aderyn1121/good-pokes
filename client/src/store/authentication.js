import { backendUrl } from '../utils';

const TOKEN_KEY = 'goodpokes/authentication/token';
const SET_TOKEN = 'goodpokes/authentication/SET_TOKEN';
const REMOVE_TOKEN = 'goodpokes/authentication/REMOVE_TOKEN';
const USER_ID = 'goodpokes/authentication/USER';
const SET_USER = 'goodpokes/authentication/SET_USER';
const REMOVE_USER = 'goodpokes/authentication/REMOVE_USER';

export const removeToken = token => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });
export const setUser = user => ({ type: SET_USER, user });
export const removeUser = user => ({ type: REMOVE_USER });

export const loadToken = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const userId = window.localStorage.getItem(USER_ID);
    if (token) {
        dispatch(setToken(token));
    }
    if (userId) {
        dispatch(setUser(userId));
    }
};

export const signUp = (email, password, confirmPassword, userName, birthday, pronouns, starter) =>
    async dispatch => {
        const response = await fetch(`${backendUrl}/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                confirmPassword,
                userName,
                birthday,
                pronouns,
                starter
            })
        });

        if (!response.ok) {
            console.log(response);
            const { errors } = await response.json();
            return errors;
        }

        if (response.ok) {
            const { token, user: { id } } = await response.json();
            const userId = id;
            window.localStorage.setItem(TOKEN_KEY, token);
            window.localStorage.setItem(USER_ID, userId);
            dispatch(setToken(token));
            dispatch(setUser(userId));
            return null;
        }
    }

export const login = (email, password) => async dispatch => {
    const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        console.log(response);
        const { errors } = await response.json();
        return errors;
    }

    if (response.ok) {
        const { token, user } = await response.json();
        const userId = user.id;
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem(USER_ID, userId);
        dispatch(setToken(token));
        dispatch(setUser(userId));
        return null;

    }
};

export const logout = () => async (dispatch, getState) => {
    // const { authentication: { token } } = getState();
    // const response = await fetch(`${backendUrl}/session`, {
    //     method: 'delete',
    //     headers: { Authorization: `Bearer ${token}` },
    // });

    // if (response.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_ID);
    dispatch(removeToken());
    dispatch(removeUser());
    // }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            };
        }

        case SET_USER: {

            return {
                ...state,
                userId: action.user
            }
        }

        case REMOVE_TOKEN: {
            const newState = { ...state };
            delete newState.userId
            delete newState.token;
            return newState;
        }

        default: return state;
    }
}
