import React from "react";
import S1 from "./sections/S1";
import ScrollVelocity from "./sections/S2";
import S3 from "./sections/S3";
import S4 from "./sections/S4";
import S5 from "./sections/S5";
import S6 from "./sections/S6";
import S7 from "./sections/S7";
import S8 from "./sections/S8";

function Home() {
  return (
    <>
      <S1 />
      <S3 />
     
      <S4 />
      <S5 />
       <ScrollVelocity 
        texts={["Digital Marketing", "SEO Excellence", "Web Development", "Video Editing", "Graphics Designing"]}
        links={["/services/digital-marketing", "/services/seo", "/services/digital-marketing", "/services/seo", "/services/seo", ]}
        velocity={100}
      />
      <S6 />
      <S7 />
      <S8/>
    </>
  );
}

export default Home;