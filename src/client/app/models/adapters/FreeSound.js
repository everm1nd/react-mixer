import axios from 'axios';
import deepmerge from 'deepmerge';

const BASE_URL = 'http://freesound.org/apiv2'
const GLOBAL_TOKEN = process.env.FREESOUND_API_KEY

class FreeSound {
  constructor({ token = GLOBAL_TOKEN }) {
    this.token = token
  }

  urlFor(resource, params = {}) {
    params['token'] = this.token
    return `${BASE_URL}/${resource}/`
  }

  search(query, params = {}) {
    const resourceUrl = this.urlFor('search/text')
    const defaultParams = {
      params: {
        query,
        token: this.token,
        fields: ['name', 'previews', 'download']
      }
    }
    const mergedParams = deepmerge(defaultParams, params, {
      arrayMerge: (dest, source) => source
    })
    mergedParams.params.fields = mergedParams.params.fields.join(',')
    return axios.get(resourceUrl, mergedParams)
  }
}

export default FreeSound;
