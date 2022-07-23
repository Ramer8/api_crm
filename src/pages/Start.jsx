import { useState, useEffect } from "react"
import Customer from "../Components/Customer"

const Start = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const getCustomerAPI = async () => {
            try {
                const url = import.meta.env.VITE_API_URL
                const response = await fetch(url)
                const result = await response.json()
                setCustomers(result)
            } catch (error) {
                console.log(error);
            }
        }
        getCustomerAPI()
    }, [])
    const handleDelete = async id => {
        const confirming = confirm('You whish delete this customer?')
        if (confirming) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const response = await fetch(url, {
                    method: 'DELETE',
                })
                await response.json()
                const arrayCustomers = customers.filter(customer => customer.id !== id)
                setCustomers(arrayCustomers)
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Customers</h1>
            <p className="mt-2">Manage your customers</p>
            <table className="w-full mt-5 table-auto shadow bg-white ">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2 ">Name</th>
                        <th className="p-2 ">Contact</th>
                        <th className="p-2 ">Company</th>
                        <th className="p-2 ">Accions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <Customer
                            key={customer.id}
                            customer={customer}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Start