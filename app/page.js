"use client";

import createTriangle from "@components/createTriangle";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const canvas = useRef();
  let ctx = null;
  let inter;

  const [number, setNumber] = useState(1);
  const [animText, setAnimText] = useState("ON");
  const [animColor, setAnimColor] = useState("bg-green-500");

  const handleInput = (e) => {
    setNumber(e.target.value);
    clearInterval(inter);
  };

  const handleAnimButton = () => {
    if (animText === "ON") {
      setAnimText("OFF");
      setAnimColor("bg-red-500");
    } else {
      setAnimText("ON");
      setAnimColor("bg-green-500");
    }
    clearInterval(inter);
  };

  useEffect(() => {
    ctx = canvas.current.getContext("2d");
    ctx.translate(200, canvas.current.height / 1.2);
    ctx.scale(1, -1);
  }, []);

  useEffect(() => {
    const array = createTriangle(number, 1);
    let size = 600 / Math.pow(2, number);
    ctx = canvas.current.getContext("2d");
    const line = { color: "yellow", width: 10 / (number * 2) };
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.width;
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.beginPath();
    ctx.moveTo(0, 0);

    if (animText === "ON") {
      let count = 1;
      inter = setInterval(function () {
        ctx.lineTo(array[count][0] * size, array[count][1] * size);
        ctx.stroke();
        count++;
        if (count >= array.length) {
          clearInterval(inter);
        }
      }, 300 / Math.pow(number, number * number));
    } else {
      for (let i = 0; i < array.length; i++) {
        ctx.lineTo(array[i][0] * size, array[i][1] * size);
      }
      ctx.closePath();
    }
    ctx.stroke();
  }, [number, animText]);

  return (
    <div className=" bg-slate-500 h-fit w-screen">
      <div className="flex flex-col ml-[50px] mr-[50px] h-full items-center">
        <h className="font-semibold text-[60px] text-white">
          Sierpiński Triangle
        </h>
        <p className="text-center text-[yellow]">
          The Sierpinski triangle is a self-similar fractal. It consists of an
          equilateral triangle, with smaller equilateral triangles recursively
          removed from its remaining area, which is named after the Polish
          mathematician Wacław Sierpiński.
        </p>
        <div className="flex flex-col h-full w-full items-center mt-[20px]">
          <canvas
            ref={canvas}
            height="800"
            width="1000"
            className="bg-black p-[50px] rounded-[8px] mt-10"
          ></canvas>
          <input
            type="number"
            min="1"
            max="10"
            onChange={handleInput}
            value={number}
            className="outline-none p-1 rounded-[8px] mt-[-100px] mb-[10px] text-black"
          />
          <div className="flex h-fit w-fit mb-[90px] items-center">
            <text>Animation:</text>
            <button
              onClick={handleAnimButton}
              className={`ml-2 p-1 rounded-[8px] ${animColor}`}
            >
              {animText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
