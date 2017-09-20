import FreeSound from "models/adapters/FreeSound"

const pageSize = 20
const adapter = new FreeSound({})

class Sound {
  constructor({ name, path, duration, waveform }) {
    this.name = name
    this.path = path
    this.duration = duration
    this.waveform = waveform
  }

  static fromFreesound(data) {
    return new Sound({
      name: data.name,
      path: data.previews["preview-hq-ogg"],
      duration: data.duration,
      waveform: data.images["waveform_m"]
    })
  }

  static all() {
    return [
      new Sound({ name: "Birds", path: "birds.wav" }),
      new Sound({ name: "Rain", path: "rain.wav" })
    ]
  }

  static search(query, params = {}) {
    if (query === undefined) throw new Error("Search query should be set")
    const mergedParams = Object.assign({}, { page_size: pageSize }, params)
    return adapter.search(query, mergedParams).then(
      response => {
        const pageCount = Math.ceil(response.data.count / pageSize)
        return {
          pageCount,
          sounds: response.data.results.map(Sound.fromFreesound)
        }
      }
    )
  }
}

export default Sound
