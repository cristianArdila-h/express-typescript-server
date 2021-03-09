import  app  from "./app";
import http from 'http';
import { getVariable } from './config';

let server: http.Server | undefined;
let port: string | number | false;

(async () => {
    try {
        /**
         * Get port from environment and store in Express.
         */
        port = normalizePort(getVariable('PORT'));
        app.set('port', port);
        /**
         * Create HTTP server.
         */
        server = http.createServer(app);
        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port);
        //server.on('error', onError);
        //server.on('listening', onListening);
    } catch (error) {
        //debug('[ERROR] Could not start application: ', error);
        console.log('[ERROR] Could not start application: ', error);
    }
})();


/**
 * Normalize a port into a number, string, or false.
 */

export function normalizePort(val: string) {
    const nPort = parseInt(val, 10);
    if (isNaN(nPort)) {
        return val;
    }
    if (nPort >= 0) {
        return nPort;
    }
    return false;
}
