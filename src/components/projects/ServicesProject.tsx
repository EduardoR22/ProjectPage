"use client"

import { useState, useEffect } from "react"

export default function ServicesProject({services}: {services:string[]}){
  
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(25);
  
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize, false);
  }, [])

  useEffect(() => {
    setHeight(width<640? 25: (width<768? 40: (width<1280? 55: 70)));
  }, [width])

  return(
    <>
      {services.map((serv:string, index:number) => (
        <p className="absolute right-10 text-white font-semibold text-sm sm:text-base md:text-lg lg:text-2xl xl:text-4xl" 
          style={{top:`${(index * height)+ 50}px`}} key={index}>{serv}</p>
      ))}
    </>
  )
}