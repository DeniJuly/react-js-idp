import { StaffTrainingForm } from "@/types/data-types";
import { getCookie } from "@/utils/cookies";
import axios from "axios";

export const addStaffTraining = async (data: StaffTrainingForm) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan-training/save`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const updStaffTraining = async (data: StaffTrainingForm) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan-training/update`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const delStaffTraining = async (idStaff: number) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}v1/karyawan-training/delete/${idStaff}`
  );
};
