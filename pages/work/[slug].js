/* eslint-disable react/jsx-props-no-spreading, react/forbid-prop-types */

import { gql } from "graphql-request";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import pMap from "p-map";
import { getPlaiceholder } from "plaiceholder";
import T from "prop-types";
import client from "../../client";
import BoxShadow from "../../components/box-shadow";
import Details from "../../components/details";
import { Cell, Grid } from "../../components/grid";
import ImageZoom from "../../components/image-zoom";
import Vimeo from "../../components/vimeo";

export default function Work({ work }) {
  const hasVideos = work.videos.length > 0;
  const hasImages = work.images.length > 0;
  const hasDescription = !!work.description;
  const title = `${work.title} - Superwolff`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {hasImages && (
        <Grid>
          {work.images.map((image, index) => (
            <Cell columns={3} key={image.id}>
              <ImageZoom
                alt={work.title}
                amount={work.images.length}
                blurDataURL={image.placeholderDataUrl}
                height={image.height}
                index={index}
                margin={25}
                src={image.url}
                width={image.width}
              />
            </Cell>
          ))}
        </Grid>
      )}
      {hasVideos && (
        <Grid>
          {work.videos.map((video) => (
            <Cell key={video.id}>
              <BoxShadow>
                <Vimeo
                  height={video.height}
                  id={video.vimeoId}
                  title={work.title}
                  width={video.width}
                />
              </BoxShadow>
            </Cell>
          ))}
        </Grid>
      )}
      <Details isRightAligned date={work.published} title={work.title} />
      {hasDescription && <MDXRemote {...work.description} />}
    </>
  );
}

Work.propTypes = {
  work: T.shape({
    description: T.object,
    images: T.arrayOf(
      T.shape({
        height: T.number.isRequired,
        id: T.string.isRequired,
        placeholderDataUrl: T.string,
        url: T.string.isRequired,
        width: T.number.isRequired,
      })
    ).isRequired,
    published: T.string.isRequired,
    title: T.string.isRequired,
    videos: T.arrayOf(
      T.shape({
        height: T.number.isRequired,
        id: T.string.isRequired,
        vimeoId: T.string.isRequired,
        width: T.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export async function getStaticPaths() {
  const { works } = await client.request(gql`
    query getWorkSlugs {
      works(first: 50) {
        slug
      }
    }
  `);

  const paths = works.map(({ slug }) => ({
    params: { slug },
  }));

  return { fallback: "blocking", paths };
}

export async function getStaticProps({ params }) {
  const { work } = await client.request(
    gql`
      query getWork($slug: String!) {
        work(where: { slug: $slug }) {
          title
          published
          description
          images {
            id
            url
            height
            width
            placeholderUrl: url(
              transformation: {
                image: { resize: { width: 10, height: 10, fit: clip } }
              }
            )
            mimeType
          }
          videos {
            id
            vimeoId
            height
            width
          }
        }
      }
    `,
    params
  );

  if (!work) {
    return {
      notFound: true,
      revalidate: 3600,
    };
  }

  /**
   * Fetch all image placeholders, convert to base64 and add to the work.
   */

  const addPlaceholder = async (image) => {
    const { base64 } = await getPlaiceholder(image.placeholderUrl);
    const currentImage = image;

    currentImage.placeholderDataUrl = base64;
  };

  await pMap(work.images, addPlaceholder, { concurrency: 4 });

  // Parse description markdown, if it exists
  if (work.description) {
    const description = await serialize(work.description);
    work.description = description;
  }

  return {
    props: { work },
    revalidate: 3600,
  };
}
