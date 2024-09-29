export type Staff = {
  id?: number;
  no?: number;
  name: string;
  dob: string;
  status: "active" | "not-active";
  address: string;
  karyawanDetail: {
    nik: string;
    npwp: string;
  };
};

export type Training = {
  id?: number;
  no?: number;
  tema: string;
  pengajar: string;
  created_date?: string;
  updated_date?: string;
};

export type Rekening = {
  id: number;
  no: number;
  jenis: string;
  nama: string;
  norek: string;
};

export type StaffTraining = {
  id?: number;
  no?: number;
  training: Training;
  karyawan: Staff;
  training_date: string;
};

export type StaffTrainingForm = {
  id?: number;
  training: {
    id: number;
  };
  karyawan: {
    id: number;
  };
  training_date: string;
};

export type LoginResponse = {
  status: string;
  message: string | object;
  data?: {
    access_token: string;
    expires_in: number;
  };
};
