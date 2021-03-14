import React, { memo, useEffect, useState } from "react";
import { Repository } from "./Repository";

export const RepositoryList = memo(({ getRepositories }) => {
  const [items, setItems] = useState([]);
  const [query, setquery] = useState("facebook");

  useEffect(() => {
    getRepositories(query)
      .then((res) => res.json())
      .then((data) => setItems((data && data.items) || []));
  }, [getRepositories, query]);

  return (
    <div className="list">
      <button
        className="float-btn-rocket"
        onClick={() => setquery("rocketseat")}
      >
        🚀
      </button>
      <br />
      {items &&
        items.map((result) => <Repository key={result.id} {...result} />)}
    </div>
  );
});
