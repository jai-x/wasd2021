FROM node:current

RUN apt update && \
    apt upgrade -y && \
    apt install -y bash git neovim

# install nodecg
WORKDIR /nodecg
RUN git clone --depth 1 --branch v1.7.4 https://github.com/nodecg/nodecg.git .
RUN npm ci

# install bundles

# nodecg-speedcontrol
WORKDIR /nodecg/bundles
RUN git clone --depth 1 --branch v2.2.0 https://github.com/speedcontrol/nodecg-speedcontrol.git
WORKDIR /nodecg/bundles/nodecg-speedcontrol
RUN npm ci

# nodecg-tiltify
WORKDIR /nodecg/bundles
RUN git clone --depth 1 https://github.com/daniellockard/nodecg-tiltify.git
WORKDIR /nodecg/bundles/nodecg-tiltify
RUN npm ci

# nodecg-spotify
WORKDIR /nodecg/bundles
RUN git clone --depth 1 https://github.com/jai-x/nodecg-spotify.git
WORKDIR /nodecg/bundles/nodecg-spotify
RUN npm ci

# wasd2021
WORKDIR /nodecg/bundles/wasd2021
COPY package.json package-lock.json rollup.config.js ./
COPY src/ ./src/

RUN npm ci
RUN npm run build

WORKDIR /nodecg
RUN cp /nodecg/bundles/wasd2021/cfg ./cfg

EXPOSE 9090

ENTRYPOINT ["node", "/nodecg/index.js"]
