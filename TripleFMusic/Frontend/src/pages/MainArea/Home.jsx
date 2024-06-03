import React, { Suspense } from "react";
import { Hourglass } from "react95";

function Home() {
  return (
    <div>
      <h1>In progress ...</h1>
      <Hourglass size={50} style={{ margin: 20 }} />
    </div>
  );
}

export default Home;
