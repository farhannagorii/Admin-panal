import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { apiBaseUrl } from '../../Config';
// import { MdModeEditOutline } from "react-icons/md";

export default function ViewCategory() {
  // let [orderModal, setOrderModal] = useState(false);

  let [activeFilter, setactiveFilter] = useState(true);
  let [activeDropDown, setactiveDropDown] = useState(false);
  let [categorylist, setCategoryList] = useState([])
  let [staticpath, setStaticpath] = useState([])
  let [alldelitem, setalldelitems] = useState([])

  let getsubCategory = () => {
    axios.get(`${apiBaseUrl}/subcategory/view`)
      .then((res) => res.data)
      .then((finalres) => {
        setCategoryList(finalres.subcatdata) //[3 Items]
        //setStaticpath(finalres.staticPath) //http://localhost:8120/uploads/category/
      })
  }

  useEffect(() => {
    getsubCategory()
  }, [])

  let getcheckvalues = (e) => {
    if (e.target.checked) {
      console.log(e.target.value)
      if (!alldelitem.includes(e.target.value)) {
        setalldelitems([...alldelitem, e.target.value])
        console.log(alldelitem)
      }
    }

    else {
      // delAllids=[1,2,3,4,5]
      let filterData = alldelitem.filter((v) => v != e.target.value) //[1,2,3,5]
      setalldelitems(filterData)
      console.log(alldelitem)
    }
  }

  let deletedata = async (req, res) => {
    if (alldelitem.length === 0) {
      alert("select at least one")
      return;
    }
    let obj = { ids: alldelitem }

    axios.post(`${apiBaseUrl}/subcategory/delete`, obj)
      .then((res) => {
        if (res.data.status === 1) {
          setalldelitems([])
          getsubCategory()
        }
        else {
          alert("Deletion failed. Try again.");
        }

      })

  }
  useEffect(() => {
    console.log(alldelitem)
  }, [alldelitem])


  let changeStatus = (id, status) => {
    axios.put(`${apiBaseUrl}/subcategory/update/${id}`, {
      status: status
    })
      .then((res) => {
        console.log("Updated:", res.data);

        if (res.data.status === 1) {
          getsubCategory();   // IMPORTANT: refresh UI
        }
      })
      .catch(err => console.log(err));
  }


  return (
    <section className="w-full pl-14 ">

      <Breadcrumb path={"Sub Category"} link={'/category/sub-category/view'} path2={"View"} slash={"/"} />

      <div className={`rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>

        <form className="grid grid-cols-[40%_35%_5%] gap-[1%] items-center ">
          <div className="">

            <select
              name="parentCatSelectBox"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
            >
              <option value="">Select Parent Category</option>
              <option value="Mens">Men's</option>
              <option value="Women">Women</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
          <div className="">
            <input
              type="text"
              id="simple-search"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
              placeholder="Search  name..."
              required
            />
          </div>
          <div className=''>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>



        </form>


      </div>
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
            <h3 className="text-[26px] font-semibold" >
              View Sub Category
            </h3>
            <div className='flex justify-between '>
              <div onClick={() => setactiveFilter(!activeFilter)} className="cursor-pointer text-[white] mx-3 rounded-[50%] w-[40px] h-[40px]  mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center  text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {activeFilter ? <FaFilter className='text-[18px]' /> : <MdFilterAltOff className='text-[18px]' />}
              </div>

              <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Change Status</button>
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={deletedata}>Delete </button>
            </div>
          </div>
          <div className="border border-t-0 rounded-b-md border-slate-400">

            {/* border-2 border-[red] */}
            <div className="relative overflow-x-auto">


              <div class="relative overflow-x-auto  shadow-md sm:rounded-lg">

                <table class="w-full ml-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Parent Category Name
                      </th>
                      <th scope="col" class="px-0 py-3">
                        Sub Category Name
                      </th>

                      <th scope="col" class=" w-[12%] ">
                        Image
                      </th>
                      <th scope="col" class=" w-[10%] ">
                        Order
                      </th>
                      <th scope="col" class="w-[10%]  ">
                        Status
                      </th>
                      <th scope="col" class="w-[6%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorylist.length >= 1 ?
                      categorylist.map((items, index) => {
                        return (
                          <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                              <div class="flex items-center"

                              >
                                <input onChange={getcheckvalues} value={items._id} id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                              </div>
                            </td>
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                              <div class="py-4">
                                <div class="text-base font-semibold">
                                  {items.parentcatgoryname}
                                  {items.subcategoryname}
                                </div>

                              </div>
                            </th>
                            <td class=" py-4">
                              <img class="w-10 h-10 rounded-full" alt="Jese image" src={staticpath + items.subcategoryImage} />
                            </td>
                            <td class=" py-4">
                              {items.subcategoryorder}
                            </td>
                            <td class=" py-4">

                              {items.subcategorystatus ?
                                <button onClick={() => changeStatus(items._id, false)} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Active</button>
                                :
                                <button onClick={() => changeStatus(items._id, true)} type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">DeActive</button>
                              }
                            </td>
                            <td class=" py-4">

                              <Link to={`/category/update/${items._id}`} >
                                <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                  <MdModeEdit className='text-[18px]' />
                                </div>
                              </Link>
                            </td>

                          </tr>
                        )
                      })

                      :
                      <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4" colSpan={6}>
                          No Data Found
                        </td>
                      </tr>


                    }
                  </tbody>

                </table>
              </div>


            </div>

          </div>
        </div>
      </div>



    </section>
  )
}
