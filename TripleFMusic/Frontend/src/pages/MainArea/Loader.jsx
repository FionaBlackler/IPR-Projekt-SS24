import React from "react";
import { Hourglass } from "react95";
import styled from "styled-components";
import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
      <div className="loader-container">
        <Hourglass size={50} style={{ margin: 20 }} />
      </div>
    </Html>
  );
};

export default Loader;
