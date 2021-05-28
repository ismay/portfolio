import Head from "next/head";
import Error from "../components/error";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not found - Superwolff</title>
      </Head>
      <Error message="The requested page could not be found" statusCode="404" />
    </>
  );
}
