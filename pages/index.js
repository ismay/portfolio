import { gql } from "graphql-request";
import Head from "next/head";
import T from "prop-types";
import client from "../client";
import BoxShadow from "../components/box-shadow";
import Details from "../components/details";
import { Cell, Grid } from "../components/grid";
import ResponsiveImage from "../components/responsive-image";
import UndecoratedLink from "../components/undecorated-link";

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
          <Cell key={work.id} columns={2}>
            <UndecoratedLink href={`/work/${work.slug}`} title={work.title}>
              <BoxShadow>
                <ResponsiveImage
                  alt={work.title}
                  height={work.thumbnail.height}
                  src={work.thumbnail.url}
                  width={work.thumbnail.width}
                />
              </BoxShadow>
              <Details date={work.releasedAt} title={work.title} />
            </UndecoratedLink>
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
      releasedAt: T.string.isRequired,
      slug: T.string.isRequired,
      thumbnail: T.shape({
        height: T.number.isRequired,
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
      works(orderBy: releasedAt_DESC) {
        id
        title
        slug
        releasedAt
        thumbnail {
          url
          width
          height
        }
      }
    }
  `);

  return {
    props: { works },
    revalidate: 3600,
  };
}
