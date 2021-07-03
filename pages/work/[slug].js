import { gql } from "graphql-request";
import Head from "next/head";
import T from "prop-types";
import client, { imageUrlToDataUrl } from "../../client";
import BoxShadow from "../../components/box-shadow";
import Details from "../../components/details";
import { Cell, Grid } from "../../components/grid";
import { GalleryImage } from "../../components/image";
import Vimeo from "../../components/vimeo";

export default function Work({ work }) {
  const hasVideos = work.videos.length > 0;
  const hasImages = work.images.length > 0;

  return (
    <>
      <Head>
        <title>{work.title} - Superwolff</title>
      </Head>
      {hasImages && (
        <Grid>
          {work.images.map((image, index) => (
            <Cell columns={3} key={image.id}>
              <BoxShadow>
                <GalleryImage
                  alt={work.title}
                  amount={work.images.length}
                  blurDataURL={image.placeholderDataUrl}
                  height={image.height}
                  index={index}
                  src={image.url}
                  width={image.width}
                />
              </BoxShadow>
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
      <Details
        isRightAligned
        date={work.published}
        dimensions={work.dimensions}
        medium={work.medium}
        title={work.title}
      />
    </>
  );
}

Work.propTypes = {
  work: T.shape({
    dimensions: T.string,
    images: T.arrayOf(
      T.shape({
        height: T.number.isRequired,
        id: T.string.isRequired,
        placeholderDataUrl: T.string,
        url: T.string.isRequired,
        width: T.number.isRequired,
      })
    ).isRequired,
    medium: T.string,
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
      works {
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
          medium
          dimensions
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
   * Fetch all image placeholders, convert to base64 and add to the work. This
   * currently runs serially, but can be easily modified to run in parallel if
   * necessary.
   */

  // eslint-disable-next-line no-restricted-syntax
  for (const image of work.images) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const placeholderDataUrl = await imageUrlToDataUrl(
        image.placeholderUrl,
        image.mimeType
      );

      // eslint-disable-next-line no-param-reassign
      image.placeholderDataUrl = placeholderDataUrl;
    } catch (e) {
      // Currently swallows any errors, this should be tracked
    }
  }

  return {
    props: { work },
    revalidate: 3600,
  };
}
