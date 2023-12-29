"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const API_URL = 'http://127.0.0.1:8000/api'
const AddJenis= () => {
  const [modal, setModal] = useState(false)
  const [nama_jenis, setNama_jenis] = useState("")
  const [kategori_id, setKategori_id] = useState(Number)
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () => setModal(!modal)
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsMutating(true)
    let endpoint = `${API_URL}/jenis`
    const data = { 
      nama_jenis: nama_jenis,
      kategori_id: kategori_id,
    }
    await axios.post(endpoint, data);
    setNama_jenis("")
    setKategori_id(Number)
    setIsMutating(false);
    router.refresh()
    setModal(false)
  }
  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add New
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New jenis</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama_jenis</label>
              <input
                type="text"
                value={nama_jenis}
                onChange={(e) => setNama_jenis(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama_jenis"
              />
              <label className="label font-bold">Kategori_id</label>
              <input
                type="text"
                value={kategori_id}
                onChange={(e) => setKategori_id(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Kategori_id"
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
}

export default AddJenis