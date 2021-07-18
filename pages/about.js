/* eslint-disable react/jsx-props-no-spreading, react/forbid-prop-types */

import { gql } from "graphql-request";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import T from "prop-types";
import client from "../client";

export default function About({ source }) {
  return (
    <>
      <Head>
        <title>About - Superwolff</title>
      </Head>
      <MDXRemote {...source} />
    </>
  );
}

About.propTypes = {
  source: T.object.isRequired,
};

export async function getStaticProps() {
  const { page } = await client.request(
    gql`
      query getPage($title: String!) {
        page(where: { title: $title }) {
          mdx
        }
      }
    `,
    { title: "About" }
  );

  const source = await serialize(page.mdx);

  return {
    props: { source },
    revalidate: 3600,
  };
}
