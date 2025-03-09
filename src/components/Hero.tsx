import React from 'react'
import { Button } from './ui/button'
import { FaMicrophone } from "react-icons/fa";

export default function Hero() {
  return (
    <div className='min-h-screen w-full justify-center items-center flex flex-col'>
        <h1 className='text-6xl md:text-7xl font-bold tracking-tighter text-center'>ShitPoster</h1>
        <p className='text-lg tracking-tighter max-w-2xl mt-1'>Speak your mind and shitpost on twitter</p>

        <Button className='mt-6 flex gap-1 justify-center items-center'>Start speaking
        </Button>
    </div>
  )
}
