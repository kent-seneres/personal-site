import { NextPage } from "next/types";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import globals from "@lib/globals";
import { Photo } from "@lib/types";
import {
  FiXCircle,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";

/**
 * File populated as part of photos page static build.
 * See `lib/api/getPhotos`
 */
import photos from "public/.drive-images-metadata.json";

type CarouselProps = {};

const Carousel: NextPage<CarouselProps> = (props) => {
  const pageTitle = `Photos - ${globals.name}`;

  const [selectedPhoto, setSelectedPhoto] = React.useState<number>(0);
  const router = useRouter();

  React.useEffect(() => {
    let match = router.asPath.match(/#([0-9]+)/);
    if (match) {
      const id = parseInt(match[1]);
      if (id >= 0 && id < photos.length) {
        setSelectedPhoto(id);
      }
    }
  }, [router.asPath]);

  const photo: Photo = photos[selectedPhoto];
  const previous = Math.max(0, selectedPhoto - 1);
  const next = Math.min(selectedPhoto + 1, photos.length - 1);

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

export default Carousel;
