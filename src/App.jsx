import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout/layout'
import Start from './pages/Start'
import NewCustomer from './pages/NewCustomer'
import EditCustomer from './pages/EditCustomer'
import ViewCustomer from './Components/ViewCustomer'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customers" element={<Layout />}>
          <Route index element={<Start />} />
          <Route path="new" element={<NewCustomer />} />
          <Route path="edit/:id" element={<EditCustomer />} />
          <Route path=":id" element={<ViewCustomer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
