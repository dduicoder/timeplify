import Link from "next/dist/client/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import classes from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <section className={classes.error}>
      <FontAwesomeIcon icon={faCircleExclamation} />
      <h2>404 - Page not found</h2>
      <p>There is no such page.</p>
      <Link href="/">
        <button className="btn-flat">Home</button>
      </Link>
    </section>
  );
};

export default NotFound;
