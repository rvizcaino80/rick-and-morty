/*
 *A custom fetch wrapper by Rogers Vizcaino
 *rvizcaino@gmail.com
 */

class FetchError extends Error {
  constructor(message, res) {
    super(message)
    this.response = res
  }
}

class FetchWrapper {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async get(url) {
    const response = await fetch(`${this.baseUrl}${url}`)

    if (!response.ok) {
      throw new FetchError('Bad fetch response', res)
    }

    return response.json()
  }

  async post(url, data) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  }
}

export {
  FetchWrapper
}
