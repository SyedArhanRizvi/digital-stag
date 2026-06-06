import React from 'react'
import S1 from './S1'
import S2 from './S2'
import S3 from './S3'
import S4 from '../home/sections/S4'
import ScrollVelocity from '../home/sections/S2'
import S5 from '../home/sections/S5'

function About() {
  return (
    <>
    <S1></S1>

    <S2></S2>
          <S5 />
           <ScrollVelocity 
            texts={["Digital Marketing", "SEO Excellence", "Web Development", "Video Editing", "Graphics Designing"]}
            links={["/services/digital-marketing", "/services/seo", "/services/digital-marketing", "/services/seo", "/services/seo", ]}
            velocity={100}
          />

    <S3></S3>
    </>
  )
}

export default About