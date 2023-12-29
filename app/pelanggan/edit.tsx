"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type pelanggan = {
  id: number;
  nama: string;
  email: string;
  nomor_telepon: number;
  alamat:string;};
const API_URL = 'http://127.0.0.1:8000/api'
const Editpelanggan = (pelanggan: pelanggan) => {
  const [modal, setModal] = useState(false);
  const [nama, setNama] = useState(pelanggan.nama);
  const [email, setEmail] = useState(pelanggan.email);
  const [nomor_telepon, setNomor_telepon] = useState(Number(pelanggan.nomor_telepon));
  const [alamat, setAlamat] = useState(pelanggan.alamat);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/pelanggan/${pelanggan.id}`;
    const data = {
      nama: nama,
      email: email,
      nomor_telepon: nomor_telepon,
      alamat: alamat
    };
    await axios.patch(endpoint, data);
    setNama('')
    setEmail("")
    setNomor_telepon(Number)
    setAlamat('')
    setIsMutating(false);
    router.refresh()
    setModal(false)
  }
  return (
    <div>
      <button className="btn btn-info" onClick={handleChange}>
        Edit
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Pelanggan</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama"
              />
               <label className="label font-bold">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Email"
              />
               <label className="label font-bold">Nomor_telepon</label>
              <input
                type="text"
                value={nomor_telepon}
                onChange={(e) => setNomor_telepon(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Nomor_telepon"
              />
               <label className="label font-bold">Alamat</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Alamat"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Submit loading ...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editpelanggan