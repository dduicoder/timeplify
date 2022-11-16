import { useRouter } from "next/router";
import { FC } from "react";

const Index: FC = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/calendar");
  };

  return (
    <section>
      <h1>Timeplifey</h1>
      <button className="btn-flat" onClick={onClick}>
        Todays Calendar
      </button>
    </section>
  );
};

export default Index;
