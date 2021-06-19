import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About - Superwolff</title>
      </Head>
      <h2>About</h2>
      <p>
        Superwolff was born in 1983 in Heerde, the Netherlands. He graduated
        with a BA in Fine and Studio Arts from Academy Minerva of Groningen.
      </p>
      <p>
        His work has been exhibited internationally, including the LA Art Show
        (Los Angeles, US), Artolive Young Talent (Amsterdam, NL) and the EEA
        Decennial at Flutgraben (Berlin, DE). It has been covered in several
        publications, most notably Volkskrant Magazine and NRC Next.
      </p>
      <p>
        He lives and works in Groningen, the Netherlands. His CV can be
        downloaded{" "}
        <a href="/pdf/cv-superwolff.pdf" title="View CV">
          here
        </a>{" "}
        and he can be contacted via{" "}
        <a href="mailto:superwolff@superwolff.nl" title="Email Superwolff">
          email
        </a>
        . Prints of his work can be bought through{" "}
        <a
          href="https://theartling.com/en/print-artists/superwolff"
          title="Buy prints at The Artling"
        >
          The Artling
        </a>
        .
      </p>
    </>
  );
}
