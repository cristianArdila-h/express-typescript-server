

const ENV_CONFIG: { [key: string]: string } = {
    API_KEY_TVS: process.env.API_KEY_TVS || 'pendiente',
    API_PATH: process.env.API_PATH || '',
    BALANCE_MANAGEMENT_API_ENDPOINT: process.env.BALANCE_MANAGEMENT_API_ENDPOINT
        || 'pendiente end point del api',
    PORT: process.env.PORT || '9702'
};

const getVariable = (key: string): string => {
    try {
        return ENV_CONFIG[key];
    } catch (err) {
        // debug(`config error: %j`, err);
        throw new Error('failed to get variable');
    }
};

export { getVariable };
