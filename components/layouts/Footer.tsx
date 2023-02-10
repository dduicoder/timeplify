import { FC } from "react";

import Link from "next/dist/client/link";

import classes from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.control}>
        <div>
          <span>Links</span>
          <a
            href="https://next-practice-amber.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Other site
          </a>
          <a href="https://velog.io/@ddui" target="_blank" rel="noreferrer">
            Blog
          </a>
        </div>
        <div>
          <span>Help</span>
          <Link href="/">FAQ</Link>
          <Link href="/">Terms of use</Link>
        </div>
        <div>
          <span>Contact</span>
          <span>+82 10 3314 6432</span>
          <span>sijinpark77@gmail.com</span>
        </div>
        <div>
          <span>About</span>
          <span>
            This website is powered by Nextjs, Typescript and Graphql.
          </span>
        </div>
      </div>
      <p>Copyright 2023. All rights reserved by Sijin Park.</p>
    </footer>
  );
};

export default Footer;
