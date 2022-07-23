import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Spinner from "./Spinner.jsx";

const WatchCustomer = () => {

    const [customer, setCustomer] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getCustomerAPI = async () => {
            try {
                const url = `http://localhost:4000/customers/${id}`
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
                <p> No results</p> :
                (
                    <div>
                        <h1 className="font-black text-4xl text-blue-900">Watching Customer: {customer.name}</h1>
                        <p className="mt-2">Customer Information
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
export default WatchCustomer