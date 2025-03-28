import React from "react";
import { Link } from "react-router";

function Logo() {
  return (
    <Link to={"/"}>
      <div className={`flex items-center w-full gap-2`}>
        <div className="w-12">
          <img className="w-full" src={"/shit-pokeball.png"} />
        </div>
        <p className="text-2xl font-bold tracking-wide heading text-white ">PokèMenn</p>
      </div>
    </Link>
  );
}

export default Logo;
