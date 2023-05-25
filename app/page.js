'use client'

import createTriangle from '@components/createTriangle';
import {useRef, useEffect, useState} from 'react'

export default function Home() {
  const canvas = useRef();
  let ctx = null;
  let size = 600;
  let n = 2;

  const [number, setNumber] = useState(1);

  const handleInput = (e) => {
    setNumber(e.target.value)
  }

  useEffect(() => {
    const array = createTriangle(number, 1);
    let newSize = size / (Math.pow(2, number))
    ctx = canvas.current.getContext("2d")
    ctx.translate(canvas.current.width / 5, canvas.current.height / 1.2)
    ctx.scale(1, -1);

    const line = {color: 'white', width: 2}

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.width;
    for (let i = 0; i < array.length; i++) {
      ctx.lineTo(array[i][0] * newSize, array[i][1] * newSize);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.translate(-canvas.current.width / 5, canvas.current.height / 1.2 )
    ctx.scale(1, -1)

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
            value = {number}/>
          <canvas ref={canvas} height="800" width="1000" className="bg-black p-[50px] rounded-[8px] mt-10"></canvas>
        </div>
      </div>
    </div>
  )
}
