import * as qs from 'qs'
import fetch from 'isomorphic-fetch'
// import {store} from '../index'
export default opts => store => next => action => {

    const { sync, data, ...others } = action
    const kc =  store.getState().keycloak;
    // ////console.log("keycloak store data" ,kc);
    // const token = localStorage.getItem('token')
    const token = kc.token;

    if (!sync) {
        return next(action)
    }

    let {
        url,
        method,
        headers,
        ignoreData,
        body,
        ...reqOpts,
    } = sync

    const req = {
        ...reqOpts,
        method: method.toUpperCase(),
        headers: Object.assign({},
            headers,
            token ? { Authorization: 'bearer ' + kc.token } : {},
            { 'Content-Type': 'application/json' },
            // {'mode': 'no-cors'}
            // { 'X-CSRF-Token': csrf }
        ),
        // credentials: 'include',
    }

    if (data && !ignoreData || body) {
        if (['get', 'delete'].indexOf(method.toLowerCase()) !== -1) {
            url += '?'+ qs.stringify(body || data)
        } else {
            req.body = JSON.stringify(body || data)
        }
    }

    next({ ...others, data, loading: true })
    return fetch(opts.baseURL + url, req)
        .then(response => {

            if (!response.ok) throw new Error(response.statusText)

            if (response.status == 204) // no content to parse... sooooo....
                return Promise.resolve({ ...others, data, headers: response.headers, status: response.status }).then(next)

            return response.json().then(json =>
                Promise.resolve({
                    ...others,
                    data,
                    response: json,
                    headers: response.headers,
                    status: response.status })
                .then(next)
            )
        })
        .catch(error => Promise.resolve({ ...others, data, error, status:404}).then(next))}
