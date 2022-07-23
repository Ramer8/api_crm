import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Spinner from "./Spinner.jsx";

const ViewCustomer = () => {

    const [customer, setCustomer] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getCustomerAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const response = await fetch(url)
                const result = await response.json()
                setCustomer(result);
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => {
                setLoading(!loading)
            }, 1000);
        }
        getCustomerAPI()
    }, [])
    return (
        loading ? <Spinner /> :
            Object.keys(customer).length === 0 ?
                <p className="text-gray-800 uppercase text-xl font-bold">No results</p> :
                (
                    <div>
                        <h1 className="font-black text-4xl text-blue-900">Loaded Customer</h1>
                        <p className="mt-2 text-xl font-bold ">Customer Info
                        </p>
                        <p className="text-3xl mt-10 text-gray-600">
                            <span className="text-gray-800 uppercase font-bold">
                                Customer: </span>{customer.name}
                        </p>
                        <p className="text-2xl mt-4 text-gray-600">
                            <span className="text-gray-800 uppercase font-bold">
                                Email: </span>{customer.email}
                        </p>
                        {customer.phone && (
                            <p className="text-2xl mt-4 text-gray-600">
                                <span className="text-gray-800 uppercase font-bold">
                                    Phone: </span>{customer.phone}
                            </p>)}
                        <p className="text-2xl mt-4 text-gray-600">
                            <span className="text-gray-800 uppercase font-bold">
                                Company: </span>{customer.company}
                        </p>
                        {customer.notes && (
                            <p className="text-2xl mt-4 text-gray-600">
                                <span className="text-gray-800 uppercase font-bold">
                                    Notes: </span>{customer.notes}
                            </p>
                        )}
                    </div>
                )
    )
}
export default ViewCustomer