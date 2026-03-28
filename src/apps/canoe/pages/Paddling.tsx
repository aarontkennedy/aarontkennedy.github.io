import { TileLayer, ZoomControl } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { LatLngExpression } from "leaflet";
import { default as paddleData } from "../data/paddleData.json";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import canoeImage from "../assets/icons8-canoe-48.png";
import useScreenSize from "../../../hooks/useScreenSize";
import MinimapControl from "../../../components/map/MinimapControl";
import MarkerWithPolyline from "../../../components/map/MarkerWithPolyline";
import { Paddle, Url } from "../data/paddle";
import "./Paddling.scss";
import { formatDate, getYear } from "../../../util/dates";
// import { shuffleArray } from "../../../util/shuffle";

// import bluebirdPhoto from "../../../images/paddling/bluebird.jpeg";
// import chickadeePhoto from "../../../images/paddling/chickadee.jpeg";
// import craneBeaverPhoto from "../../../images/paddling/craneBeaver.jpeg";
// import damselPhoto from "../../../images/paddling/damsel.jpeg";
// import deerPhoto from "../../../images/paddling/deer.jpeg";
// import eaglePhoto from "../../../images/paddling/eagle.jpeg";
// import fallMoonPhoto from "../../../images/paddling/fallMoon.jpeg";
// import greenHeronPhoto from "../../../images/paddling/greenHeron.jpeg";
// import gullsPhoto from "../../../images/paddling/gulls.jpeg";
// import heronPhoto from "../../../images/paddling/heron.jpeg";
// import pelicansPhoto from "../../../images/paddling/pelicans.jpeg";
// import racoonPhoto from "../../../images/paddling/racoon.jpeg";
// import sunrisePhoto from "../../../images/paddling/sunrise.jpeg";
// import surfingPhoto from "../../../images/paddling/surfing.jpeg";
// import whitewaterPhoto from "../../../images/paddling/whitewater.jpeg";
import { useEffect, useState } from "react";
import EllipsisText from "../../../components/EllipsisText/EllipsisText";
import CustomClearInput from "../../../components/CustomClearInput/CustomClearInput";

const youtubeBackgroundVideoId = "1AdQTKX82Mc";

// const photoArray = [
//   bluebirdPhoto,
//   chickadeePhoto,
//   craneBeaverPhoto,
//   damselPhoto,
//   deerPhoto,
//   eaglePhoto,
//   fallMoonPhoto,
//   greenHeronPhoto,
//   gullsPhoto,
//   heronPhoto,
//   pelicansPhoto,
//   racoonPhoto,
//   sunrisePhoto,
//   surfingPhoto,
//   whitewaterPhoto,
// ];

const canoeIcon = new Icon({
  iconUrl: canoeImage,
  iconSize: [35, 35], // size of the icon
  // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const convertPaddleDataToHtml = (p: Paddle): JSX.Element => {
  const numUrls = p.urls.length;

  if (numUrls === 1) {
    return (
      <div>
        <a target="_blank" href={p.urls[0].url}>
          {p.name}
        </a>
      </div>
    );
  }

  return (
    <div>
      <div>{p.name}</div>
      {p.urls
        .sort((p1, p2) => getYear(p2.date) - getYear(p1.date))
        .map((u: Url) => {
          return (
            <div key={u.url}>
              <a target="_blank" href={u.url}>
                {`${getYear(u.date)} ${u.notes}`}
              </a>
            </div>
          );
        })}
    </div>
  );
};

const centerOfMinnesota: LatLngExpression = [46.7296, -94.6859];

export const convertYoutubeUrlToThumbnailUrl = (youtubeURL: string): string => {
  if (youtubeURL.includes("watch?v=")) {
    const videoId = youtubeURL.split("watch?v=")[1].split("&")[0];
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  } else if (youtubeURL.includes("youtu.be/")) {
    const videoId = youtubeURL
      .split("youtu.be/")[1]
      .split("?")[0]
      .split("&")[0];
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  } else if (youtubeURL.includes("/shorts/")) {
    const videoId = youtubeURL.split("/shorts/")[1].split("?")[0];
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }
  return youtubeURL;
};

const tags = [...new Set(paddleData.map((record) => record.tags).flat())];

class VideoLink {
  name: string;
  url: string;
  date: string;

  public constructor(name: string, url: string, date: string) {
    this.name = name;
    this.url = url;
    this.date = date;
  }
}

const allVideos = paddleData
  .map((record) =>
    record.urls.map((u) => new VideoLink(record.name, u.url, u.date))
  )
  .flat()
  .sort((v1, v2) => {
    return getYear(v2.date) - getYear(v1.date);
  });

const Paddling = () => {
  const screenSize = useScreenSize();
  const [searchValue, setSearchValue] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(allVideos);
  const filterVideos = (value: string): void => {
    // get the relevant records.
    const filtered = paddleData.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.tags.includes(value.toLowerCase())
    );

    const converted = filtered
      .map((record) =>
        record.urls.map((u) => new VideoLink(record.name, u.url, u.date))
      )
      .flat()
      .sort((v1, v2) => {
        return getYear(v2.date) - getYear(v1.date);
      });
    setFilteredVideos(converted);
  };

  const handleVideoTagClick = (value: string): void => {
    setSearchValue("");
    filterVideos(value);
  };

  useEffect(() => {
    if (!searchValue || searchValue.length < 3) {
      setFilteredVideos(allVideos);
    }
    filterVideos(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className="paddling-hero">
        <iframe
          className="paddling-hero__background-video"
          src={`https://www.youtube.com/embed/${youtubeBackgroundVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeBackgroundVideoId}`}
          frameBorder="0"
          allow="autoplay"
        />
        <div className="paddling-hero__content">
          <div className="paddling-hero__header">
            Minnesota has more than 10,000 lakes, over 6,500 rivers and
            streams—and at least that many adventures!
          </div>
          <div className="paddling-hero__sub-header">
            Join me as I explore the Land of 10,000 Lakes. Discover new places
            and prepare for your next adventure.
          </div>
        </div>
      </div>

      <div className="paddling__video-search">
        <div className="paddling__video-search-tags">
          <CustomClearInput
            name={"paddling__video-search-input"}
            inputValue={searchValue}
            setInputValue={setSearchValue}
          />
          {tags.map((t: string) => (
            <button
              className="paddling__video-search-tag"
              key={t}
              onClick={() => handleVideoTagClick(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="paddling__video-search-results">
          {filteredVideos.map((v: VideoLink) => (
            <a key={v.url} href={v.url}>
              <div className="paddling__video-search-card">
                <img
                  className="paddling__video-search-video-thumbnail"
                  src={convertYoutubeUrlToThumbnailUrl(v.url)}
                />
                <div className="paddling__video-search-title">
                  <EllipsisText text={v.name} />{" "}
                </div>
                <div className="paddling__video-search-sub-text">
                  {formatDate(v.date)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <MapContainer
        center={centerOfMinnesota}
        zoom={7}
        scrollWheelZoom={false}
        style={{
          // height: `100vh`,
          // width: `100vw`,
          minHeight: `500px`,
          // height: `50vh`,
          width: `100%`,
        }}
        zoomControl={false}
        className="paddling__map"
      >
        <ZoomControl position="topleft" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          maxClusterRadius={50}
          polygonOptions={{
            opacity: 0,
            fillOpacity: 0,
          }}
          chunkedLoading
        >
          {paddleData.map((paddleRaw: any, index: number) => {
            const paddle: Paddle = paddleRaw;
            const id = paddle.name + index;
            const contents = convertPaddleDataToHtml(paddle);
            return (
              <MarkerWithPolyline
                key={id}
                position={paddle.route[0]}
                icon={canoeIcon}
                popUpContents={contents}
                path={paddle.route.length > 1 ? paddle.route : []}
                pathOptions={{
                  color: ["blue", "red", "orange", "yellow", "green", "purple"][
                    Math.floor(Math.random() * 6)
                  ],
                }}
              ></MarkerWithPolyline>
            );
          })}
        </MarkerClusterGroup>
        {screenSize.width > 480 && (
          <MinimapControl position="topright" zoom={2} />
        )}
      </MapContainer>

      {/* <div className="carousel">
        {shuffleArray(photoArray)
          .slice(0, 10)
          .map((photo: string) => (
            <img key={photo} className="" src={photo} />
          ))}
      </div> */}
    </>
  );
};

export default Paddling;
