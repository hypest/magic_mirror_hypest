FROM bastilimbach/docker-magicmirror

ENV NODE_ENV production

WORKDIR /opt/magic_mirror

RUN git clone --depth 1 -b master https://github.com/heskja/MMM-CalendarWeek.git ./modules/MMM-CalendarWeek \
	&& git clone --depth 1 -b master https://github.com/mykle1/MMM-EARTH.git ./modules/MMM-EARTH \
	&& git clone --depth 1 -b master https://github.com/idoodler/MMM-ENV-Provider.git ./modules/MMM-ENV-Provider \
	&& git clone --depth 1 -b master https://github.com/sathyarajv/MMM-OpenmapWeather.git ./modules/MMM-OpenmapWeather \
	&& git clone --depth 1 -b master https://github.com/jharttech/MMM-weatherforecast.git ./modules/MMM-weatherforecast

RUN npm install ./modules/MMM-EARTH

RUN cp -R css .

COPY config.js ./config/

EXPOSE 8080
CMD ["node", "serveronly"]

