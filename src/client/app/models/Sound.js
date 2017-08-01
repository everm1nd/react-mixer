class Sound {
  constructor({ name, path }) {
    this.name = name
    this.path = path
  }

  static search(term) {
    return [
      new Sound({ name: 'Birds', path: 'birds.wav' }),
      new Sound({ name: 'Rain', path: 'rain.wav' })
    ];
  }
}

export default Sound;
