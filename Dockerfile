FROM node:alpine

ARG branch=master

ENV NODE_ENV production
WORKDIR /opt/magic_mirror

RUN apk add --no-cache git

RUN git clone --depth 1 -b ${branch} https://github.com/MichMich/MagicMirror.git .
RUN cp -R modules /opt/default_modules
RUN cp -R config /opt/default_config
RUN npm install --unsafe-perm --silent


RUN git clone --depth 1 -b master https://github.com/heskja/MMM-CalendarWeek.git ./modules/MMM-CalendarWeek \
	&& git clone --depth 1 -b master https://github.com/mykle1/MMM-EARTH.git ./modules/MMM-EARTH \
	&& git clone --depth 1 -b master https://github.com/idoodler/MMM-ENV-Provider.git ./modules/MMM-ENV-Provider \
	&& git clone --depth 1 -b master https://github.com/sathyarajv/MMM-OpenmapWeather.git ./modules/MMM-OpenmapWeather \
	&& git clone --depth 1 -b master https://github.com/jharttech/MMM-weatherforecast.git ./modules/MMM-weatherforecast

RUN npm install ./modules/MMM-EARTH

COPY css/ ./css/

COPY config.js ./config/

EXPOSE 8080
CMD ["node", "serveronly"]

