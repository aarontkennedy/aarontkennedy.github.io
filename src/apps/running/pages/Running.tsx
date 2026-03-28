import { TileLayer, ZoomControl } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { LatLngExpression } from "leaflet";
import { default as runData } from "../data/runData.json";
import MarkerClusterGroup from "react-leaflet-cluster";
import useScreenSize from "../../../hooks/useScreenSize";
import MinimapControl from "../../../components/map/MinimapControl";
import { Result, Run } from "../data/run";
import "./Running.scss";
import { formatDate, formatTime, getYear } from "../../../util/dates";
import FavoriteRaces, { Race } from "../components/FavoriteRaces";
import MarkerWithPopup from "../../../components/map/MarkerWithPopup";
import { shuffleArray } from "../../../util/shuffle";
import grandMesa50Photo from "../../../images/running/GrandMesa50.jpg";
import rockinKPhoto from "../../../images/running/RockinK.jpg";
import aaronCrossCountryPhoto from "../../../images/running/aaronCrossCountry.jpg";
import mountainMistPhoto from "../../../images/running/mountainmist.jpg";
import paavoNurmiPhoto from "../../../images/running/paavonurmi.jpg";
import pikes50Photo from "../../../images/running/pikes50.jpg";
import twinCities1Mile2007Photo from "../../../images/running/twinCities1Mile2007.jpg";
import zumbroPhoto from "../../../images/running/zumbro.jpg";
import zumbroDarkPhoto from "../../../images/running/zumbroDark.jpg";

import bearBrookPhoto from "../../../images/running/medals/bearBrook.jpg";
import bemidjiPhoto from "../../../images/running/medals/bemidji.jpg";
import blazePioneerPhoto from "../../../images/running/medals/blazePioneer.jpg";
import bostonPhoto from "../../../images/running/medals/boston.jpg";
import dafunskiePhoto from "../../../images/running/medals/dafunskie.jpg";
import elyPhoto from "../../../images/running/medals/ely.jpg";
import eugenePhoto from "../../../images/running/medals/eugene.jpg";
import grandmasPhoto from "../../../images/running/medals/grandmas.jpg";
import leanhorsePhoto from "../../../images/running/medals/leanhorse.jpg";
import moosalamooPhoto from "../../../images/running/medals/moosalamoo.jpg";
import oldPuebloPhoto from "../../../images/running/medals/oldPueblo.jpg";
import philadelphiaPhoto from "../../../images/running/medals/philadelphia.jpg";
import psychoWycoPhoto from "../../../images/running/medals/psychoWyco.jpg";
import rockyPhoto from "../../../images/running/medals/rocky.jpg";
import rehobothPhoto from "../../../images/running/medals/rehoboth.jpg";
import superiorPhoto from "../../../images/running/medals/superior.jpg";
import zumbroBucklePhoto from "../../../images/running/medals/zumbro.jpg";

import L from "leaflet";
import {
  is100miler,
  is10k,
  is10miler,
  is50k,
  is5k,
  isHalfMarathon,
  is50miler,
  is25k,
  isMarathon,
} from "../../../util/distance";
import Carousel from "../components/Carousel/Carousel";

const photoArray = [
  grandMesa50Photo,
  rockinKPhoto,
  aaronCrossCountryPhoto,
  mountainMistPhoto,
  paavoNurmiPhoto,
  pikes50Photo,
  twinCities1Mile2007Photo,
  zumbroPhoto,
  zumbroDarkPhoto,
];

const medalPhotoArray = [
  bearBrookPhoto,
  bemidjiPhoto,
  blazePioneerPhoto,
  bostonPhoto,
  dafunskiePhoto,
  elyPhoto,
  eugenePhoto,
  grandmasPhoto,
  leanhorsePhoto,
  moosalamooPhoto,
  oldPuebloPhoto,
  philadelphiaPhoto,
  psychoWycoPhoto,
  rockyPhoto,
  rehobothPhoto,
  superiorPhoto,
  zumbroBucklePhoto,
];

export const formatIfTime = (time: string): string => {
  return time.includes(":") ? formatTime(time) : time;
};

const convertRunDataToHtml = (r: Run): JSX.Element => {
  return (
    <div>
      {r.url && (
        <a target="_blank" href={r.url}>
          {r.name}
        </a>
      )}
      {!r.url && <div>{r.name}</div>}
      {r.results &&
        r.results.length > 0 &&
        r.results
          .sort((r1, r2) => getYear(r2.date) - getYear(r1.date))
          .map((r: Result) => {
            return (
              <div key={r.date + r.distanceMiles}>{`${formatDate(r.date)}: ${
                r.distanceMiles
              } miles - ${formatIfTime(r.time)}`}</div>
            );
          })}
    </div>
  );
};

export const convertRunToColor = (run: Run): string => {
  if (!run.results || run.results.length === 0) return "#000000";
  const longestDistance = run.results.reduce((max, current) =>
    current.distanceMiles > max.distanceMiles ? current : max,
  );

  if (is5k(longestDistance.distanceMiles)) {
    return "#FF0000";
  }
  if (is10k(longestDistance.distanceMiles)) {
    return "#FFA500";
  }
  if (is10miler(longestDistance.distanceMiles)) {
    return "#8B4513";
  }
  if (isHalfMarathon(longestDistance.distanceMiles)) {
    return "#FF1493";
  }
  if (is25k(longestDistance.distanceMiles)) {
    return "#008000";
  }
  if (isMarathon(longestDistance.distanceMiles)) {
    return "#000080";
  }
  if (is50k(longestDistance.distanceMiles)) {
    return "#800080";
  }
  if (is50miler(longestDistance.distanceMiles)) {
    return "#4B0082";
  }
  if (is100miler(longestDistance.distanceMiles)) {
    return "#0000FF";
  }
  return "#000000";
};

const centerOfUsa: LatLngExpression = [39.8283, -98.5795];

const favoriteRoadMarathons: Race[] = [
  {
    name: "Philadelphia Marathon, PA",
    description:
      "I usually avoid road races—especially large ones—but I had an absolute blast running the Philadelphia Marathon. Staying downtown made race weekend even better, as I was able to enjoy the city's museums and historic sites. Philadelphia offers so much to see and do, which is a huge perk. The race itself was fantastic, with a fairly flat and fast course. True to its nickname, the City of Brotherly Love showed up in full force, with crowds cheering almost nonstop along the route. There's nothing quite like finishing in near the Rocky statue and receiving a memorable medal featuring a Liberty Bell that actually rings.",
  },
  {
    name: "Grandma's Marathon, MN",
    description:
      "I may be biased since I ran a PR and qualified for Boston at Grandma's Marathon, but it's objectively an outstanding race. The start is especially memorable—at least some years—when fighter jets fly overhead, setting an incredible tone. The course is beautiful, running along Lake Superior into downtown Duluth, and it's extremely well marked throughout. The organizers put on a top-notch event, capped off by a fantastic post-race party once you cross the finish line.",
  },
  {
    name: "Rehoboth Seashore Marathon, DE",
    description:
      "This is a really cool small-town marathon. The race starts in the touristy part of Rehoboth, takes you along the oceanfront boardwalk, and then winds through a state park for a large portion of the course. It's fairly flat, making it a good option for a fast time. While you won't get the crowd support of a big-city marathon, I found the course to be especially scenic and enjoyable. The post-race party was excellent, and as a bonus, the race coincided with a Santa beer crawl—so after finishing, the town was packed with thousands of people dressed as Santa, celebrating well into the day.",
  },
  {
    name: "Daufuskie Island Marathon, SC",
    description:
      "The Daufuskie Island Marathon really lives up to its name—it's a true island marathon. You have to take a ferry just to get there, which already makes the experience feel special. The course is a flat, two-loop route that makes for a fast and enjoyable run. It's such a unique place to race, and the atmosphere really stands out. Afterward, they hosted a great after-party while everyone waited for the ferry ride back, which was the perfect way to wrap up the day.",
  },
  // {
  //   name: "Hatcher Pass Marathon, AK",
  //   description:
  //     "Someday, I'm going to run the Hatcher Pass Marathon again. I know I can put together a better race there. You don't run this one to chase a PR—the course demands respect. The first half is rolling, but then the real work begins as you grind up a series of switchbacks on the climb to the pass.",
  // },
];

const favoriteTrailRaces: Race[] = [
  {
    name: "Montana de Oro, CA",
    description:
      "This race takes place in Montana de Oro State Park, where I camped right in the park. It's absolutely beautiful, perched along the Pacific coast. We started on the beach with the ocean at our backs, climbed up and over two small mountains, and finished right back on the beach. This is what trail running is all about—getting outside, exploring incredible places, and soaking in the beauty along the way.",
  },
  {
    name: "Eugene Curnow Trail Marathon, MN",
    description:
      "I think the most important trail races in Minnesota are Zumbro, Superior, and Eugene Curnow. I've run some fast races at Eugene, and I've also been humbled there. It's a true summer challenge—hot, sweaty, and demanding.",
  },
  {
    name: "Rockin K Trail Marathon, KS",
    description:
      "I ran this race on a whim while road-tripping to Texas to see the solar eclipse. It turned out to be a beautiful prairie run—wide open, peaceful, and surprisingly memorable. I really enjoyed it and definitely recommend it.",
  },
  {
    name: "Zumbro Endurance Run, MN",
    description:
      "Zumbro is a welcome return to racing after the long Minnesota winter—though you might still get a blast of winter on race day. It's the first big trail race of the season, and the views from the bluffs are fantastic. I've run the 100, but the 17-miler is the one I usually do and is a ton of fun.",
  },
];

const favoriteTrailUltras: Race[] = [
  {
    name: "Stanhope Challenge, ID",
    description:
      "This race is epic. You cover just under 40 miles, and it's a total grind—multiple climbs of over 2,000 feet—but it is worth it. We ran through wildflower-filled meadows, crossed stretches of snow, and on the final climb, I even spotted elk standing right on the trail.",
  },
  {
    name: "Grand Mesa 50, CO",
    description:
      "This is another epic race. I've DNF'd here twice. The first time, I didn't fully understand the course and dropped when I thought I still had another major climb ahead, I was struggling. The second time, everything came together and I finished 10th. The race starts in the dark, climbing up Craig's Crest just in time for sunrise. After descending, you continue up to the top of the mesa, winding through forests and wildflower-filled meadows. The views from the top are incredible, but the heat can be tough. You are happy when you get to descend back down to the finish.",
  },
  {
    name: "Lake Superior 100, MN",
    description:
      "There's a lottery for this race now, and I haven't been able to get back in yet—but I still put my name in every year. I know I can run this race better, and I'm looking forward to getting another shot. It's a beautiful fall race in northern Minnesota, and one I can't wait to return to.",
  },
];

const getIconHtml = (hexColor: string): string => {
  return `<svg fill="${hexColor}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="121.352px" height="121.352px" viewBox="0 0 121.352 121.352"
	 xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M14.058,112.273c-2.671,0-5.174-1.659-6.123-4.319c-1.206-3.381,0.558-7.1,3.939-8.305
				c8.797-3.145,18.032-8.08,19.576-10.444c2.219-7.225,9.508-23.93,9.82-24.645c1.437-3.29,5.27-4.792,8.559-3.354
				c3.29,1.438,4.791,5.269,3.354,8.559c-2.062,4.719-7.76,18.121-9.35,23.401c-2.609,8.664-18.407,15.452-27.592,18.727
				C15.52,112.151,14.783,112.273,14.058,112.273z"/>
			<path d="M65.87,121.352c-0.763,0-1.538-0.136-2.294-0.421c-3.358-1.268-5.054-5.018-3.787-8.376
				c2.805-7.434,5.827-16.579,6.66-20.561c-2.797-2.67-9.536-8.242-15.298-12.741c-2.83-2.21-3.332-6.294-1.123-9.124
				c2.21-2.828,6.295-3.33,9.124-1.122c17.609,13.751,19.027,16.47,19.633,17.63c1.21,2.32,2.716,5.208-6.833,30.508
				C70.969,119.747,68.497,121.352,65.87,121.352z"/>
			<circle cx="76.713" cy="14.166" r="14.166"/>
			<g>
				<path d="M68.121,26.851c0,0,1.546,0.19,2.986,0.859c1.375,0.64,2.783,1.641,2.783,1.641l0.036,0.024
					c3.896,2.979,6.987,8.574,4.649,13.91L66.033,71.93c-2.727,6.223-10.594,7.369-16.32,4.86c-0.975-0.427-1.907-0.958-2.773-1.583
					c-4.06-2.921-7.093-8.293-4.722-13.708l12.545-28.645C57.09,27.538,63.32,26.015,68.121,26.851z"/>
			</g>
			<path d="M28.649,50.542c-1.12,0-2.25-0.34-3.225-1.048c-2.458-1.783-3.006-5.22-1.224-7.679
				c2.7-3.724,9.596-12.598,15.307-14.555c5.321-1.824,21.093-0.901,25.8-0.575c3.03,0.21,5.316,2.836,5.106,5.867
				c-0.209,3.029-2.805,5.313-5.866,5.107c-8.536-0.589-19.204-0.728-21.479,0.009c-1.657,0.663-6.417,5.722-9.963,10.605
				C32.029,49.755,30.351,50.542,28.649,50.542z"/>
			<path d="M85.548,44.799c-5.263,0-10.754-0.317-13.907-0.536c-3.03-0.21-5.316-2.836-5.106-5.867
				c0.209-3.029,2.8-5.319,5.866-5.107c8.536,0.591,19.204,0.728,21.478-0.009c1.666-0.666,6.426-5.725,9.964-10.604
				c1.784-2.458,5.222-3.007,7.682-1.224c2.459,1.783,3.007,5.222,1.225,7.681c-2.7,3.724-9.597,12.597-15.308,14.554
				C94.971,44.535,90.355,44.799,85.548,44.799z"/>
		</g>
	</g>
</g>
</svg>`;
};

const Running = () => {
  const screenSize = useScreenSize();
  const favorites = [
    <FavoriteRaces
      title="Favorite Road Marathons"
      items={favoriteRoadMarathons}
    />,
    <FavoriteRaces title="Favorite Trail Races" items={favoriteTrailRaces} />,
    <FavoriteRaces title="Favorite Trail Ultras" items={favoriteTrailUltras} />,
  ];

  return (
    <div className="running">
      <Carousel
        namespace="running-photos"
        contents={shuffleArray(medalPhotoArray)
          .slice(0, 10)
          .map((photo: string) => (
            <img key={photo} src={photo} />
          ))}
      />

      <Carousel namespace="favorite-races" contents={favorites}></Carousel>

      <MapContainer
        center={centerOfUsa}
        zoom={4}
        scrollWheelZoom={false}
        style={{
          // height: `100vh`,
          // width: `100vw`,
          minHeight: `500px`,
          // height: `50vh`,
          width: `100%`,
        }}
        zoomControl={false}
        className="running__map"
      >
        <ZoomControl position="topleft" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          maxClusterRadius={25}
          polygonOptions={{
            opacity: 0,
            fillOpacity: 0,
          }}
          chunkedLoading
        >
          {runData.map((runRaw: any, index: number) => {
            const run: Run = runRaw;
            const id = run.name + index;
            const contents = convertRunDataToHtml(run);
            return (
              <MarkerWithPopup
                key={id}
                position={run.latLng}
                popUpContents={contents}
                // icon={
                //   new L.DivIcon({
                //     className: "map-div-icon",
                //     html: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="${hexColor}"><path d="M12,2A7.008,7.008,0,0,0,5,9c0,5.353,6.036,11.45,6.293,11.707l.707.707.707-.707C12.964,20.45,19,14.353,19,9A7.008,7.008,0,0,0,12,2Zm0,16.533C10.471,16.825,7,12.553,7,9A5,5,0,0,1,17,9C17,12.546,13.527,16.823,12,18.533Z"/><path d="M12,6a3,3,0,1,0,3,3A3,3,0,0,0,12,6Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,10Z"/></g></svg>`,
                //     iconSize: [48, 48],
                //     // iconAnchor: [48, 48],
                //   })
                // }
                icon={
                  new L.DivIcon({
                    className: "map-div-icon",
                    html: getIconHtml(convertRunToColor(run)),
                    iconSize: [48, 48],
                    iconAnchor: [0, 48],
                  })
                }
              ></MarkerWithPopup>
            );
          })}
        </MarkerClusterGroup>
        {screenSize.width > 480 && (
          <MinimapControl position="topright" zoom={2} />
        )}
      </MapContainer>

      <Carousel
        namespace="running-photos"
        contents={shuffleArray(photoArray)
          .slice(0, 10)
          .map((photo: string) => (
            <img key={photo} src={photo} />
          ))}
      />
    </div>
  );
};

export default Running;
