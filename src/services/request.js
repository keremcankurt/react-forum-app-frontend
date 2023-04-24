function request(url, data = false, method = 'GET') {
    return new Promise(async (resolve, reject) => {
        const options = {
            method,
            credentials: 'include'
        }
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data)
            options.headers = {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const result = await response.json()
        if (response.ok) {
            resolve(result)
        }
        else {
            reject({message: result.error||result.message, status: response.status})
        }
    })
}

export const post = (url, data) => request(url, data, 'POST')
export const put = (url, data) => request(url, data, 'PUT')
export const del = (url, data) => request(url, data, 'DELETE')
export const get = url => request(url)