export type UserResponse = {
  content: UserModel[];
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

export type UserModel = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: "DOCTOR" | "STAFF" | "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  onRemove: () => void;
  onUnRemove: () => void;
  onUpdate: () => void;
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
