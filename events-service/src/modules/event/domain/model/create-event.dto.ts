export class CreateEventDto {
  title: string;
  examId: number;
  expectedRegistrations: number;
  date: Date;
  createdAt: Date;
}
