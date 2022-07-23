import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alert from './Alert'
import Spinner from './Spinner'

const FormAddCustomer = ({ customer, loading }) => {

    const navigate = useNavigate()
    const newCustomerSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'the name is too short')
            .max(40, 'the name is too long')
            .required("Customer name is required"),
        company: Yup.string()
            .required("Company name is required"),
        email: Yup.string()
            .email()
            .required("Email is required"),
        phone: Yup.number().typeError('Phone must be a number')
            .integer('Invalid Number')
            .positive('Invalid Number'),
        notes: '',
    })
    const handleSubmit = async (values) => {
        try {
            let response
            if (customer.id) {
                const url = `http://localhost:4000/customers/${customer.id}`
                response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            else {
                const url = 'http://localhost:4000/customers'
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await response.json()
            navigate('/customers')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        loading ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-1 rounded-md shadow-md
        md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text text-xl uppercase text-center'>
                    {customer?.name ? 'Edit Customer' : 'Add Customer'}
                </h1>
                <Formik initialValues={{
                    name: customer?.name ?? '',
                    company: customer?.company ?? '',
                    email: customer?.email ?? '',
                    phone: customer?.phone ?? '',
                    notes: customer?.notes ?? '',
                }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)
                        resetForm()
                    }}
                    validationSchema={newCustomerSchema}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form
                                className='mt-5'
                            >
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='name'
                                    >Name:</label>
                                    <Field
                                        id='name'
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder='Customer Name'
                                        name='name'
                                    />
                                    {errors.name && touched.name ? (
                                        <Alert>{errors.name}</Alert>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='company'
                                    >Company:</label>
                                    <Field
                                        id='company'
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder='Customer Company'
                                        name='company'
                                    />
                                    {errors.company && touched.company ? (
                                        <Alert>{errors.company}</Alert>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='email'
                                    >Email:</label>
                                    <Field
                                        id='email'
                                        type="email"
                                        className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                                        placeholder='Customer Email'
                                        name='email'
                                    />
                                    {errors.email && touched.email ? (
                                        <Alert>{errors.email}</Alert>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='phone'
                                    >Phone:</label>
                                    <Field
                                        id='Phone'
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                                        placeholder='Customer Phone'
                                        name="phone"
                                    />
                                    {errors.phone && touched.phone ? (
                                        <Alert>{errors.phone}</Alert>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='notes'
                                    >Notes:</label>
                                    <Field
                                        as='textarea'
                                        id='notes'
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50 h-20 rounded-md"
                                        placeholder='Customer Notes'
                                        name='notes'
                                    />
                                </div>
                                <input type="submit"
                                    value={customer?.name ? 'Edit Customer' : 'Add Customer'}
                                    className='mt-5 w-full bg-blue-800 p-3 text-white rounded-md uppercase font-bold text-lg' />
                            </Form>
                        )
                    }}
                </Formik>
            </div >
        ))
}
FormAddCustomer.defaultProps = {
    customer: {},
    loading: false
}
export default FormAddCustomer