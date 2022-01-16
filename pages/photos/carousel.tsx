import { GetStaticProps, NextPage } from "next/types";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import globals from "@lib/globals";
import { getMetadataFile } from "@lib/api";
import { Photo } from "@lib/types";
import {
  FiXCircle,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";

type CarouselProps = {
  metadataFile: string;
};

const Carousel: NextPage<CarouselProps> = (props) => {
  const pageTitle = `Photos - ${globals.name}`;

  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = React.useState<number>(0);
  const router = useRouter();

  React.useEffect(() => {
    fetch(props.metadataFile)
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((e) => console.log(e));
  }, [props.metadataFile]);

  React.useEffect(() => {
    let match = router.asPath.match(/#([0-9]+)/);
    if (match) {
      const id = parseInt(match[1]);
      if (id >= 0 && id < photos.length) {
        setSelectedPhoto(id);
      }
    }
  }, [photos, router.asPath]);

  const photo: Photo = photos[selectedPhoto];
  const previous = selectedPhoto > 0 ? selectedPhoto - 1 : 0;
  const next =
    selectedPhoto < photos.length - 1 ? selectedPhoto + 1 : selectedPhoto;

  const dismiss = () => router.back();

  return (
    <div className="fixed flex justify-center h-full w-full bg-black">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="fixed w-screen inset-16 -ml-16 ">
        {photo && (
          <Image
            src={photo.path}
            alt={photo.name}
            layout="fill"
            objectFit="contain"
            title={photo.description ?? undefined}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
          />
        )}
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
          <Link href={`#${previous}`} replace={true} passHref={true}>
            <button className="opacity-50 hover:opacity-100">
              <FiArrowLeftCircle color="white" className="h-16 w-16 p-4" />
            </button>
          </Link>

          <p className="text-white text-center">{photo?.description}</p>

          <Link href={`#${next}`} replace={true} passHref={true}>
            <button className="opacity-50 hover:opacity-100">
              <FiArrowRightCircle color="white" className="h-16 w-16 p-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<CarouselProps> = async () => {
  const metadataFile = getMetadataFile();
  return { props: { metadataFile } };
};

export default Carousel;
