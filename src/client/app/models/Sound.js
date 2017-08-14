class Sound {
  constructor({ name, path }) {
    this.name = name
    this.path = path
  }

  static all() {
    return [
      new Sound({ name: 'Birds', path: 'birds.wav' }),
      new Sound({ name: 'Rain', path: 'rain.wav' })
    ];
  }

  static search(query) {
    if (!query) throw new Error("Search query should be set")
    return this.all().filter((sound) => sound.name.match(new RegExp(query, "i")))
  }
}

export default Sound;
