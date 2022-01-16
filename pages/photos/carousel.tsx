import { GetStaticProps, NextPage } from "next/types";
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

type SelectedPhotoProps = {
  photo: Photo;
  next: () => void;
  previous: () => void;
  dismiss: () => void;
};

const SelectedPhoto: React.FC<SelectedPhotoProps> = (props) => {
  const { photo } = props;

  return (
    <div className="fixed z-10 inset-0 h-screen w-screen bg-black">
      <div className="fixed w-screen inset-10 -ml-10 ">
        <Image
          src={photo.path}
          alt={photo.name}
          layout="fill"
          objectFit="contain"
          title={photo.description ?? undefined}
        />
      </div>

      <button
        className="absolute left-full pl-8 -ml-24 w-24 h-24 opacity-50 hover:opacity-90"
        onClick={props.dismiss}
      >
        <FiXCircle color="white" className="h-8 w-8" />
      </button>
      <div className="absolute top-[50vh] -mt-[25vh] h-[50vh] w-screen ">
        <button
          className="absolute left-0 pl-8 h-full w-24 md:w-48 opacity-0 hover-hover:opacity-90"
          onClick={props.previous}
        >
          <FiArrowLeftCircle color="white" className="h-8 w-8" />
        </button>
        <button
          className="absolute left-full -ml-24 h-full w-24 md:w-48 md:-ml-48 pl-8 md:pl-32 opacity-0 hover-hover:opacity-90"
          onClick={props.next}
        >
          <FiArrowRightCircle color="white" className="h-8 w-8" />
        </button>
      </div>
      <p className="fixed text-white w-full top-full -mt-10 h-10 p-2 text-center">
        {photo.description}
      </p>
    </div>
  );
};

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

  return (
    <SelectedPhoto
      photo={props.photos[selectedPhoto]}
      dismiss={() => router.back()}
      next={() => changeSelectedPhoto(1)}
      previous={() => changeSelectedPhoto(-1)}
    />
  );
};

export const getStaticProps: GetStaticProps<CarouselProps> = async () => {
  const photos = await getPhotos();
  return { props: { photos } };
};

export default Carousel;
