# wasd2021

## manual installation and running

```shell
# install nodecg
$ git clone --depth 1 --branch v1.7.4 git@github.com:nodecg/nodecg.git
$ cd nodecg
$ npm ci

# install bundles
$ cd bundles

# nodecg-speedcontrol
$ git clone --depth 1 --branch v2.2.0 git@github.com:speedcontrol/nodecg-speedcontrol.git
$ cd nodecg-speedcontrol
$ npm ci
$ cd ..

# nodecg-tiltify
$ git clone --depth 1 git@github.com:daniellockard/nodecg-tiltify.git
$ cd nodecg-tiltify
$ npm ci
$ cd ..

# nodecg-spotify
$ git clone --depth 1 git@github.com:jai-x/nodecg-spotify.git
$ cd nodecg-spotify
$ npm ci
$ cd ..

# wasd2021
$ git clone --depth 1 git@github.com:jai-x/wasd2021.git
$ cd wasd2021
$ npm ci

# config
$ cp cfg/* ../../cfg

# build
$ npm run build

# run
$ npm run start
```

## use with docker

```shell
# build
$ docker build -t wasd2021:dev .

# run
$ docker run -p 9090:9090 wasd2021:dev
```
