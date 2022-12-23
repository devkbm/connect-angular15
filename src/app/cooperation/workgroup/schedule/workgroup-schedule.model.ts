export interface WorkGroupSchedule {
  id: string | null;
  text: string | null;
  start: string | null;
  end: string | null;
  allDay: boolean | null;
  workGroupId: string | null;
  color?: string;
}
