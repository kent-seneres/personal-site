import { GetStaticProps, NextPage } from "next/types";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import globals from "@lib/globals";
import { getMetadataFile } from "@lib/api";
import { Photo } from "@lib/types";
import { FiXCircle, FiArrowLeft, FiArrowRight } from "react-icons/fi";

type CarouselProps = {
  metadataFile: string;
};

const Carousel: NextPage<CarouselProps> = (props) => {
  const pageTitle = `Photos - ${globals.name}`;

  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    fetch(props.metadataFile)
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((e) => console.log(e));
  }, [props.metadataFile]);

  let selectedPhoto = -1;
  let match = router.asPath.match(/#([0-9]+)/);
  if (match) {
    const id = parseInt(match[1]);
    if (id >= 0 && id < photos.length) {
      selectedPhoto = id;
    }
  }

  const photo: Photo | undefined = photos[selectedPhoto];
  const previous = selectedPhoto > 0 ? selectedPhoto - 1 : 0;
  const next =
    selectedPhoto < photos.length - 1 ? selectedPhoto + 1 : selectedPhoto;

  const dismiss = () => router.back();

  return (
    <div className="fixed flex justify-center h-screen w-screen bg-black">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="fixed top-0 h-16 w-full flex justify-end max-w-4xl">
        <button
          className="cursor-pointer h-16 opacity-50 hover:opacity-100 flex flex-row items-center"
          onClick={dismiss}
        >
          <p className="text-white">Close</p>
          <FiXCircle color="white" className="h-16 w-16 p-4 pl-0" />
        </button>
      </div>
      <div className="fixed inset-x-0 inset-y-16 ">
        {photo && (
          <Image
            src={photo.path}
            alt={photo.name}
            fill
            className="object-contain"
            title={photo.description ?? undefined}
          />
        )}
      </div>
      <div className="z-1 w-screen max-w-4xl h-32 flex flex-row justify-between items-center self-center">
        <Link
          href={`#${previous}`}
          replace={true}
          aria-disabled={selectedPhoto === 0}
          className={`${selectedPhoto === 0 ? "pointer-events-none" : ""} opacity-10 hover:opacity-100 h-32 flex items-center`}
        >
          <FiArrowLeft color="white" className="h-24 w-24 p-4" />
        </Link>

        <Link
          href={`#${next}`}
          replace={true}
          aria-disabled={selectedPhoto === photos.length - 1}
          className={`${selectedPhoto === photos.length - 1 ? "pointer-events-none" : ""} opacity-10 hover:opacity-100 flex items-center`}
        >
          <FiArrowRight color="white" className="h-24 w-24 p-4" />
        </Link>
      </div>

      <div className="fixed top-full -mt-16 h-16 w-screen flex items-center justify-center">
        <p className="text-white text-center">{photo?.description}</p>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<CarouselProps> = async () => {
  const metadataFile = getMetadataFile();
  return { props: { metadataFile } };
};

export default Carousel;
