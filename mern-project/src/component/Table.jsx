import React from 'react'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'


const Table = ({ data = [], getAllEnquiry, Swal, setFormData }) => {
    const deleteRow = (delid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/enquirydelete/${delid}`)
                    .then(() => {
                        toast.success("Enquiry Deleted successfuly");
                        getAllEnquiry();
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your data has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const editRow = (editid) => {
        axios.get(`http://localhost:8000/api/single-row/${editid}`)
            .then((res) => {
                const data = res.data;
                setFormData(data.enquiryRow)
        })
    }
    return (
        <div className='bg-gray-200 p-4 rounded-2xl'>
            {/* <ToastContainer/> */}
            <h2 className='text-[20px] font-bold text-center text-blue-700'>Enquiry List</h2>
            <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left border border-gray-300">
                    <thead className="bg-gray-300 text-gray-700 uppercase text-xs text-center">
                        <tr>
                            <th className="px-4 py-3 border">SR NO</th>
                            <th className="px-4 py-3 border">NAME</th>
                            <th className="px-4 py-3 border">EMAIL</th>
                            <th className="px-4 py-3 border">PHONE</th>
                            <th className="px-4 py-3 border">MESSAGE</th>
                            <th className="px-4 py-3 border text-center">DELETE</th>
                            <th className="px-4 py-3 border text-center">EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length >= 1 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index} className="bg-white hover:bg-gray-100 transition text-center">
                                            <td className="px-4 py-3 border">{ index+1 }.</td>
                                            <td className="px-4 py-3 border">{item.name}</td>
                                            <td className="px-4 py-3 border">{item.email}</td>
                                            <td className="px-4 py-3 border">{item.phone}</td>
                                            <td className="px-4 py-3 border">{item.message}</td>
                                            <td className="px-4 py-3 border text-center">
                                                <button onClick={()=> deleteRow(item._id)} className="text-red-600 hover:text-red-800 font-medium cursor-pointer">
                                                    Delete
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 border text-center">
                                                <button onClick={()=> editRow(item._id)} className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr>
                                    <td colSpan="7" className="px-4 py-3 border text-center">
                                        No Data Found
                                    </td>
                                </tr>
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table