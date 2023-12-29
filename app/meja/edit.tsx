"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type Meja = {
  id: number;
  nomor_meja: number;
  kapasitas: number;
  status: string
};
const API_URL = 'http://127.0.0.1:8000/api'
const EditMeja = (meja: Meja) => {
  const [modal, setModal] = useState(false);
  const [nomor_meja, setNomor_meja] = useState(Number(meja.nomor_meja));
  const [kapasitas, setKapasitas] = useState(Number(meja.kapasitas));
  const [status, setStatus] = useState(meja.status);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/meja/${meja.id}`;
    console.log(endpoint)
    const data = {
      nomor_meja: nomor_meja,
      kapasitas: kapasitas,
      status: status
    };
    let res = await axios.patch(endpoint, data);
    setNomor_meja(Number)
    setKapasitas(Number)
    setStatus('')
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
          <h3 className="font-bold text-lg">Edit Meja</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nomor_meja</label>
              <input
                type="text"
                value={nomor_meja}
                onChange={(e) => setNomor_meja(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Nomor_meja"
              />
               <label className="label font-bold">Kapasitas</label>
              <input
                type="text"
                value={kapasitas}
                onChange={(e) => setKapasitas(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="kapasitas"
              />
               <label className="label font-bold">Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="input w-full input-bordered"
                placeholder="status"
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

export default EditMeja