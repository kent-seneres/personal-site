import { GetStaticProps, NextPage } from "next/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import globals from "@lib/globals";
import { getPhotos, Photo } from "@lib/api";
import {
  FiXCircle,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";

type CarouselProps = {
  photos: Photo[];
};

const Carousel: NextPage<CarouselProps> = (props) => {
  const pageTitle = `Photos - ${globals.name}`;

  const router = useRouter();
  const index = Number(router.query.index ?? "");
  const [selectedPhoto, setSelectedPhoto] = React.useState<number>(index ?? 0);

  const changeSelectedPhoto = (adjust: number) => {
    setSelectedPhoto((i) => {
      const newIndex = i + adjust;
      return Math.max(0, Math.min(newIndex, props.photos.length - 1));
    });
  };

  const photo = props.photos[selectedPhoto];
  const dismiss = () => router.back();
  const next = () => changeSelectedPhoto(1);
  const previous = () => changeSelectedPhoto(-1);

  return (
    <div className="fixed flex justify-center h-full w-full bg-black">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="fixed w-screen inset-16 -ml-16 ">
        <Image
          src={photo.path}
          alt={photo.name}
          layout="fill"
          objectFit="contain"
          title={photo.description ?? undefined}
        />
      </div>
      <div className="fixed top-0 h-16 w-screen max-w-4xl">
        <button
          className="absolute left-full -ml-16 h-16 opacity-50 hover:opacity-90"
          onClick={dismiss}
        >
          <FiXCircle color="white" className="h-16 w-16 p-4" />
        </button>
      </div>
      <div className="absolute top-full -mt-16 h-16 w-screen max-w-4xl overflow-hidden">
        <div className="flex justify-between items-center h-full">
          <button className="opacity-50 hover:opacity-100" onClick={previous}>
            <FiArrowLeftCircle color="white" className="h-16 w-16 p-4" />
          </button>
          <p className="text-white text-center">{photo.description}</p>
          <button className="opacity-50 hover:opacity-100" onClick={next}>
            <FiArrowRightCircle color="white" className="h-16 w-16 p-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<CarouselProps> = async () => {
  const photos = await getPhotos();
  return { props: { photos } };
};

export default Carousel;
