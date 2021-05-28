import { gql } from "graphql-request";
import Head from "next/head";
import T from "prop-types";
import client from "../../client";
import BoxShadow from "../../components/box-shadow";
import Details from "../../components/details";
import { Cell, Grid } from "../../components/grid";
import Vimeo from "../../components/vimeo";
import ZoomImage from "../../components/zoom-image";

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
          {work.images.map((image) => (
            <Cell key={image.id} columns={3}>
              <ZoomImage
                alt={work.title}
                height={image.height}
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
                  vimeo={video.vimeo}
                  width={video.width}
                />
              </BoxShadow>
            </Cell>
          ))}
        </Grid>
      )}
      <Details
        date={work.releasedAt}
        dimensions={work.dimensions}
        medium={work.medium}
        right
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
        url: T.string.isRequired,
        width: T.number.isRequired,
      })
    ).isRequired,
    medium: T.string,
    releasedAt: T.string.isRequired,
    title: T.string.isRequired,
    videos: T.arrayOf(
      T.shape({
        height: T.number.isRequired,
        id: T.string.isRequired,
        vimeo: T.string.isRequired,
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
          releasedAt
          medium
          dimensions
          images {
            id
            url
            height
            width
          }
          videos {
            id
            vimeo
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

  return {
    props: { work },
    revalidate: 3600,
  };
}
