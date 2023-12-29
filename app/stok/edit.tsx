"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type Stok = {
  id: number;
  menu_id: string;
  jumlah: number;};
const API_URL = 'http://127.0.0.1:8000/api'
const EditStok = (stok: Stok) => {
  const [modal, setModal] = useState(false);
  const [menu_id, setMenu_id] = useState(stok.menu_id);
  const [jumlah, setjumlah] = useState(Number(stok.jumlah));
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/stok/${stok.id}`;
    const data = {
      menu_id: menu_id,
      jumlah: jumlah,
    };
    await axios.patch(endpoint, data);
    setMenu_id('')
    setjumlah(Number)
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
          <h3 className="font-bold text-lg">Edit Stok</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Menu_id</label>
              <input
                type="text"
                value={menu_id}
                onChange={(e) => setMenu_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Menu_id"
              />
               <label className="label font-bold">Jumlah</label>
              <input
                type="text"
                value={jumlah}
                onChange={(e) => setjumlah(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="jumlah"
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

export default EditStok