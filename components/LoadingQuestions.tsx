"use client"
import Image from 'next/image'
import React from 'react'
import { Progress } from './ui/progress'

type Props = {

    finished: boolean

}
const loadingTexts = [
    "Thinking of good questions...", 
    "Consulting the vast knowledge of the AI...",
    "Ensuring questions are clear and fair...",
    "Checking questions for accuracy...",
    "Finalizing the perfect quiz...",
    "Almost ready to test your knowledge!"
  ]

const LoadingQuestions = ({finished}: Props) => {
  const [progress, setProgress] = React.useState(0)
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0])
  React.useEffect(() => {

    const interval = setInterval(() => {
        
        const randomIndex = Math.floor(Math.random() * loadingTexts.length)
        setLoadingText(loadingTexts[randomIndex])
    
    }, 2000)
    return () => clearInterval(interval)

}, []) 
React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center'>
            <Image src={'/loading.gif'} width={600} height={600} alt='Loading animation'/>
            <Progress value={progress} className='w-full mt-4' />
            <h1 className='mt-2 text-xl'>{loadingText}</h1>
    </div>
  )
}

export default LoadingQuestions