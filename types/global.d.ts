export {};

declare global {
  type CalendarType = {
    id: string;
    text: string;
    start: string;
    end: string;
    description: string;
  };

  type NoticeType = {
    id: string;
    type: string;
    message: string;
  };
}
