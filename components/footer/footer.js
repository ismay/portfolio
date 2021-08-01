import s from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={s.container}>
      <a
        className={s.link}
        href="mailto:superwolff@superwolff.nl"
        title="Email me"
      >
        Email
      </a>

      <a
        className={s.link}
        href="https://tinyletter.com/superwolff"
        title="Subscribe to my newsletter"
      >
        Newsletter
      </a>
      <a
        className={s.link}
        href="https://post.lurk.org/@superwolff"
        rel="me"
        title="Follow me on Mastodon"
      >
        Mastodon
      </a>
      <a
        className={s.link}
        href="https://theartling.com/en/print-artists/superwolff"
        title="Buy prints at The Artling"
      >
        The Artling
      </a>
    </footer>
  );
}
