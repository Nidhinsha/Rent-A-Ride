
import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { userGetBikeAction } from '../../../Redux/Actions/userActions'
import { userGetBikeAPI } from '../../../Api/User/ApiCalls'

function Test() {
  const dispatch = useDispatch()
  const bikes = useSelector((state) => state.userGetBikeReducer)
  const { bikesDataLoading, bikesData, bikesDataError } = bikes

  useEffect(() => {
      dispatch(userGetBikeAction())
  }, [])

  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  useEffect(()=>{
    userGetBikeAPI(page).then((data)=>{
      console.log(data.data,'data coming into pageinationo frnt');
    })
    .catch((error)=>{
      console.log(error,'error in pagination frnt');
    })
  },[page])

  const handlePrevPage = () => {
    setPage((p) => {
      if (p === 1) return p
      return p - 1
    })
  }

  const handleNextPage = () => {
    setPage((p) => {
      if (p === pageCount) return p
      return p + 1
    })
  }
  return (
    <>
      <NavBar />
      <div >
        {
          bikesData ? bikesData.map((data,index)=>{
            return(
              <div key={index}>
                <div >{data.bikeName}</div>
              </div>

            )
          })
          : "no biks availble"
        }
      </div>
      <footer>
        <button
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          prev
        </button>
        <button
          disabled={page === pageCount}
          onClick={handleNextPage}
        >
          next
        </button>

      </footer>
    </>

  )
}

export default Test
