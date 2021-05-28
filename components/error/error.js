import T from "prop-types";
import s from "./error.module.css";

export default function Error({ message, statusCode }) {
  return (
    <div className={s.container}>
      <h1 className={s.title}>{statusCode}</h1>
      <p>{message}</p>
    </div>
  );
}

Error.propTypes = {
  message: T.string.isRequired,
  statusCode: T.string.isRequired,
};
