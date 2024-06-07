export type ServiceModel = {
  id: string;
  name: string;
  price: number;
  type: "APPOINTMENT" | "HOSPITALIZATION";
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  onRemove: () => void;
  onUpdate: () => void;
};
