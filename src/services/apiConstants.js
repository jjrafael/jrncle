import api from './api'

const apiConstants = {}

const requests = {}

const keys = {
  origins: `/rest/origins?onlyDisplayed=true`,
  lines: `/rest/lines?onlyActiveLines=true&agentId=-4`,
}

export function fetchConstants(keysArray) {
  var promises = []
  for (var i = 0; i < keysArray.length; i++) {
    const key = keysArray[i]
    let target = keys[key]
    let url, headers
    if (typeof target === 'object') {
      url = target.url
      headers = target.headers
    } else {
      url = target
      headers = {}
    }
    var promise = new Promise((resolve, reject) => {
      if (apiConstants[key]) {
        resolve(apiConstants[key])
      } else {
        if (requests[key]) {
          requests[key].abort()
        }
        requests[key] = api.get(url, {
          successCallback: response => {
            apiConstants[key] = response
            delete requests[key]
            resolve(apiConstants[key])
          },
          errorCallback: (xhr, status, error) => {
            delete requests[key]
            reject(xhr)
          },
          headers,
        })
      }
    })
    promises.push(promise)
  }

  return Promise.all(promises)
    .then(response => {
      response = apiConstants
      return { response }
    })
    .catch(xhr => ({ xhr }))
}
