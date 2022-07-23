import FormAddCustomer from "../Components/FormAddCustomer"

const NewCustomer = () => {
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">New Customer</h1>
            <p className="mt-2">
                Fill the fields to register a new customer
            </p>
            <FormAddCustomer />
        </>
    )
}

export default NewCustomer