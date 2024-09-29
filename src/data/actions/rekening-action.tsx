import { RekeningForm, Staff } from "@/types/data-types";
import { getCookie } from "@/utils/cookies";
import axios from "axios";

export const addRekening = async (data: RekeningForm) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}v1/rekening/save`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const updRekening = async (data: RekeningForm) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}v1/rekening/update`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const delRekening = async (idStaff: number) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}v1/rekening/delete/${idStaff}`
  );
};
