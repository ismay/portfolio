import { gql } from "graphql-request";
import Head from "next/head";
import T from "prop-types";
import client, { imageUrlToDataUrl } from "../client";
import BoxShadow from "../components/box-shadow";
import Details from "../components/details";
import { Cell, Grid } from "../components/grid";
import { ThumbnailImage } from "../components/image";
import ImageLink from "../components/image-link";

export default function Home({ works }) {
  return (
    <>
      <Head>
        <title>Superwolff</title>
        <meta
          content="The work of visual artist Superwolff."
          name="description"
        />
      </Head>
      <Grid>
        {works.map((work, index) => (
          <Cell key={work.id} columns={2}>
            <ImageLink href={`/work/${work.slug}`} title={work.title}>
              <BoxShadow>
                <ThumbnailImage
                  alt={work.title}
                  amount={works.length}
                  blurDataURL={work.thumbnail.placeholderDataUrl}
                  height={work.thumbnail.height}
                  index={index}
                  src={work.thumbnail.url}
                  width={work.thumbnail.width}
                />
              </BoxShadow>
              <Details date={work.published} title={work.title} />
            </ImageLink>
          </Cell>
        ))}
      </Grid>
    </>
  );
}

Home.propTypes = {
  works: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      published: T.string.isRequired,
      slug: T.string.isRequired,
      thumbnail: T.shape({
        height: T.number.isRequired,
        placeholderDataUrl: T.string,
        url: T.string.isRequired,
        width: T.number.isRequired,
      }).isRequired,
      title: T.string.isRequired,
    })
  ).isRequired,
};

export async function getStaticProps() {
  const { works } = await client.request(gql`
    query getWorks {
      works(orderBy: published_DESC) {
        id
        title
        slug
        published
        thumbnail {
          url
          width
          height
          placeholderUrl: url(
            transformation: {
              image: { resize: { width: 10, height: 10, fit: clip } }
            }
          )
          mimeType
        }
      }
    }
  `);

  /**
   * Fetch all image placeholders, convert to base64 and add to the work. This
   * currently runs serially, but can be easily modified to run in parallel if
   * necessary.
   */

  // eslint-disable-next-line no-restricted-syntax
  for (const work of works) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const placeholderDataUrl = await imageUrlToDataUrl(
        work.thumbnail.placeholderUrl,
        work.thumbnail.mimeType
      );

      // eslint-disable-next-line no-param-reassign
      work.thumbnail.placeholderDataUrl = placeholderDataUrl;
    } catch (e) {
      // Currently swallows any errors, this should be tracked
    }
  }

  return {
    props: { works },
    revalidate: 3600,
  };
}
