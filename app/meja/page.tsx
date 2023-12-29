export const metadata = {
  title: "meja",
}
import axios from 'axios'
import Link from 'next/link'
import AddMeja from './add'
import DeleteMeja from './delete'
import EditMeja from './edit'

type meja = {
  id: number;
  nomor_meja: number;
  kapasitas: number;
  status: string;
}
const getMeja = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/meja");

  return res.data.data
}
const  MejaList = async () => {
  const meja: meja[] = await getMeja()
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddMeja />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No.</th>
            <th>Nomor_meja</th>
            <th>Kapasitas</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {meja.map((meja, index) => (
            <tr key={meja.id}>
              <td>{index + 1}</td>
              <td>{meja.nomor_meja}</td>
              <td>{meja.kapasitas}</td>
              <td>{meja.status}</td>
              <td className="flex">
                <div className="mr-1">
                  <EditMeja {...meja} />
                </div>

                <DeleteMeja {...meja} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MejaList;
