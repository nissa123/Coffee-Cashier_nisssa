"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const API_URL = 'http://127.0.0.1:8000/api'
const AddMenu = () => {
  const [modal, setModal] = useState(false)
  const [nama_menu, setNamaMenu] = useState("")
  const [harga, setHarga] = useState("")
  const [image, setimage] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [jenis_id, setJenisId] = useState("")
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () => setModal(!modal)
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsMutating(true)
    let endpoint = `${API_URL}/menu`
    const data = {
       nama_menu :nama_menu,
       harga: harga,
       image:image,
       deskripsi:deskripsi,
       jenis_id:jenis_id
      }
    await axios.post(endpoint, data);
    setNamaMenu('')
    setHarga('')
    setimage('')
    setDeskripsi('')
    setJenisId('')
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
          <h3 className="font-bold text-lg">Add New </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama_menu</label>
              <input
                type="text"
                value={nama_menu}
                onChange={(e) => setNamaMenu(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama_menu"
              />
              <label className="label font-bold">harga</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Harga"
              /><label className="label font-bold">image</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setimage(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Image"
              /><label className="label font-bold">deskripsi</label>
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Deskripsi"
              /><label className="label font-bold">jenis_id</label>
              <input
                type="text"
                value={jenis_id}
                onChange={(e) => setJenisId(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Jenis_id"
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

export default AddMenu