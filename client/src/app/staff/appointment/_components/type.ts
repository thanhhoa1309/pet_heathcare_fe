export type AppointmentResponse = {
  content: AppointmentModel[];
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

export type AppointmentModel = {
  id: string;
  appointmentDate: string;
  petName: string;
  doctorName: string;
  appointmentStatus: "PENDING";
  appointmentPrice: number;
  refund_payments: number;
  paidStatus: boolean;
  service: string;
  deleted: false;
  createdAt: string;
  updatedAt: string;
  onRemove: () => void;
  onUpdate: () => void;
  onRepay: () => void;
  onReview: () => void;
  onCancel: () => void;
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
