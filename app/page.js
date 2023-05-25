'use client'

import createTriangle from '@components/createTriangle';
import {useRef, useEffect, useState} from 'react'

export default function Home() {
  const canvas = useRef();
  let ctx = null;
  let size = 600;
  let inter;

  const [number, setNumber] = useState(1);

  const handleInput = (e) => {
    setNumber(e.target.value)
    clearInterval(inter)
  }

  useEffect(() =>{
    ctx = canvas.current.getContext("2d")
    ctx.translate(200, canvas.current.height / 1.2)
    ctx.scale(1, -1);
  }, [])

  useEffect(() => {
    const array = createTriangle(number, 1);
    let newSize = size / (Math.pow(2, number))
    ctx = canvas.current.getContext("2d")
    const line = {color: 'white', width: 10 / (number * 2)}
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.width;

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)

    
    ctx.beginPath();
    ctx.moveTo(0, 0);

    let count = 1
    inter = setInterval(function(){
      ctx.lineTo(array[count][0] * newSize, array[count][1] * newSize)
      ctx.stroke();
      count++;
      if (count >= array.length){
        clearInterval(inter);
      }
      console.log(count);
    }, 300 / Math.pow(number, number * number))
    // ctx.translate(0, -canvas.current.height / 2 )
    // ctx.scale(1, -1)


    ctx.stroke();

    // for (let i = 0; i < array.length; i++) {
    //   ctx.lineTo(array[i][0] * newSize, array[i][1] * newSize);
    // }
    // ctx.closePath();
    // ctx.stroke();
    // ctx.translate(0, canvas.current.height / 2)
    // ctx.scale(1, -1)

  }, [number])

  return (
    <div className="fixed bg-slate-500 h-screen w-screen">
      <div className="flex-col mt-[50px] ml-[50px] mr-[50px] h-full">
        <h className="font-semibold text-[60px] text-white">Sierpinski</h>
        <div className="flex flex-col h-full w-full items-center mt-[20px]">
          <input
            type="number"
            min="1"
            max="10"
            onChange={handleInput}
            value = {number}
            className="outline-none p-1"/>
          <canvas ref={canvas} height="800" width="1000" className="bg-black p-[50px] rounded-[8px] mt-10"></canvas>
        </div>
      </div>
    </div>
  )
}
