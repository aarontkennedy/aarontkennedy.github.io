import React from "react";

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
    <div>
      <h1 className="page-title">{title}</h1>
      {summary && <div>{summary}</div>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div>{item.name}</div>
            <div>{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRaces;
