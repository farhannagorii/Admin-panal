import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { apiBaseUrl } from '../../Config';

export default function ViewCategory() {

  let [activeFilter, setactiveFilter] = useState(true);
  let [categorylist, setCategoryList] = useState([]);
  let [staticpath, setStaticpath] = useState("");
  let [alldelitem, setalldelitems] = useState([]);

  let getsubCategory = () => {
    axios.get(`${apiBaseUrl}/subcategory/view`)
      .then(res => res.data)
      .then(finalres => {
        setCategoryList(finalres.subcatdata);
        setStaticpath(finalres.staticPath);
      })
  };

  useEffect(() => {
    getsubCategory();
  }, []);

  let getcheckvalues = (e) => {
    if (e.target.checked) {
      if (!alldelitem.includes(e.target.value)) {
        setalldelitems([...alldelitem, e.target.value]);
      }
    } else {
      let filterData = alldelitem.filter((v) => v !== e.target.value);
      setalldelitems(filterData);
    }
  };

  let deletedata = async () => {
    if (alldelitem.length === 0) {
      alert("Select at least one");
      return;
    }

    let obj = { ids: alldelitem };

    axios.post(`${apiBaseUrl}/subcategory/delete`, obj)
      .then((res) => {
        if (res.data.status === 1) {
          setalldelitems([]);
          getsubCategory();
        } else {
          alert("Deletion failed. Try again.");
        }
      });
  };

  let changeStatus = (id, status) => {
    axios.put(`${apiBaseUrl}/subcategory/update/${id}`, {
      status: status
    })
      .then((res) => {
        if (res.data.status === 1) {
          getsubCategory();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="w-full pl-14">
      <Breadcrumb path={"Sub Category"} link={'/category/sub-category/view'} path2={"View"} slash={"/"} />

      {/* Filter Box */}
      <div className={`rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>
        <form className="grid grid-cols-[40%_35%_5%] gap-[1%] items-center">
          <div>
            <select
              name="parentCatSelectBox"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3"
            >
              <option value="">Select Parent Category</option>
              <option value="Mens">Men's</option>
              <option value="Women">Women</option>
              <option value="Sale">Sale</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3"
              placeholder="Search name..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="w-full min-h-[610px]">
        <div className="max-w-[980px] mx-auto py-5">
          <div className="flex justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            <h3 className="text-[26px] font-semibold">View Sub Category</h3>

            <div className="flex">

              <div
                onClick={() => setactiveFilter(!activeFilter)}
                className="cursor-pointer mx-3 rounded-full w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800"
              >
                {activeFilter ? <FaFilter /> : <MdFilterAltOff />}
              </div>

              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 px-5 py-2.5 rounded-lg text-sm mr-2"
              >
                Change Status
              </button>

              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 rounded-lg text-sm"
                onClick={deletedata}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="border border-t-0 rounded-b-md border-slate-400">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

              {/* TABLE FIXED WIDTH ENABLED */}
              <table className="w-full table-fixed text-sm text-left text-gray-500">

                <thead className="text-xs text-gray-700 uppercase bg-gray-2000">
                  <tr>
                    <th className="w-[4%] p-4">Select</th>
                    <th className="w-[20%] px-6 py-3">Parent Category</th>
                    <th className="w-[20%] px-3 py-3">Sub Category</th>
                    <th className="w-[12%] py-3">Image</th>
                    <th className="w-[10%] py-3">Order</th>
                    <th className="w-[10%] py-3">Status</th>
                    <th className="w-[8%] py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {categorylist.length > 0 ? (
                    categorylist.map((items, index) => (
                      <tr className="bg-gray border-b hover:bg-gray-200" key={index}>

                        <td className="w-[4%] p-4">
                          <input
                            onChange={getcheckvalues}
                            value={items._id}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600"
                          />
                        </td>

                        <td className="w-[20%] px-6 py-4 text-black">
                          {items.parentcategory.categoryName}
                        </td>

                        <td className="w-[20%] py-4">
                          {items.subcategoryname}
                        </td>

                        <td className="w-[12%] py-4">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={staticpath + items.subcategoryImage}
                            alt=""
                          />
                        </td>

                        <td className="w-[10%] py-4">
                          {items.order}
                        </td>

                        <td className="w-[10%] py-4">
                          {items.subcategorystatus ? (
                            <button
                              onClick={() => changeStatus(items._id, false)}
                              className="text-white bg-green-500 px-4 py-1 rounded-lg"
                            >
                              Active
                            </button>
                          ) : (
                            <button
                              onClick={() => changeStatus(items._id, true)}
                              className="text-white bg-red-500 px-4 py-1 rounded-lg"
                            >
                              DeActive
                            </button>
                          )}
                        </td>

                        <td className="w-[8%] py-4">
                          <Link to={`/category/update/${items._id}`}>
                            <div className="rounded-full w-[40px] h-[40px] flex items-center justify-center bg-blue-700 text-white hover:bg-blue-800">
                              <MdModeEdit />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-6">No Data Found</td>
                    </tr>
                  )}
                </tbody>

              </table>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}