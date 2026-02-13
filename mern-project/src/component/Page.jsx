import React, { useEffect } from 'react'
import Table from './Table';
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const Page = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        _id: "",
    });

    const [enquiryList, setEnquiryList] = useState([]);

    const saveEnquiry = (e) => {
        e.preventDefault();
        // const formData = {
        //     name: e.target.name.value,
        //     email: e.target.email.value,
        //     phone: e.target.phone.value,
        //     message: e.target.message.value,
        // }
        if (formData._id) {
            //Update logic if id persent
            axios.put(`http://localhost:8000/api/enquiryupdate/${formData._id}`, formData)
                .then((res) => {
                    console.log(res.data)
                toast.success("Enquiry updated successfuly")
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    _id: "",
                })
                getAllEnquiry()
            })
        } else {
            //Insert Logic if id not persent then
            axios.post("http://localhost:8000/api/enquiryinsert", formData)
                .then((res) => {
                    console.log(res.data)
                    toast.success("Enquiry saved successfuly");
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        message: ""
                    })
                    getAllEnquiry()
                })
        }
    }

    const getAllEnquiry = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/enquirydata");
            setEnquiryList(res.data.enquiryData || []);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllEnquiry()
    }, [])

    const getFormData = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        const oldData = { ...formData }
        oldData[inputName] = inputValue
        setFormData(oldData)
    }

    return (
        <div>
            <ToastContainer/>
            <h1 className='text-[40px] text-center text-amber-700 py-6 font-bold'>
                User Enquiry
            </h1>
            <div className='grid grid-cols-[30%_auto] gap-9'>
                <div className='bg-gray-200 p-4 rounded-2xl'>
                    <h2 className='text-[20px] font-bold text-center text-blue-700'>Enquiry Form</h2>
                    <form onSubmit={saveEnquiry}>
                        <div className='flex flex-col gap-3 mt-4'>
                            <label htmlFor="name" value="name" className='font-semibold'>Your Name</label>
                            <input onChange={getFormData} value={formData.name} className='bg-white outline-none focus:outline-none rounded px-1 py-2' type="text" name='name' placeholder="enter name" required />
                        </div>
                        <div className='flex flex-col gap-3 mt-4'>
                            <label htmlFor="email" value="email" className='font-semibold'>Your Email</label>
                            <input onChange={getFormData} value={formData.email} className='bg-white outline-none focus:outline-none rounded px-1 py-2' type="email" name='email' placeholder="enter email" required />
                        </div>
                        <div className='flex flex-col gap-3 mt-4'>
                            <label htmlFor="phone" value="phone" className='font-semibold'>Your Phone</label>
                            <input onChange={getFormData} value={formData.phone} className='bg-white outline-none focus:outline-none rounded px-1 py-2' type="text" name='phone' placeholder="enter phone" required />
                        </div>
                        <div className='flex flex-col gap-3 mt-4'>
                            <label htmlFor="message" value="message" className='font-semibold'>Your Message</label>
                            <textarea onChange={getFormData} value={formData.message} className='bg-white outline-none focus:outline-none rounded px-1 py-2' type="text" name='message' placeholder="enter message" required />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button className='bg-green-300 px-2 py-1 border w-full border-green-900 rounded-2xl cursor-pointer active:scale-95 hover:bg-green-600'>
                                {
                                    formData._id ? 'Update' : 'Save'
                                }
                            </button>
                        </div>
                    </form>
                </div>
                <Table data={enquiryList} getAllEnquiry={getAllEnquiry} Swal={ Swal } setFormData={setFormData} />
            </div>
        </div>
    )
}

export default Page