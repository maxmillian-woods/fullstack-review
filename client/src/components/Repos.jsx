import React from "react";

const Repos = props => {
  return (
    <div>
      {props.repos.map(item => {
        console.log(item);
        return (
          <div>
            <h4>{item.user}</h4>
            <h4>{item.name}</h4>
            <h4>{item.forks}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Repos;
