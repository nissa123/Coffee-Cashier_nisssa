export const metadata = {
  title: "stok",
}
import axios from 'axios'
import Link from 'next/link'
import AddStok from './add'
import Deletestok from './delete'
import Editstok from './edit'

type stok = {
  menu_id: string;
  jumlah: number;

}
const getstok = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/stok");

  return res.data.data
}
const  stokList = async () => {
  const stok: stok[] = await getstok()
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddStok />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No.</th>
            <th>Menu_id</th>
            <th>Jumlah</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stok.map((stok, index) => (
            <tr key={stok.id}>
              <td>{index + 1}</td>
              <td>{stok.menu_id}</td>
              <td>{stok.jumlah}</td>
              <td className="flex">
                <div className="mr-1">
                  <Editstok {...stok} />
                </div>

                <Deletestok {...stok} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default stokList;
