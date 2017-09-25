## REACT MIXER 🎧🎚🎛
[![Build Status](https://travis-ci.org/everm1nd/react-mixer.svg?branch=master)](https://travis-ci.org/everm1nd/react-mixer)

WebAudio-based sound mixer for FreeSoung.org sounds.

#### DEMO
You can find it [here](https://react-mixer.herokuapp.com/) 🔊.

#### INSTALLATION

* Install yarn (https://yarnpkg.com/en/docs/install)
* Run `yarn` in the project folder
* Wait until all packages are installed

#### COMPILATION

Run `yarn build` to build a repo. Run `yarn watch` to build and watch for changes.

#### SERVING

Run `yarn serve` and navigate to http://localhost:8080. This will build, watch and serve data with `webpack-dev-server`.

In production you can use `npm start`, which will serve data from `./src/client`. Manual prebuild is required.

#### TEST

Run `yarn test` or `yarn test:watch` to check code.
Linting is possible with `yarn lint` and `yarn lint:fix`.
