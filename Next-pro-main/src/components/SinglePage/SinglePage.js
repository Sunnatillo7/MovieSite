import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import Arrow from "../../Assets/Images/arrow.svg"

const SinglePage = () => {
  const [personData, setPersonData] = useState([])
  const [videoData, setVideoData]= useState([])
  const navigate = useNavigate()
  const { id } = useParams()
  const env = process.env.REACT_APP_API
  const singleMovieData = JSON.parse(window.localStorage.getItem("movieData")).find((item) => item.id === id - 0)
  const [actorData, setActorData] = useState(JSON.parse(window.localStorage.getItem("actor-data")) || [])

  useEffect(() => {
    axios.get(env + `/movie/${id}/credits`, {
      params: {
        api_key: "0431834c535ecb8b718ac720e46307f3"
      }
    })
      .then((res) => {
        setPersonData(res.data.cast)
        setActorData(res.data.cast)
      })


      axios.get(env + `/movie/${id}/videos`, {
        params: {
          api_key: "0431834c535ecb8b718ac720e46307f3"
        }
      })
        .then((res) => {
          // console.log(res.data)
          setVideoData(res.data.results.splice(0,4))
          
        })
  }, [])

  window.localStorage.setItem("actor-data", JSON.stringify(actorData))
 console.log(videoData)

 const goBack = ()=>{
  navigate(-1)
 }
  return (
    <div className='flex justify-between'>
      <img onClick={goBack} className='absolute cursor-pointer left-4 ' src={Arrow} alt="arrow" width={30} height={30} />
      <ul className='w-[30%]'>
        <h2 className='font-bold text-center text-[30px]'>Actors</h2>
        {personData.length > 0 && personData.splice(0,3).map(item => (
          <Link 
          to={`/single-pages/${id}/person/${item.id}`}
          key={item.id} className='text-center pb-4'>
            <img className='mx-auto pb-4' width={"80%"} src={"https://image.tmdb.org/t/p/w500/" + item.profile_path} />
            {/* <p className='mx-auto font-bold text-[20px]'>{item.original_name}</p> */}
          </Link>
        ))}
      </ul>
      <ul className='w-[40%] mt-11'>
        <img width={"100%"} src={"https://image.tmdb.org/t/p/w500/" + singleMovieData.poster_path} alt="img" />
      </ul>
      <ul className='w-[30%]'>
        <h2 className='font-bold text-center text-[30px]'>Videos</h2>
        { videoData.length > 0 && videoData.map(item =>(
          <iframe key={item.id}
          className='rounded-md mx-auto pb-4'
          width={"80%"}
          height="315"
          src={`https://www.youtube.com/embed/${item.key}`}
          title="YouTube video player"
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          ></iframe>
        ))}

      </ul>
    </div>
  )
}

export default SinglePage

