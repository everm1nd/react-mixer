import axios from 'axios';
import deepmerge from 'deepmerge';

const baseUrl = 'http://freesound.org/apiv2'
const globalToken = process.env.FREESOUND_API_KEY

class FreeSound {
  constructor({ token = globalToken }) {
    this.token = token
  }

  urlFor(resource, params = {}) {
    params['token'] = this.token
    return `${baseUrl}/${resource}/`
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
