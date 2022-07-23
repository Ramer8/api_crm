import { useEffect, useState } from 'react'
import FormAddCustomer from '../Components/FormAddCustomer'
import { useParams } from 'react-router-dom'

const EditCustomer = () => {

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
            }, 500);
        }
        getCustomerAPI()
    }, [])
    return (
        <>
            {customer?.name && (
                <><h1 className="font-black text-4xl text-blue-900">Edit Customer</h1>
                    <p className="mt-2">Use this form to edit a saved customer</p></>)}
            {customer?.name ? (
                <FormAddCustomer
                    customer={customer}
                    loading={loading} />
            ) : <h1 className="font-black text-4xl text-red-700 ">Customer id invalid</h1>}
        </>
    )
}
export default EditCustomer