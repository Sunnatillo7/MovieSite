import React, { useEffect, useState, useContext  } from 'react'
import axios from "axios"
import MoviCard from '../../components/MoviCard/MoviCard'
import { Context } from '../../Context/Context'

export default function Popular() {
     const {data,setData} = useContext(Context)
    const env = process.env.REACT_APP_API
    const [popularApi, setPopularApi] = useState({
        isFatched: false,
        data: []
    })



    useEffect(() => {
        axios.get(env + "/movie/popular", {
            params: {
                api_key: "0431834c535ecb8b718ac720e46307f3",
                page: 1
            }
        }).then((res) => {
            setPopularApi({
                isFatched: true,
                data: res.data.results,

            })
            setData(res.data.results)
        })

    }, [])
    window.localStorage.setItem("movieData", JSON.stringify(data))

    return (
        <div className='flex flex-wrap justify-between px-5 mt-5 '>
            {

                popularApi.isFatched && popularApi.data.map(item => {
                    return <MoviCard key={item.id} title={item.title} MoviImg={item.poster_path} body={item.overview} date={item.release_date} id={item.id} />
                })

            }

        </div>
    )
}
