import { Rekening, Staff, StaffTraining, Training } from "@/types/data-types";

export async function getDataRekening(): Promise<Rekening[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      no: 1,
      jenis: "BCA",
      nama: "Mamang",
      norek: "12345678",
    },
    {
      id: 2,
      no: 2,
      jenis: "BCA",
      nama: "Mamang",
      norek: "12345678",
    },
  ];
}

export async function getDataStaff(): Promise<Staff[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      no: 1,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 2,
      no: 2,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 3,
      no: 3,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 4,
      no: 4,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 5,
      no: 5,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 6,
      no: 6,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 7,
      no: 7,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 8,
      no: 8,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 9,
      no: 9,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 10,
      no: 10,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 11,
      no: 11,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 12,
      no: 12,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 13,
      no: 13,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 14,
      no: 14,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 15,
      no: 15,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
    {
      id: 16,
      no: 16,
      nama: "Deni Juli Setiawan",
      nik: "1233456",
      alamat: "lorem ipsum dolar isit amet",
      status: "active",
    },
  ];
}

export async function getDataTraining(): Promise<Training[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      no: 1,
      tema: "Java Springboot",
      pengajar: "Mas Riki",
    },
    {
      id: 2,
      no: 2,
      tema: "BackEnd",
      pengajar: "Mas Pur",
    },
  ];
}

export async function getDataStaffTraining(): Promise<StaffTraining[]> {
  return [
    {
      id: 1,
      no: 1,
      nama: "Deni Juli Setiawan",
      pelatihan: "Java Springboot",
    },
    {
      id: 2,
      no: 2,
      nama: "Deni Juli Setiawan",
      pelatihan: "Java Springboot",
    },
  ];
}
