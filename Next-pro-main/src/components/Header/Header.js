import React, { useState, useRef, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import Logo from "../../Assets/Images/logo12.webp"
import axios from "axios"
import { Context } from "../../Context/Context"

export default function Header() {
  const navigate = useNavigate()
  const searchRef = useRef()
  const [searchData, setSearchData] = useState([])
  const [letSearchList, setLetSearchList] = useState(false)
  const { data, setData } = useContext(Context)
  const handleChange = (evt) => {

    if (evt.target.value === "") {
      setLetSearchList("")
    } else {
      setLetSearchList(true)
      const env = process.env.REACT_APP_API
      axios.get(env + `/search/movie?query=` + evt.target.value, {
        params: {
          api_key: "0431834c535ecb8b718ac720e46307f3"
        }
      })
        .then((res) => {
          // console.log(res)
          setSearchData(res.data.results)
         
        })

    }

  }

  const handleSearchListClick = (evt) => {
    setData(searchData)
    searchRef.current.value = evt.target.textContent
    setLetSearchList(false)
    navigate(`/single-pages/${evt.target.id}`)
  }


  window.localStorage.setItem("movieData", JSON.stringify(data))

  return (
    <div className='flex justify-between bg-slate-500 px-4 py-3 '>
      <img className='bg-transparent rounded' src={Logo} alt="Logo" height={70} width={60} />
      <div className='flex items-center space-x-5 mr-7'>
        <NavLink to={"/"} >
          Home
        </NavLink>
        <NavLink to={"/popular"} >
          Popular
        </NavLink>
        <NavLink to={"/top_rated"} >
          Top Rated
        </NavLink>
        <div className='relative'>
          <input
            ref={searchRef}
            onBlur={() => {
              setTimeout(() => {
                setLetSearchList(false)
              }, [150]);
            }}
            onChange={handleChange}
            className='border-2 border-slate-400 pl-2 py-1.5 rounded-md outline-none focus:border-blue-400' type="text" placeholder='Searching...' />

          {letSearchList &&
            <ul className='absolute bg-white w-[150%] h-[300px] overflow-auto right-0'>

              {searchData.length > 0 && searchData.map(item => (
                <li 
                 id={item.id}
                onClick={handleSearchListClick} key={item.id} className='py-2 pl-3 hover:bg-blue-400 hover:text-white cursor-pointer'>{item.title}</li>
              ))}
            </ul>
          }

        </div>
      </div>
    </div>
  )
}

