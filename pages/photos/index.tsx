import { GetStaticProps, NextPage } from "next/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import globals from "@lib/globals";
import { getPhotos } from "@lib/api";
import { Photo } from "@lib/types";
import PageWrapper from "@components/PageWrapper";

type PhotosProps = {
  photos: Photo[];
};

const Photos: NextPage<PhotosProps> = (props) => {
  const pageTitle = `Photos - ${globals.name}`;

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 pb-2 text-left border-b h-full overflow-hidden">
        <h1 className="text-4xl font-semibold my-2">Photos</h1>
      </div>
      <section className={`flex-1 self-stretch`}>
        <div className={`flex flex-row flex-wrap`}>
          {props.photos.map((photo, index) => {
            return (
              <Link
                className={
                  "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 aspect-square relative"
                }
                key={index}
                href={`/photos/carousel#${index}`}
                passHref
              >
                <Image
                  className="p-0.5 object-cover"
                  src={photo.path}
                  alt={photo.name}
                  fill
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  title={photo.description ?? undefined}
                />
              </Link>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<PhotosProps> = async () => {
  const photos = await getPhotos();

  photos.sort(
    (a, b) =>
      new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime()
  );
  return { props: { photos } };
};

export default Photos;
