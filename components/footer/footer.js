import s from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={s.container}>
      <a className={s.link} href="mailto:superwolff@superwolff.nl">
        Email
      </a>
      <a
        className={s.link}
        href="https://theartling.com/en/print-artists/superwolff"
      >
        Buy Prints
      </a>
      <a className={s.link} href="https://mastodon.art/@superwolff" rel="me">
        Mastodon
      </a>
    </footer>
  );
}
