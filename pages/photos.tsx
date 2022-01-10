import { GetStaticProps, NextPage } from "next/types";
import Image from "next/image";
import globals from "@lib/globals";
import { getPhotos, Photo } from "@lib/api";
import PageWrapper from "@components/PageWrapper";

export type PhotosProps = {
  photos: Photo[];
};

const Photos: NextPage<PhotosProps> = (props) => {
  const pageTitle = `Photos - ${globals.name}`;

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 py-4 text-left border-b">
        <h1 className="text-4xl font-semibold my-2">Photos</h1>
      </div>
      <section className="flex-1 self-stretch">
        <div className="flex flex-row flex-wrap">
          {props.photos.map((photo) => (
            <div
              key={photo.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto p-1"
            >
              <Image
                src={photo.path}
                alt={photo.name}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                title={photo.description ?? undefined}
              />
            </div>
          ))}
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
