import FreeSound from "models/adapters/FreeSound"

const adapter = new FreeSound({})

class Sound {
  constructor({ name, path, duration }) {
    this.name = name
    this.path = path
    this.duration = duration
  }

  static fromFreesound(data) {
    return new Sound({
      name: data.name,
      path: data.previews["preview-hq-ogg"],
      duration: data.duration
    })
  }

  static all() {
    return [
      new Sound({ name: "Birds", path: "birds.wav" }),
      new Sound({ name: "Rain", path: "rain.wav" })
    ]
  }

  static search(query) {
    if (query === undefined) throw new Error("Search query should be set")
    return adapter.search(query).then(
      response => response.data.results.map(Sound.fromFreesound)
    )
  }
}

export default Sound
