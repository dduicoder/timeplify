import { useRouter } from "next/router";
import { FC } from "react";

const CalendarHome: FC = () => {
  const router = useRouter();

  const today = new Date()
    .toLocaleDateString()
    .replaceAll(". ", "-")
    .slice(0, 10);

  const onClick = () => {
    router.push(`/calendar/${today}`);
  };

  return (
    <div>
      <button className="btn-flat" onClick={onClick}>
        Today&apos;s Calendar
      </button>
    </div>
  );
};

export default CalendarHome;
