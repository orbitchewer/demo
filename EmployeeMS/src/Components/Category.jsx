import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';

const Category = () => {
  const [category, setCategory] = useState([])

  useEffect(()=>{
    // FIXED: Using backticks for template literal
    axios.get(`${import.meta.env.VITE_API_URL}/auth/category`)
    .then(result => {
      if(result.data.Status) {
          setCategory(result.data.Result);
      } else {
          alert(result.data.Error)
      }
  }).catch(err => console.log(err))
}, [])
  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to="/dashboard/add_category" className='btn btn-success' >Add Category</Link>
      <div className='mt-3'>
        <table className='table'> 
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {/* FIXED: Added conditional check to prevent .map() on unpopulated data,
               although initializing with [] usually prevents a full crash, 
               explicit check is safer for data that might be null on initial load.
            */}
            {category && category.length > 0 ? (
                category.map( c => (
                    <tr key={c.id}> {/* Added key for list rendering */}
                        <td>{c.name}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="1">No Categories Found or Loading...</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category