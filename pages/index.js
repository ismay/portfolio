import { gql } from "graphql-request";
import Head from "next/head";
import pMap from "p-map";
import { getPlaiceholder } from "plaiceholder";
import T from "prop-types";
import client from "../client";
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
        {works.map((work) => (
          <Cell columns={2} key={work.id}>
            <ImageLink href={`/work/${work.slug}`} title={work.title}>
              <BoxShadow>
                <ThumbnailImage
                  alt={work.title}
                  blurDataURL={work.thumbnail.placeholderDataUrl}
                  height={work.thumbnail.height}
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
      works(first: 50, orderBy: published_DESC) {
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
   * Fetch all image placeholders, convert to base64 and add to the work.
   */

  const addPlaceholder = async (work) => {
    const { base64 } = await getPlaiceholder(work.thumbnail.placeholderUrl);
    const currentWork = work;

    currentWork.thumbnail.placeholderDataUrl = base64;
  };

  await pMap(works, addPlaceholder, { concurrency: 4 });

  return {
    props: { works },
    revalidate: 3600,
  };
}
