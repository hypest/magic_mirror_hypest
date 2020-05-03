/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

// getEnv() from https://github.com/idoodler/MMM-ENV-Provider#use-it-in-configjs
function getEnv(envKey) {
    if (typeof module !== "undefined") {
        return process.env[envKey];
    } else {
        try {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "/env", false);
            xmlhttp.send();
            if (xmlhttp.status === 200) {
                return JSON.parse(xmlhttp.responseText)[envKey];
            } else {
                throw "Unexpected status code!";
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

var config = {
  address: "0.0.0.0", // Address to listen on, can be:
  // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
  // - another specific IPv4/6 to listen on a specific interface
  // - "0.0.0.0" to listen on any interface
  // Default, when address config is left out, is "localhost"
  port: 8080,
  ipWhitelist: [], // Set [] to allow all IP addresses
  // or add a specific IPv4 of 192.168.1.5 :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
  // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

  language: getEnv("MM_LANGUAGE"),
  timeFormat: 24,
  units: "metric",

  modules: [
		{
			module: "MMM-ENV-Provider",
		},
    {
      module: "alert",
    },
    {
      module: "updatenotification",
      position: "top_bar"
    },
    {
      module: "clock",
      position: "top_left",
			config: {
				displaySeconds: false,
				displayType: "both",
				analogPlacement: "left",
				analogSize: '500px',
				analogFace: "face-003"
			}
    },
		{
   		module: "MMM-EARTH",
    	position: "fullscreen_below",
   		config: {
  	      mode: "Natural",
	        rotateInterval: 60000,
        	MaxWidth: "100%",
      	  MaxHeight: "100%",
    	}
		},
		{
			module: "MMM-CalendarWeek",
			position: "bottom_bar",	// This can be any of the regions. Best results in bottom region.
			config: {
				colored: true,
				maximumNumberOfDays: 5,
				tableClass: 'medium',
				hideEmptyDays: true,
				calendars: [
					{
          	url: getEnv("MM_CALENDAR_URL"),
						symbol: 'calendar'
					}
				]
			}
		},
		{
			module: "MMM-OpenmapWeather",
			position: "top_right",	// This can be any of the regions.
									// Best results in left or right regions.
			config: {
				// See 'Configuration options' for more information.
				location: getEnv("MM_OMW_LOCATION_STRING"),
				locationID: getEnv("MM_OMW_LOCATION_ID"),
				appid: getEnv("MM_OMW_APP_ID"),
				showHumidity: true,
				useBeaufort: true,
				lang: getEnv("MM_LANGUAGE"),
				showFeelsLike: true,
    	  colorIcon: true
			}
		},
		{
			module: "MMM-weatherforecast",
			position: "bottom_bar",	// This can be any of the regions.
						// Best results in bottom_bar region due to horizontal default layout and icon sizes.
			config: {
				// See 'Configuration options' for more information.
				location: getEnv("MM_OMW_LOCATION_STRING"),
				locationID: getEnv("MM_OMW_LOCATION_ID"),
				appid: getEnv("MM_OMW_APP_ID"),
				showRainAmount: true,
				maxNumberOfDays: 5,
				lang: getEnv("MM_LANGUAGE"),
				colored: true,
				layout: "horizontal"
			}
		}
  ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
