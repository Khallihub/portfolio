import { sanityClient } from "../Client";
import { useEffect, useState } from "react";
import rightPattern from "../right-pattern.svg";
const Skills = () => {
  const [, setSkills] = useState([]);
  const [Lang, setLang] = useState([]);
  const [Frames, setFrames] = useState([]);
  const [db, setDb] = useState([]);
  const [other, setOther] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "skill"] {
          skillName,
          type,
          image {
            asset-> {
              _id,
              url
            },
            alt
          }
        }`
      )
      .then((data) => {
        setSkills(data);
        const langArr = [];
        const framesArr = [];
        const dbArr = [];
        const otherArr = [];
        data.forEach((element) => {
          const img = `<img src="${element.image.asset.url}" alt="${element.image.alt}" class="w-20 h-20"/>`;
          if (
            element.type.toLowerCase() === "language" ||
            element.type.toLowerCase() === "tool"
          ) {
            langArr.push(img);
          } else if (
            element.type.toLowerCase() === "framework" ||
            element.type.toLowerCase() === "library"
          ) {
            framesArr.push(img);
          } else if (element.type.toLowerCase() === "database") {
            dbArr.push(img);
          } else if (element.type.toLowerCase() === "other") {
            otherArr.push(img);
          }
        });

        setLang(langArr);
        setFrames(framesArr);
        setDb(dbArr);
        setOther(otherArr);
      })
      .catch(console.error);
  }, []);

  return (
    <div
      id="skills"
      className="h-fit my-10 w-5/6 mx-auto flex flex-col justify-center relative"
    >
      <img
        src={rightPattern}
        alt=""
        className="absolute hidden right-0 bottom-0 w-2/12 max-w-xs md:block"
        height="700"
        width="320"
      ></img>
      <h1 className="tracking-wider text-gradient text-6xl my-2 py-2 font-mono font-medium">
        My Skills
      </h1>
      <div className="text-white">
        <p className="text-2xl">
          I like to take responsibility to craft aesthetic user experience using
        </p>
        <p className="text-2xl">
          modern frontend architecture and develop performant backend services.
        </p>
        <div className="mt-10">
          <h2 className="py-2">LANGUAGE AND TOOLS</h2>
          <div className="flex gap-2 items-center flex-wrap ">
            {Lang.map((img, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: img }} />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="py-2">LIBRARY AND FRAMEWORKS</h2>
          <div className="flex gap-2 flex-wrap">
            {Frames.map((img, index) => {
              console.log(img)
              return <div key={index} dangerouslySetInnerHTML={{ __html: img }} />;
            })}
          </div>
        </div>
        <div className="flex mt-10 gap-5 flex-wrap">
          <div>
            <h2 className="py-2">DATABASES</h2>
            <div className="flex gap-2 flex-wrap">
              {db.map((img, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: img }} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="py-2">OTHERS</h2>
            <div className="flex gap-2 flex-wrap">
              {other.map((img, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: img }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
