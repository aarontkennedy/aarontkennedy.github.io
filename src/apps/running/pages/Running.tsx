import { TileLayer, ZoomControl } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { LatLngExpression } from "leaflet";
import { default as runData } from "../data/runData.json";
import MarkerClusterGroup from "react-leaflet-cluster";
import useScreenSize from "../../../hooks/useScreenSize";
import MinimapControl from "../../../components/map/MinimapControl";
import { Result, Run } from "../data/run";
import Header from "../../../components/header/Header";
import "./Running.scss";
import { formatDate, formatTime, getYear } from "../../../util/dates";
import Footer from "../../../components/footer/Footer";
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

const formatIfTime = (time: string): string => {
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

const convertRunToColor = (run: Run): string => {
  const longestDistance = run.results.reduce((max, current) =>
    current.distanceMiles > max.distanceMiles ? current : max
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
      "I normally avoid road races and especially very large road races. However, I had a blast running the Philadelphia Marathon. I stayed downtown and was able to enjoy the museums and historic sites race weekend. So that is a huge perk. There is so much to do in Philadelphia. The race itself was fun. The course is fairly flat and fast. Philadelphia is truly the city of brotherly love as there were crowds chearing us on almost the entire way. There is not much better than finishing in downtown Philly and getting a really cool medal with a liberty bell in it that really rings.",
  },
  {
    name: "Grandma's Marathon, MN",
    description:
      "I am probably biased since I ran my pr and qualified for Boston at Grandma's. But it is objectively a great race. I don't know if they do it every year, but it is pretty cool when they have the fighter jets fly over at the start of the race. It is a beautiful course along Lake Superior to downtown Duluth. The course is extremely well marked. They put on a great race and when you are done a great party after.",
  },
  {
    name: "Rehoboth Seashore Marathon, DE",
    description:
      "This is a really cool small town marathon. You start in the touristy section of Rehoboth, run the boardwalk along the ocean and then run a good portion of the race in a state park. It is pretty flat and you can put down a fast time. You won't get the crowd support of a larger marathon, but i found it to be an aesthetically pleasing run. The after party was great. Also, the race was the same weekend as a Santa beer crawl and after the race the town was filled with thousands of people dressed as Santa partying it up.",
  },
  {
    name: "Daufuskie Island Marathon, SC",
    description:
      "Daufuskie Island Marathon is really a marathon on an island. You have to take a ferry to get there. It is a two loop marathon. It is very flat. It was such a unique place to run a race. They had a great after party while you waited for the ferry to get back.",
  },
  {
    name: "Hatcher Pass Marathon, AK",
    description:
      "Someday, I am going to run the Hatcher Pass marathon again. I know I can put together a better race there. You do not run this race to get a pr. The first half is rolling. You then really run up a bunch of switch backs to the get to the pass.",
  },
];

const favoriteTrailRaces: Race[] = [
  {
    name: "Philadelphia Marathon, PA",
    description:
      "I normally avoid road races and especially very large road races. However, I had a blast running the Philadelphia Marathon. I stayed downtown and was able to enjoy the museums and historic sites race weekend. So that is a huge perk. There is so much to do in Philadelphia. The race itself was fun. The course is fairly flat and fast. Philadelphia is truly the city of brotherly love as there were crowds chearing us on almost the entire way. There is not much better than finishing in downtown Philly and getting a really cool medal with a liberty bell in it that really rings.",
  },
];

const favoriteTrailUltras: Race[] = [
  {
    name: "Philadelphia Marathon, PA",
    description:
      "I normally avoid road races and especially very large road races. However, I had a blast running the Philadelphia Marathon. I stayed downtown and was able to enjoy the museums and historic sites race weekend. So that is a huge perk. There is so much to do in Philadelphia. The race itself was fun. The course is fairly flat and fast. Philadelphia is truly the city of brotherly love as there were crowds chearing us on almost the entire way. There is not much better than finishing in downtown Philly and getting a really cool medal with a liberty bell in it that really rings.",
  },
];

const Running = () => {
  const screenSize = useScreenSize();

  return (
    <>
      <Header></Header>

      <FavoriteRaces
        title="Favorite Road Marathons"
        items={favoriteRoadMarathons}
      />

      <FavoriteRaces title="Favorite Trail Races" items={favoriteTrailRaces} />

      <FavoriteRaces
        title="Favorite Trail Ultras"
        items={favoriteTrailUltras}
      />

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
        className="paddling"
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
            const color = convertRunToColor(run);
            return (
              <MarkerWithPopup
                key={id}
                position={run.latLng}
                popUpContents={contents}
                hexColor={color}
              ></MarkerWithPopup>
            );
          })}
        </MarkerClusterGroup>
        {screenSize.width > 480 && (
          <MinimapControl position="topright" zoom={2} />
        )}
      </MapContainer>

      <div className="carousel">
        {shuffleArray(photoArray)
          .slice(0, 10)
          .map((photo: string) => (
            <img key={photo} className="" src={photo} />
          ))}
      </div>

      <Footer />
    </>
  );
};

export default Running;
