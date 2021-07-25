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
        href="https://theartling.com/en/print-artists/superwolff"
        title="Buy prints at The Artling"
      >
        The Artling
      </a>
    </footer>
  );
}
