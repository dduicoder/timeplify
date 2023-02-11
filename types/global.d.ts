export {};

declare global {
  type CalendarType = {
    id: string;
    title: string;
    start: string;
    end: string;
    description: string;
  };

  type NoticeType = {
    id: string;
    type: "ERROR" | "SUCCESS";
    message: string;
  };
}
