import { ReactNode, useRef } from "react";

type CarouselProps = {
  contents?: ReactNode[];
  namespace: string;
};

const Carousel = ({ contents = [], namespace }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`${namespace} ${namespace}__wrapper`}>
      <button
        className={`${namespace}__button left`}
        aria-label="Previous"
        onClick={() => {
          if (carouselRef.current) {
            carouselRef.current.scrollBy({
              left: -carouselRef.current.clientWidth,
              behavior: "smooth",
            });
          }
        }}
      >
        ‹
      </button>

      <div className={`${namespace}__carousel`} ref={carouselRef}>
        {contents.map((content, index) => (
          <div key={index} className={`${namespace}__card`}>
            {content}
          </div>
        ))}
      </div>

      <button
        className={`${namespace}__button right`}
        aria-label="Next"
        onClick={() => {
          if (carouselRef.current) {
            carouselRef.current.scrollBy({
              left: carouselRef.current.clientWidth,
              behavior: "smooth",
            });
          }
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
