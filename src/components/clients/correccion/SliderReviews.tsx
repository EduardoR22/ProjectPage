"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
//import Link from "next/link";

export default function SliderReviews({reviews}: {reviews:any}){
  const [showReviews, setShowReviews] = useState<any[]>(reviews);
  const [index, setIndex] = useState(0);
  
  const [width, setWidth] = useState<number>(0);
  const [numberReviews, setNumberReviews] = useState<number>(width<640? 1: (width<768? 2: (width<1024? 3: 4)));
  
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, false);
  }, [])

  useEffect(() => {
    setNumberReviews(width<640? 1: (width<768? 2: (width<1280? 3: 4)));
  }, [width])

  useEffect(() => {
    const timer = setTimeout(() => {
      if(index >= reviews.length - 1){
        setIndex(0);
      }else{
        setIndex(index + 1);
      }
    }, 5000);

    let count = reviews.length - (index + numberReviews);
    
    if(count < 0){
      count = Math.abs(count);
      const arr1 = reviews.slice(index, index + numberReviews);
      const arr2 = reviews.slice(0, count);
      setShowReviews([...arr1, ...arr2]);
    }else{
      setShowReviews(reviews.slice(index, index + numberReviews));
    }

    return () => clearTimeout(timer);
  }, [index])

  const Previous = () => {
    if(index > 0){
      setIndex(index -1);
    }else{
      setIndex(reviews.length -1);
    }
  }

  const Next = () => {
    if(index < reviews.length - 1){
      setIndex(index+1)
    }else{
      setIndex(0);
    }
  }

  return(
    <>
      <h1 className="text-yellow-950 text-4xl mt-5 my-3 font-semibold">Testimonios clientes</h1>
      <div className="flex items-center">
        <div className='w-20'>
          <ChevronLeftIcon onClick={Previous}
            className="w-12 h-12 cursor-pointer text-yellow-950" />
        </div>

        <div className='w-full grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10'>
          {showReviews.map((review: any) => (
            <div className='flex flex-col items-center' key={review._id}>
              <img src={review.photo} alt="logo" className="w-1/3 rounded-md" />
              <p className="text-slate-700 text-sm">{review.name}</p>
              <p className="text-slate-800">{review.review}</p>
            </div>
          ))}
        </div>

        <div className='w-20'>
          <ChevronRightIcon onClick={Next}
            className="w-12 h-12 cursor-pointer text-yellow-950" />
        </div>
      </div>
    </>
  )  
}
