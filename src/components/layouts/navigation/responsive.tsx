"use client";

import React from "react";
import Nav from "./nav";
import Mobile from "./mobile";

const Responsive = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Nav />
      </div>
      <div className="lg:hidden">
        <Mobile />
      </div>
    </>
  );
};

export default Responsive;
