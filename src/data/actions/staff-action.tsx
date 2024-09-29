import { Staff } from "@/types/data-types";
import { getCookie } from "@/utils/cookies";
import axios from "axios";

export const getStaffData = (url: string) => {
  fetch(url).then((res) => res.json());
};

export const addStaff = async (data: Staff) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/save`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const updStaff = async (data: Staff) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/update`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const delStaff = async (idStaff: number) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan/delete/${idStaff}`
  );
};
