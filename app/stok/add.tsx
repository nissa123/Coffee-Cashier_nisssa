"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const API_URL = 'http://127.0.0.1:8000/api'
const AddStok = () => {
  const [modal, setModal] = useState(false)
  const [menu_id, setMenu_id] = useState("")
  const [jumlah, setJumlah] = useState("")
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () => setModal(!modal)
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsMutating(true)
    let endpoint = `${API_URL}/stok`
    const data = {
       menu_id :menu_id,
       jumlah :jumlah
      }
    await axios.post(endpoint, data);
    setMenu_id('')
    setJumlah('')
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
              <label className="label font-bold">Menu_id</label>
              <input
                type="text"
                value={menu_id}
                onChange={(e) => setMenu_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Menu_id"
              />
              <label className="label font-bold">jumlah</label>
              <input
                type="text"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Jumlah"
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

export default AddStok