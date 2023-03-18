import React from 'react'
import {useParams, useNavigate} from "react-router-dom"
import Arrow from "../../Assets/Images/arrow.svg"

export default function PersonSinglePage() {
  const navigate = useNavigate()
    const {id} = useParams()
    const actorSingleData = JSON.parse(window.localStorage.getItem("actor-data")).find(item=> item.id === id -0 )
    console.log(actorSingleData)
    const goBack =()=>{
      navigate(-1)
    }
  return (
    <div >
            <img onClick={goBack} className='absolute cursor-pointer left-4' src={Arrow} alt="arrow" width={30} height={30} />

    {
    <img className='mx-auto' src={ "https://image.tmdb.org/t/p/w500/" + actorSingleData.profile_path} alt="img" />
    }
    </div>
  )
}
