export type PetCareResponse = {
  content: PetCareModel[];
  pageable: pages;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type PetCareModel = {
  id: string;
  dailyNote: string;
  diagnosis: string;
  treatment: string;
  petName: string;
  admissionDate: string;
  dischargeDate: string;
  doctorName: string | null;
  cageNumber: string;
  status: "UNDER_TREATMENT" | "RECOVERED";
  totalPrice: number;
  paid: boolean;
  onRemove: () => void;
  onUpdate: () => void;
  onRepay: () => void;
  onReview: () => void;
  onCancel: () => void;
  onDischarge: () => void;
};

export type pages = {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
};
