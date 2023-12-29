"use client";
import React, { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Pelanggan = {
  id: number;
  nama: string;
  email: number;
  nomor_telepon: number;
  alamat:string;};


const API_URL = "http://127.0.0.1:8000/api";
const DeletePelanggan = (Pelanggan:Pelanggan) => {
  const [modal, setModal] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("")
  const [nomor_telepon, setNomor_telepon] = useState("")
  const [alamat, setAlamat] = useState("")
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleDelete = async (PelangganId : Number) => {
    setIsMutating(true);
    let params = {id : PelangganId}
    let endpoint =` ${API_URL}/pelanggan/${PelangganId}`;
    const data = {
      nama: nama,
      email: email,
      nomor_telepon: nomor_telepon,
      alamat: alamat,
    };
    await axios.delete(endpoint);
   
    setIsMutating(false);
    router.refresh();
    setModal(false);
  };
  return (
    <div>
      <button className="btn btn-error" onClick={handleChange}>
        Delete
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {Pelanggan.nama} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(Pelanggan.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Delete loading ...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePelanggan;