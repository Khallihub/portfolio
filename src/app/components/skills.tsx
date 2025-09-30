import { useEffect, useState } from "react";
import { sanityClient } from "../sanity/client";
import Image from "next/image";

type SkillImage = {
  asset: {
    _id: string;
    url: string;
  };
  alt: string;
};

type Skill = {
  skillName: string;
  type: string;
  image: SkillImage;
};

const Skills: React.FC = () => {
  // We don't use the full skills array in render, so keep it as unused
  const [, setSkills] = useState<Skill[]>([]);
  const [Lang, setLang] = useState<string[]>([]);
  const [Frames, setFrames] = useState<string[]>([]);
  const [db, setDb] = useState<string[]>([]);
  const [other, setOther] = useState<string[]>([]);

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
      .then((data: Skill[]) => {
        setSkills(data);
        const langArr: string[] = [];
        const framesArr: string[] = [];
        const dbArr: string[] = [];
        const otherArr: string[] = [];
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
      className="site-container h-fit flex flex-col justify-center relative"
    >
      <Image
        src="/right-pattern.svg"
        alt=""
        className="absolute hidden right-0 bottom-0 w-2/12 max-w-xs md:block"
        width={320}
        height={700}
      />
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
            {Frames.map((img, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: img }} />
            ))}
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
