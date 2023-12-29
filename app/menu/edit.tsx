"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type Menu = {
  id: number;
  nama_menu: string;
  harga: number;
  image: string;
  deskripsi:string;
jenis_id:number};
const API_URL = 'http://127.0.0.1:8000/api'
const EditMenu = (menu: Menu) => {
  const [modal, setModal] = useState(false);
  const [nama_menu, setName] = useState(menu.nama_menu);
  const [harga, setHarga] = useState(Number(menu.harga));
  const [image, setImage] = useState(menu.image);
  const [deskripsi, setDeskripsi] = useState(menu.deskripsi);
  const [jenis_id, setjenis_id] = useState(Number(menu.jenis_id));
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/menu/${menu.id}`;
    console.log(endpoint)
    const data = {
      nama_menu: nama_menu,
      harga: harga,
      image: image,
      deskripsi: deskripsi,
      jenis_id: jenis_id
    };
    let res = await axios.patch(endpoint, data);
    setName('')
    setHarga(Number)
    setImage('')
    setDeskripsi('')
    setjenis_id(Number)
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
          <h3 className="font-bold text-lg">Edit Menu</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nama Menu</label>
              <input
                type="text"
                value={nama_menu}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama menu"
              />
               <label className="label font-bold">Harga</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setHarga(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="harga"
              />
               <label className="label font-bold">Image</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input w-full input-bordered"
                placeholder="image"
              />
               <label className="label font-bold">Deskripsi</label>
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Deskripsi"
              />
               <input
                type="text"
                value={jenis_id}
                onChange={(e) => setjenis_id(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="jenis_id"
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

export default EditMenu