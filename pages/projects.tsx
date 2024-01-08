import type { NextPage } from "next";
import Image from "next/image";
import globals from "@lib/globals";
import PageWrapper from "@components/PageWrapper";
import Markdown from "@components/Markdown";

type ProjectProps = {
  title: string;
  description: string;
  logoSrc: string;
  href?: string;
};

const Project: React.FC<ProjectProps> = (props) => {
  return (
    <div className="flex border items-center rounded-lg shadow-md p-4 space-x-4">
      <div className="w-16 h-16 sm:w-24 sm:h-24 relative">
        <Image src={props.logoSrc} alt="project icon" fill />
      </div>
      <div className="flex flex-col items-start flex-1 text-left space-y-2">
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          <span className="text-2xl font-medium text-sky-600 hover:text-sky-500">
            {props.title}
          </span>
        </a>
        <div className="text-sky-500">
          <Markdown
            customClassName="prose-p:text-base prose-a:text-sky-600 prose-a:hover:text-sky-500 prose-a:no-underline"
            content={props.description}
          />
        </div>
      </div>
    </div>
  );
};

const Projects: NextPage = () => {
  const pageTitle = `Projects - ${globals.name}`;
  const preamble = `I don't actually have a lot of projects to share yet. 
    The scarcity of this page serves as a reminder to create more.`;

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 pb-2 border-b text-left">
        <h1 className="text-4xl font-semibold my-2">Projects</h1>
        <p className="my-2">{preamble}</p>
      </div>
      <div className="flex flex-col flex-1 self-stretch m-4 space-y-4">
        <Project
          title="Tortle"
          description={`High stakes spoof of [WORDLE](https://www.powerlanguage.co.uk/wordle/). 
          Only one guess per day!`}
          href="/tortle"
          logoSrc="/images/projects/tortle.png"
        />
        <Project
          title="Weather"
          description={`Clone of the Dark Sky weather app, which used to be the best weather app on Android (RIP). 
          Built with React Native, using [OpenWeather](https://openweathermap.org/) as the data source.`}
          href="https://github.com/kent-seneres/weather"
          logoSrc="/images/projects/weather.png"
        />
      </div>
    </PageWrapper>
  );
};

export default Projects;
