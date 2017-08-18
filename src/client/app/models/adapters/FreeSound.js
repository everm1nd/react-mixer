import axios from 'axios';

const baseUrl = 'http://freesound.org/apiv2'
const globalToken = process.env.FREESOUND_API_KEY

class FreeSound {
  constructor({ token = globalToken }) {
    this.token = token
  }

  renderParams(params) {
    return Object.keys(params).map(function(key) {
        return [key, params[key]].map(encodeURIComponent).join("=");
    }).join("&");
  }

  urlFor(resource, params = {}) {
    params['token'] = this.token
    return `${baseUrl}/${resource}/?${this.renderParams(params)}`
  }

  search(query, fields = ['name', 'previews', 'download']) {
    const resourceUrl = this.urlFor('search/text', {
      query,
      fields
    })
    return axios.get(resourceUrl)
  }
}

export default FreeSound;
