export class EventDto {
  eventId: number;
  title: string;
  examId: number;
  status: string;
  date: Date;
  expectedRegistrations: number;
  totalRegistrations: number;
  createdAt: Date;
}
