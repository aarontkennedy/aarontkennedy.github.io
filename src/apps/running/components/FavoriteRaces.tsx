import React from "react";
import "./FavoriteRaces.scss";

export type Race = {
  name: string;
  description: string;
};

interface Props {
  title: string;
  summary?: string;
  items: Race[];
}

const FavoriteRaces: React.FC<Props> = ({ title, summary, items }) => {
  return (
    <div className="favorite-races">
      <h1 className="favorite-races__title">{title}</h1>
      {summary && <div>{summary}</div>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div className="favorite-races__name">{item.name}</div>
            <div className="favorite-races__description">
              {item.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRaces;
