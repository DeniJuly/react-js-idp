export type Staff = {
  id: number;
  no?: number;
  nama: string;
  nik: string;
  alamat: string;
  status: "active" | "not active";
};

export type Training = {
  id: number;
  no?: number;
  tema: string;
  pengajar: string;
};

export type Rekening = {
  id: number;
  no: number;
  jenis: string;
  nama: string;
  norek: string;
};

export type StaffTraining = {
  id: number;
  no: number;
  nama: string;
  pelatihan: string;
};
