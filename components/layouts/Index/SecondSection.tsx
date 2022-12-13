import { FC, Dispatch, SetStateAction, useState } from "react";

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
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid perspiciatis consequatur doloremque ipsam distinctio eveniet unde eligendi dolorum, at numquam, nemo quibusdam asperiores facere. Sapiente tempore delectus sunt repudiandae, assumenda placeat architecto possimus blanditiis expedita illum veniam iusto dolorem facere quo distinctio alias ab nihil fugit, veritatis iure? Iste.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum officia iusto pariatur fugit illo expedita ipsam debitis ex natus velit ad commodi aliquid distinctio accusantium quae iure modi nihil inventore, itaque aut corporis voluptatem maxime sit. Aspernatur, asperiores maxime accusamus ipsam illum, tempore eum possimus aliquam id blanditiis temporibus sunt aut velit quas delectus a doloremque expedita magnam minima corrupti. Eligendi quas perferendis tenetur similique assumenda inventore deserunt rem neque nobis molestiae hic odit ducimus earum error laboriosam at, pariatur mollitia sunt fugit! Cumque dignissimos quam saepe eum quas amet veritatis nemo! Harum porro consectetur molestiae dolorum quo aperiam magnam?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem provident quia quis. Eum quam beatae unde sapiente, reprehenderit nobis. Eaque quo reiciendis laboriosam ea corporis distinctio repudiandae vitae debitis dolore, pariatur architecto? Nostrum sunt vel optio quae. Aspernatur cupiditate atque reiciendis eaque, consequatur quod delectus alias saepe, aliquid accusantium architecto ullam eligendi facilis quas ab! Ipsa et cum nostrum exercitationem error ea obcaecati suscipit mollitia nemo harum animi omnis cupiditate maiores reprehenderit at tempora temporibus voluptas dolores eius earum, architecto minus vero sequi! Non hic nisi fugit quibusdam quisquam sed neque recusandae. Temporibus in tempora distinctio nobis. Eveniet velit error dolores odio, tempore modi beatae, placeat officiis sapiente numquam animi quidem aliquam facilis natus fuga excepturi fugit exercitationem inventore. Officia amet, omnis laboriosam qui inventore illo quod repellendus, sequi nobis laborum expedita. Quasi natus enim debitis, deleniti itaque fugiat perspiciatis quis, est eaque molestiae, alias at voluptas magni dicta atque.",
  ];

  const setAnimation = () => {
    const el: HTMLElement | null = document.querySelector(
      `.${classes["content__second"]}`
    );

    el?.classList.add(classes.pop);

    setTimeout(() => {
      el?.classList.remove(classes.pop);
    }, 500);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFocus((prevData) => {
  //       return prevData < 2 ? prevData + 1 : 0;
  //     });
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className={classes.second}>
      <div ref={refFunc} className={classes.content}>
        <div className={classes["content__first"]}>
          <h1>Save your time with Timeplifey</h1>
          <ul className={classes["content__first-list"]}>
            {infoList.map(({ icon, text, subText }, i) => (
              <li
                key={i}
                onClick={() => {
                  setFocus(i);
                  setAnimation();
                }}
                className={focus === i ? classes.focus : ""}
              >
                <span>
                  <FontAwesomeIcon icon={icon} /> {text}
                </span>
                {focus === i ? <span>{subText}</span> : ""}
              </li>
            ))}
          </ul>
        </div>
        <div className={classes["content__second"]}>{textList[focus]}</div>
      </div>
    </section>
  );
};

export default SecondSection;
