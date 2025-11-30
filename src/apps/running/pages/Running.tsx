import { TileLayer, ZoomControl } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { LatLngExpression } from "leaflet";
import { default as runData } from "../data/runData.json";
import MarkerClusterGroup from "react-leaflet-cluster";
import useScreenSize from "../../../hooks/useScreenSize";
import MinimapControl from "../../../components/map/MinimapControl";
import { Run } from "../data/run";
import Header from "../../../components/header/Header";
import "./Running.scss";
import { getYear } from "../../../util/dates";
import { shuffleArray } from "../../../util/shuffle";
import Footer from "../../../components/footer/Footer";
import { useEffect, useState } from "react";
import EllipsisText from "../../../components/EllipsisText/EllipsisText";
import CustomClearInput from "../../../components/CustomClearInput/CustomClearInput";
import MarkerWithPopup from "../../../components/map/MarkerWithPopup";

const convertRunDataToHtml = (r: Run): JSX.Element => {
  return (
    <div>
      <a target="_blank" href={r.url}>
        {r.name}
      </a>
    </div>
  );
  // }

  // return (
  //   <div>
  //     <div>{p.name}</div>
  //     {p.urls
  //       .sort((p1, p2) => getYear(p2.date) - getYear(p1.date))
  //       .map((u: Url) => {
  //         return (
  //           <div key={u.url}>
  //             <a target="_blank" href={u.url}>
  //               {`${getYear(u.date)} ${u.notes}`}
  //             </a>
  //           </div>
  //         );
  //       })}
  //   </div>
  // );
};

const centerOfUsa: LatLngExpression = [39.8283, -98.5795];

const formatDate = (date: string): string => {
  try {
    const options = { year: "numeric", month: "long" } as const;
    const formatter = new Intl.DateTimeFormat("en-US", options); // 'en-US' for English (United States)
    return formatter.format(new Date(date)); // e.g., "August 2024"
  } catch (e) {
    return date;
  }
};

// const tags = [...new Set(paddleData.map((record) => record.tags).flat())];

// const allVideos = paddleData
//   .map((record) =>
//     record.urls.map((u) => new VideoLink(record.name, u.url, u.date))
//   )
//   .flat()
//   .sort((v1, v2) => {
//     debugger;
//     return getYear(v1.date) - getYear(v2.date);
//   });

const Running = () => {
  const screenSize = useScreenSize();
  const [searchValue, setSearchValue] = useState("");
  // const [filteredVideos, setFilteredVideos] = useState(allVideos);
  // const filterVideos = (value: string): void => {
  //   // get the relevant records.
  //   const filtered = paddleData.filter(
  //     (p) =>
  //       p.name.toLowerCase().includes(value.toLowerCase()) ||
  //       p.tags.includes(value.toLowerCase())
  //   );

  //   const converted = filtered
  //     .map((record) =>
  //       record.urls.map((u) => new VideoLink(record.name, u.url, u.date))
  //     )
  //     .flat()
  //     .sort((v1, v2) => {
  //       debugger;
  //       console.log(v1.date, v2.date, getYear(v1.date), getYear(v2.date));
  //       return getYear(v2.date) - getYear(v1.date);
  //     });
  //   setFilteredVideos(converted);
  // };

  // useEffect(() => {
  //   if (!searchValue || searchValue.length < 3) {
  //     setFilteredVideos(allVideos);
  //   }
  //   filterVideos(searchValue);
  // }, [searchValue]);

  return (
    <>
      <Header></Header>
      {/* 
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

      <div className="video_search">
        <div className="video_search__tags">
          <CustomClearInput
            name={"video_search__input"}
            inputValue={searchValue}
            setInputValue={setSearchValue}
          />
          {tags.map((t: string) => (
            <button
              className="video_search__tag"
              key={t}
              onClick={() => handleVideoTagClick(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="video_search__results">
          {filteredVideos.map((v: VideoLink) => (
            <a key={v.url} href={v.url}>
              <div className="video_search__card">
                <img
                  className="video_search__video-thumbnail"
                  src={convertYoutubeUrlToThumbnailUrl(v.url)}
                />
                <div className="video_search__title">
                  <EllipsisText text={v.name} />{" "}
                </div>
                <div className="video_search__sub-text">
                  {formatDate(v.date)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div> */}

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
            return (
              <MarkerWithPopup
                key={id}
                position={run.latLng}
                popUpContents={contents}
              ></MarkerWithPopup>
            );
          })}
        </MarkerClusterGroup>
        {screenSize.width > 480 && (
          <MinimapControl position="topright" zoom={2} />
        )}
      </MapContainer>
      <Footer />
    </>
  );
};

export default Running;
