import React from 'react'
import Link from 'next/link'
import { FaBars } from "react-icons/fa"

const MainHeader = () => {
  return (
    <div className="bg-white-200 flex justify-between items-center px-4 h-12 mb-4">
      <div>Brand</div>
      <div className="flex justify-center items-center gap-3">
        <FaBars className="cursor-pointer" />
      </div>
      {/* <ul>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/about">
          <li>About</li>
        </Link>
        <Link href="/category">
          <li>Category</li>
        </Link>
      </ul> */}
    </div>
  );
}

export default MainHeader