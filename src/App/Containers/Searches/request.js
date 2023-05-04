import 'whatwg-fetch';
import { Auth, Hub } from 'aws-amplify';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }

    return response.json().then(json => {
        if (response.ok) {
            return json;
        }

        const error = {
            response: {
                status: response.status,
                statusText: response.statusText,
                ...json,
            },
        };

        return Promise.reject(error);
    });
}

const later = (func, ...args) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            func
                .apply(this, args)
                .then(resolve)
                .catch(reject);
        }, 1000),
    );

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options, retry = 3) {
    return fetch(url, options)
        .then(parseJSON)
        .catch(error => {
            if (error.response.status === 401) {
                if (retry > 1) {
                    return Auth.currentSession().then(session => {
                        options.headers.Authorization = `Bearer ${session.idToken.jwtToken}`;
                        Hub.dispatch('auth', { event: 'signIn', data: '' });
                        return later(request, url, options, retry - 1);
                    });
                }
            }
            throw error;
        });
}