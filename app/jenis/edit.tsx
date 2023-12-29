"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type jenis = {
  id: number;
  nama_jenis: string;
  kategori_id: number;
  };
const API_URL = 'http://127.0.0.1:8000/api'
const EditJenis = (jenis: jenis) => {
  const [modal, setModal] = useState(false);
  const [nama_jenis, setNama_jenis] = useState(jenis.nama_jenis);
  const [kategori_id, setKategori_id] = useState(Number(jenis.kategori_id));
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/jenis/${jenis.id}`;
    console.log(endpoint)
    const data = {
      nama_jenis: nama_jenis,
      kategori_id: kategori_id,
    };
    let res = await axios.patch(endpoint, data);
    setNama_jenis('')
    setKategori_id(Number)
    setIsMutating(false);
    router.refresh()
    setModal(false)

    console.log(res)
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
          <h3 className="font-bold text-lg">Edit Jenis</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nama Jenis</label>
              <input
                type="text"
                value={nama_jenis}
                onChange={(e) => setNama_jenis(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama_jenis"
              />
               <label className="label font-bold">kategori_id</label>
              <input
                type="text"
                value={kategori_id}
                onChange={(e) => setKategori_id(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="kategori_id"
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

export default EditJenis