# wasd2021

## about

This is a [NodeCG](https://nodecg.dev) bundle used for broadcast graphics for
the videogame speedrunning marathon event [Warwick's Awesome Speedruns & Demos
2021](https://wasd.warwick.gg).

### dependant NodeCG bundles

* [`nodecg-speedcontrol`](https://github.com/speedcontrol/nodecg-speedcontrol)
  for run detail management, run timing and Twitch detail integration
* [`nodecg-tiltify`](https://github.com/daniellockard/nodecg-tiltify) for
  pulling donation and reward information for a campaign from Tiltify.com
* [`ncg-spotify`](https://github.com/EwanLyon/ncg-spotify) for displaying the
  currently playing song used as background music being played via Spotify

### dependant JS packages

* [`mithril`](https://mithril.js.org) for a hyperscript based framework for
  creating the web graphics and interfaces.
* [`gsap`](https://greensock.com/gsap) for providing animations for web graphics
* [`fitty`](https://github.com/rikschennink/fitty) for dynamically resizing text
  to fit in dimension in web graphics.
* [`lodash`](https://lodash.com) for the `get` function to fetch deeply nested
  values
* [`moment`](https://momentjs.com) for providing time conversion convenience
  functions
* [`rollup`](https://rollupjs.org) and it's plugins for bundling the source JS
  code and it's assets for use with NodeCG.

## screenshots

### break screen

![The WASD2021 NodeCG break screen overlay](./.github/break_screen.png)

### game screen

![The WASD2021 NodeCG game screen overlay](./.github/game_screen.png)

## installation

### clone and install NodeCG and bundles

```shell
# install nodecg
$ git clone --depth 1 --branch v1.8.1 git@github.com:nodecg/nodecg.git
$ cd nodecg
$ npm ci

# install bundles
$ cd bundles

# nodecg-speedcontrol
$ git clone --depth 1 --branch v2.3.0 git@github.com:speedcontrol/nodecg-speedcontrol.git
$ cd nodecg-speedcontrol
$ npm ci
$ cd ..

# nodecg-tiltify
$ git clone --depth 1 git@github.com:daniellockard/nodecg-tiltify.git
$ cd nodecg-tiltify
$ npm ci
$ cd ..

# ncg-spotify
$ git clone --depth 1 git@github.com:EwanLyon/ncg-spotify.git
$ cd ncg-spotify
$ npm ci
$ cd ..

# wasd2021
$ git clone --depth 1 git@github.com:jai-x/wasd2021.git
$ cd wasd2021
$ npm ci
```

### build

```shell
$ cd wasd2021/bundles/wasd2021
$ npm run build
```

### configuration

Copy the JSON config files to `/nodecg/cfg`.

```shell
$ cp cfg/* ../../cfg
```

Edit the JSON files in `/nodecg/cfg` to populate them with credentials.
See the README files of the dependent NodeCG bundles for how to obtain these
credentials.

### running

```shell
$ npm run start
```

### or use docker

```shell
# build
$ docker build -t wasd2021:dev .

# run
$ docker run -p 9090:9090 wasd2021:dev
```

## license

All source code in this repository is licensed under the MIT license, aside from
exceptions mentioned below. See the [license.txt](./license.txt) file for full
license terms.

### exceptions

* Obtained from [fonts.google.com](https://fonts.google.com) and is licensed
  under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0):
  * [`src/dashboard/assets/roboto-v20-latin-regular.woff2`](./src/dashboard/assets/roboto-v20-latin-regular.woff2)

* Obtained from [1001Fonts](https://1001fonts.com) and is licensed under the
  [1001Fonts Free For Commercial Use License](https://www.1001fonts.com/licences/ffc.html):
  * [`src/graphics/assets/daggersquare-oblique.otf`](./src/graphics/assets/daggersquare-oblique.otf)

* Obtained from the [WASD Organisers](https://wasd.warwick.gg) and is copyright
  of the WASD Organisers, used with permission:
  * [`src/graphics/assets/wasd-avatar.png`](./src/graphics/assets/wasd-avatar.png)
  * [`src/graphics/assets/wasd-keys.svg`](./src/graphics/assets/wasd-keys.svg)

* Obtained from [Font Awesome](https://fontawesome.com) and is licensed under
  the [Create Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0):
  * [`src/graphics/assets/microphone-alt-solid.svg`](./src/graphics/assets/microphone-alt-solid.svg)
  * [`src/graphics/assets/running-solid.svg`](./src/graphics/assets/running-solid.svg)
  * [`src/graphics/assets/twitch-brands.svg`](./src/graphics/assets/twitch-brands.svg)

* Obtained from [SpecialEffect](https://www.specialeffect.org.uk) and is
  Copyright of SpecialEffect, used with permission:
  * [`src/graphics/assets/specialeffect-white.png`](./src/graphics/assets/specialeffect-white.png)

* Obtained from [Twitch](https://twitch.tv) and is Copyright of Twitch
  Interactive, Inc:
  * [`src/graphics/assets/not_like_this.png`](./src/graphics/assets/not_like_this.png)

