import React from 'react'
import {  NavLink } from 'react-router-dom'

export default function MoviCard({MoviImg, title, body, date, id}) {
  return (
    <NavLink
      id={id}
      to={`/single-pages/${id}`}
      
    className='w-[300px] p-2 rounded-md bg-blue-400 text-white mb-5 cursor-pointer'>
      <img src={ "https://image.tmdb.org/t/p/w500/" + MoviImg} alt="CardImg" width={"100%"} height={70} />
      <h2>{title}</h2>
      <p className='whitespace-nowrap overflow-hidden text-ellipsis'>{body}</p>
      <p>{date}</p>
      <button className='bg-green-400 text-white p-2 rounded hover:opacity-50 w-full'>More</button>
    </NavLink>
  )
}
