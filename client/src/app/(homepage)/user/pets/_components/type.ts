export type PetModel = {
  id: string;
  name: string;
  species: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  deleted: false;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  onRemove: () => void;
  onUpdate: () => void;
};
