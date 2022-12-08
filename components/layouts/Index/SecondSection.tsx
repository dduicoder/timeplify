import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBarsProgress,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./SecondSection.module.scss";

type Props = {
  refFunc: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
};

const SecondSection: FC<Props> = ({ refFunc }) => {
  const [focus, setFocus] = useState<number>(0);

  const infoList = [
    {
      icon: faBarsProgress,
      text: "Check your daily schedule",
      subText: "Manage your daily schedule",
    },
    {
      icon: faClock,
      text: "Use your time wisely with Timeplifey",
      subText: "Manage your daily schedule",
    },
    {
      icon: faCalendarCheck,
      text: "Calendar everyday!",
      subText: "Manage your daily schedule",
    },
  ];

  const textList = [
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim corrupti
      vel explicabo itaque numquam. Repellat alias animi in eius. Perspiciatis,
      ex iure hic assumenda accusamus magnam quidem porro obcaecati at
      asperiores quos ab dignissimos, dolorum iusto possimus officia voluptate,
      exercitationem ducimus error praesentium dolorem dolore! Eligendi quae
      vero facilis veritatis.
    </div>,
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus
      laboriosam ut voluptatum itaque ullam dignissimos fuga, doloribus facere
      quidem numquam ratione, dicta iste distinctio, aut accusantium iure? Optio
      aliquam quasi vero fuga nihil nesciunt nam, deserunt voluptates culpa et
      sequi eum facere quibusdam atque at suscipit! Voluptatibus delectus
      adipisci totam sit doloribus deleniti ab error laudantium ducimus!
      Temporibus vel, error incidunt debitis tenetur velit dignissimos
      consequuntur veritatis explicabo at, rem modi quibusdam mollitia voluptas
      sunt dolor ratione facere obcaecati commodi iste corporis est repellendus
      labore officiis? Facilis eaque temporibus fugit consequuntur assumenda,
      dolore, quas placeat dicta reprehenderit corrupti vel.
    </div>,
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reiciendis
      ullam? Pariatur quae praesentium suscipit. Minus consectetur placeat autem
      voluptate commodi aperiam laboriosam alias officiis! Maiores, ea tenetur
      tempore explicabo a ratione quos magni nesciunt, inventore non quia
      mollitia quibusdam corrupti id! Perspiciatis aliquid quae minus alias
      ipsam eligendi voluptates est, explicabo quaerat porro doloremque,
      aspernatur necessitatibus nobis eum voluptatibus magni laudantium eius
      suscipit odit corrupti quam inventore illum? Neque cupiditate, alias
      architecto quibusdam voluptates delectus quidem expedita impedit quae
      nobis enim, asperiores quia temporibus veniam ut. Explicabo ab ea
      architecto sit quos. Corporis, quis asperiores. Sunt corrupti, accusamus
      consectetur placeat molestias illo nobis excepturi quasi nesciunt mollitia
      nostrum sed architecto ratione facilis commodi veniam, eius laborum quam
      dolorum tempora. Mollitia veniam voluptas, natus itaque possimus officiis
      deleniti recusandae veritatis impedit, alias nostrum praesentium sint
      molestiae nobis illum aliquid suscipit aperiam tenetur, velit soluta dolor
      sit odio illo accusantium. Consequatur!
    </div>,
  ];

  return (
    <section className={classes.second}>
      <div ref={refFunc} className={classes.content}>
        <div>
          <h1>Save your time with Timeplifey</h1>
          <ul className={classes.list}>
            {infoList.map(({ icon, text, subText }, i) => (
              <li
                key={i}
                onClick={() => setFocus(i)}
                className={focus === i ? classes.focus : ""}
              >
                <span>
                  <FontAwesomeIcon icon={icon} /> {text}
                </span>
                {focus === i ? subText : ""}
              </li>
            ))}
          </ul>
        </div>
        {textList[focus]}
      </div>
    </section>
  );
};

export default SecondSection;
