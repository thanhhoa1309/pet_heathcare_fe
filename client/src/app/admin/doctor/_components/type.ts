export type DoctorModel = {
  id: string;
  fullName: string;
  imageUrl: string;
  email: string;
  specialty: string;
  start_time: string;
  end_time: string;
  workingDay: [
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
  ];
  onRemove: () => void;
  onUnRemove: () => void;
  onUpdate: () => void;
};
