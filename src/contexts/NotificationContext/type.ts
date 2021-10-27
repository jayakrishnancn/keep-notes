export interface NotificationMessage {
  message: string | null;
  date: string | Date | null;
}

export interface Notification {
  setMessage: Function;
  data: NotificationMessage;
}
