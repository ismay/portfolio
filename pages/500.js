import Head from "next/head";
import Error from "../components/error";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Internal server error - Superwolff</title>
      </Head>
      <Error message="Internal server error" statusCode="500" />
    </>
  );
}
