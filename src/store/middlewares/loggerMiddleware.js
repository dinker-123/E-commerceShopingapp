export function loggerMiddleware(store) {
    return function (next) {
        return function (action) {
            console.log(`[LOG]: ${action.type} dispatched at ${new Date().toLocaleTimeString()}.`);
            next(action);
        };
    };
};