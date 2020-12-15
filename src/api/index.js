import {store} from '../redux/store';
import {addToken} from '../redux/actions'

const api = async (method, path, tokens, email, body) => {
    console.log(path);
    console.log(method);
    console.log(tokens);

    if (tokens === {}) {
        return;
    }

    let options = {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }

    if (tokens) {
        options.headers.Authorization = tokens.id_token;
    }

    if (email) {
        options.headers['x-user-email'] = email;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`https://p7fnfzy6m5.execute-api.us-east-1.amazonaws.com/Prod${path}`, options)
    console.log(res.status);

    if (res.status === 401) {
        console.log('here');
        const newTokens = await api('POST', '/refresh', null, email, {tokens})
        store.dispatch(addToken(newTokens));
        return await api(method, path, newTokens, email, body);
    }

    if (!res.ok) {
        throw await res.json();
    }

    const response = await res.json();
    console.log(response);
    return response;
}

export default api