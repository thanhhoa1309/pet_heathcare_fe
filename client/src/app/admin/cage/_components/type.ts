export type CageModel = {
  id: string;
  cageNumber: number;
  cageStatus: "Available";
  capacity: number;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  onRemove: () => void;
  onUnRemove: () => void;
  onUpdate: () => void;
};
