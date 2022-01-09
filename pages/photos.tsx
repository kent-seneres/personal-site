import { GetStaticProps, NextPage } from "next/types";
import Image from "next/image";
import globals from "@lib/globals";
import { getPhotos, Photo } from "@lib/api";
import PageWrapper from "@components/PageWrapper";

export type PhotosProps = {
  photos: Photo[];
};

const Photos: NextPage<PhotosProps> = (props) => {
  const pageTitle = `Pictures - ${globals.name}`;

  return (
    <PageWrapper title={pageTitle}>
      <div className="self-stretch m-4 py-4 text-left border-b">
        <h1 className="text-4xl font-semibold my-2">Photos</h1>
      </div>
      <section className="flex flex-wrap justify-center items-center space-x-2 space-y-2">
        {props.photos.map((photo) => (
          <div className="max-w-xs">
            <Image
              src={photo.webContentLink}
              alt={photo.webContentLink}
              width={photo.imageMediaMetadata.width}
              height={photo.imageMediaMetadata.height}
              title={photo.description}
            />
          </div>
        ))}
      </section>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<PhotosProps> = async () => {
  const photos = await getPhotos();

  return {
    props: { photos },
    revalidate: 1,
  };
};

export default Photos;
