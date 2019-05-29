export const TYPES = {
    SET_TOKEN: 'SET_TOKEN',
    SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
    SET_SERVICE: 'SET_SERVICE',
    ADD_DEVICE: 'ADD_DEVICE',
};

export const setToken = token => ({
    type: TYPES.SET_TOKEN,
    payload: token,
});

export const setRefreshToken = token => ({
    type: TYPES.SET_REFRESH_TOKEN,
    payload: token,
});

export const addDevice = device => ({
    type: TYPES.ADD_DEVICE,
    payload: device,
});
