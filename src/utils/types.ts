export type typeLoginDetails = {
  email: string;
  password: string;
};

export type typeRegisterDetails = {
  emailAddress: string;
  password: string;
  type: number;
  ProfileSourceId: number;
};

export type typeOtp = {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  verifyLoading?: boolean;
};

export type typeVerifyAccount = {
  otp: number;
  userId: number;
};

export type typeResendOtp = {
  emailAddress: string;
};

export type typeLogin = {
  credentials: string;
};

export type typeUpload = {
  file: FormData;
};

export type typeCreateProfile = {
  firstName: string;
  lastName: string;
  ProfileSourceId: number;
  PictureId: number;
};

export type typeCategoryCard = {
  imageUrl: string;
  categoryName: string;
  categoryDesc: string;
};

export type typeFoodCard = {
  imageUrl: string;
  foodName: string;
  cafLocation: string;
  category: string;
  price: string;
  productId: number;
};

export type typeAuthContext = {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: number | null;
  setUserId: (userId: number | null) => void;
  hasProfile: boolean;
  setHasProfile: (hasProfile: boolean) => void;
};
