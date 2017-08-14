class Sound {
  constructor({ name, path }) {
    this.name = name
    this.path = path
  }

  static search(term) {
    const sounds = [
      new Sound({ name: 'Birds', path: 'birds.wav' }),
      new Sound({ name: 'Rain', path: 'rain.wav' })
    ];
    if (term) return sounds.filter((sound) => sound.name.match(new RegExp(term, "i")))
    return sounds;
  }
}

export default Sound;
