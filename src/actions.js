export const TYPES = {
    SET_TOKEN: 'SET_TOKEN',
    SET_SERVICE: 'SET_SERVICE',
};

export const setToken = token => ({
    type: TYPES.SET_TOKEN,
    payload: token,
});
