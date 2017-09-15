import FreeSound from "models/adapters/FreeSound"

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
    return adapter.search(query, params).then(
      response => response.data.results.map(Sound.fromFreesound)
    )
  }
}

export default Sound
