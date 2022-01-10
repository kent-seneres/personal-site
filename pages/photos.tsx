import { GetStaticProps, NextPage } from "next/types";
import Image from "next/image";
import React from "react";
import globals from "@lib/globals";
import { getPhotos, Photo } from "@lib/api";
import PageWrapper from "@components/PageWrapper";

export type PhotosProps = {
  photos: Photo[];
};

const Photos: NextPage<PhotosProps> = (props) => {
  const pageTitle = `Photos - ${globals.name}`;

  const htmlElRef = React.useRef<HTMLButtonElement>(null);
  const [selectedPhoto, setSelectedPhoto] = React.useState<string>();

  React.useEffect(() => {
    if (selectedPhoto && htmlElRef.current) {
      htmlElRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [selectedPhoto]);

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 py-4 text-left border-b">
        <h1 className="text-4xl font-semibold my-2">Photos</h1>
      </div>
      <section className="flex-1 self-stretch">
        <div className="flex flex-row flex-wrap">
          {props.photos.map((photo) => {
            const isSelected = selectedPhoto === photo.id;
            return (
              <button
                key={photo.id}
                className={`p-0.5 ${
                  isSelected
                    ? "h-[95vh] w-full relative bg-black"
                    : "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto"
                }`}
                ref={isSelected ? htmlElRef : undefined}
                onClick={() =>
                  setSelectedPhoto(isSelected ? undefined : photo.id)
                }
              >
                <Image
                  src={photo.path}
                  alt={photo.name}
                  width="100%"
                  height="100%"
                  layout={isSelected ? "fill" : "responsive"}
                  objectFit={isSelected ? "contain" : "cover"}
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  title={photo.description ?? undefined}
                />
              </button>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<PhotosProps> = async () => {
  const photos = await getPhotos();

  return {
    props: { photos },
  };
};

export default Photos;
