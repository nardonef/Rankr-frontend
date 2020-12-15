export const ADD_TOKEN = 'ADD_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'
export const ADD_EMAIL = 'ADD_EMAIL'

export function addToken(tokens) {
    return {
        type: ADD_TOKEN,
        tokens
    }
}

export function deleteToken() {
    return {
        type: DELETE_TOKEN
    }
}

export function addEmail(email) {
    return {
        type: ADD_EMAIL,
        email
    }
}