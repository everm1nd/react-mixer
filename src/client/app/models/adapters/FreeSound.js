import axios from 'axios';

const baseUrl = 'http://freesound.org/apiv2'
const globalToken = process.env.FREESOUND_API_KEY

class FreeSound {
  constructor({ token = globalToken }) {
    this.token = token
  }

  urlFor(resource, params = {}) {
    params['token'] = this.token
    return `${baseUrl}/${resource}`
  }

  search(query, fields = ['name', 'previews', 'download']) {
    const resourceUrl = this.urlFor('search/text')
    const params = {
      params: {
        token: this.token,
        query,
        fields
      }
    }
    return axios.get(resourceUrl, params)
  }
}

export default FreeSound;
