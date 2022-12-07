import { FC, Dispatch, SetStateAction } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBarsProgress,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./SirstSection.module.scss";

type Props = {
  refFunc: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
};

const SecondSection: FC<Props> = ({ refFunc }) => {
  return (
    <section className={classes.second}>
      <div ref={refFunc}>
        <div>
          <h1>Save your time with Timeplifey</h1>
          <ul className={classes.list}>
            <li>
              <FontAwesomeIcon icon={faBarsProgress} /> Check your daily
              schedule
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} /> Use your time wisely
            </li>
            <li>
              <FontAwesomeIcon icon={faCalendarCheck} /> Calendar everyday!
            </li>
          </ul>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque,
          aspernatur libero ut odio nesciunt qui harum voluptas nostrum officia
          dolorem reprehenderit fugit quibusdam veniam aut eum itaque error
          reiciendis sed labore nemo quam praesentium voluptatum maiores. Aut
          quod dolores neque totam asperiores harum praesentium sit repellat est
          nisi itaque, inventore incidunt id illum recusandae explicabo
          adipisci! Porro, ullam repellat eos perspiciatis illum impedit
          molestiae dolorem eum voluptatum error nemo obcaecati ab dolores minus
          magnam dicta suscipit, expedita est sequi quaerat tempore amet. Qui,
          saepe pariatur ullam aperiam quidem mollitia, debitis cumque error
          maiores aspernatur ipsum laborum tenetur facilis hic perspiciatis?
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
