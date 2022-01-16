import { GetStaticProps, NextPage } from "next/types";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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

  const [selectedPhoto, setSelectedPhoto] = React.useState<number>(0);
  const router = useRouter();

  React.useEffect(() => {
    let match = router.asPath.match(/#([0-9]+)/);
    if (match) {
      const id = parseInt(match[1]);
      if (id > 0 && id < props.photos.length) {
        setSelectedPhoto(id);
      }
    }
  }, [router.asPath]);

  const dismiss = () => router.back();

  const photo = props.photos[selectedPhoto];
  const previous = Math.max(0, selectedPhoto - 1);
  const next = Math.min(selectedPhoto + 1, props.photos.length - 1);

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
          <Link href={`#${previous}`} replace={true}>
            <button className="opacity-50 hover:opacity-100">
              <FiArrowLeftCircle color="white" className="h-16 w-16 p-4" />
            </button>
          </Link>

          <p className="text-white text-center">{photo.description}</p>

          <Link href={`#${next}`} replace={true}>
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
  const photos = await getPhotos();
  return { props: { photos } };
};

export default Carousel;
