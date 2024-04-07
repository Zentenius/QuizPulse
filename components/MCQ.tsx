"use client"
import { Game, Question } from '@prisma/client'
import { ChevronRight, Loader2, Timer, X, BarChart } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'
import { Button, buttonVariants } from "./ui/button";
import { Card, CardDescription } from './ui/card'
import MCQCounter from './MCQCounter'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'
import Link from "next/link"
import { checkAnswerSchema } from '@/schemas/forms/quiz'
import { useToast } from './ui/use-toast'
import { cn, formatTimeDelta } from '@/lib/utils'
import {differenceInSeconds} from 'date-fns'

type Props = {
game: Game & {questions: Pick<Question, 'id' | 'options' | 'question'>[]}}


const MCQ = ({game}: Props) => {
 
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [selectedChoice, setSelectedChoice] = React.useState<number>(0)
    const [correctAnswers, setCorrectAnswers] = React.useState<number>(0)
    const [wrongAnswers, setWrongAnswers] = React.useState<number>(0)
    const [hasEnded, setHasEnded] = React.useState<boolean>(false)
    const {toast} = useToast(
      )
    const [now, setNow] = React.useState(new Date())
    
// Update time every second if quiz not ended
React.useEffect(() => {
  const interval = setInterval(() => {
    if (!hasEnded) {
      setNow(new Date());
    }
  }, 1000);

  return () => clearInterval(interval);
}, [hasEnded]);

// Get current question based on index
const currentQuestion = React.useMemo(() => {
  return game.questions[questionIndex]
}, [questionIndex, game.questions])

// Mutation to check answer via API
const {mutate: checkAnswer, isPending: isChecking} = useMutation({

  mutationFn: async () => {
    // Send question ID and selected choice
    const payload: z.infer<typeof checkAnswerSchema> = {    
      questionId: currentQuestion.id,
      userAnswer: options[selectedChoice]  
    }

    // Make API request
    const response = await axios.post('/api/checkAnswer', payload)
    return response.data
  }

})

// Handle next question click
const handleNext = useCallback(() => {
  if (isChecking) return
  
  // Call mutation
  checkAnswer(undefined, {

    onSuccess: ({isCorrect}) => {
      
      // Show toast based on if correct
      if (isCorrect) {
        toast({
          title: "Correct",
          variant: "success"
        })
        setCorrectAnswers(prev => prev + 1) 
      } else {
        toast({
          title: "Wrong",
          variant: "destructive"
        })
        setWrongAnswers(prev => prev + 1)
      }

      // Check if last question
      if (questionIndex === game.questions.length - 1) {        
        setHasEnded(true)
        return;
      }

      // Go to next question
      setQuestionIndex(prev => prev + 1)

    }

  })
}, [checkAnswer, toast, isChecking, questionIndex, game.questions.length])

// Get options for current question
const options = React.useMemo(() => {
  if (!currentQuestion) return []
  if (!currentQuestion.options) return []
  
  return JSON.parse(currentQuestion.options as string) as string[];
}, [currentQuestion])
  if (hasEnded) {
  
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
        You Completed in{" "}
        {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
      </div>
      <Link
        href={`/statistics/${game.id}`}
        className={cn(buttonVariants({ size: "lg" }), "mt-2")}
      >
        View Statistics
        <BarChart className="w-4 h-4 ml-2" />
      </Link>
    </div>
  );
      

  }
  return (
    <div className="absolute top-96 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between items-center">
        <Link
        href={`/dashboard`}
        className={cn(buttonVariants({ size: "icon", variant: "outline" }), " border-2 border-[#32856a] text-[#32856a] bg-[#dae9e5] dark:bg-[#162522] dark:text-[#9ad0be] ")}

        >
          <X className="h-6 w-6" />
        </Link>
        <h1 className="text-center md:text-2xl md:pl-24 md:w-full w-[100px]  ">{game.topic}</h1>

        <MCQCounter correctAnswers={correctAnswers} wrongAnswers={wrongAnswers}/>
      </div>
      <div className="flex self-start mt-3 text-slate-300">
          <Timer className="mr-2" />
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
      {/* Progress bar*/}
      <h1 className='text-center md:text-3xl mt-8'>{currentQuestion.question}</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {options.map((option, index) => {

            return (
                
                <Button key={index} className={`w-full p-8 rounded-[20px] ${selectedChoice === index ? "bg-[#32856a] text-white dark:bg-[#9ad0be]  dark:text-black" : "bg-[#cfebe2] dark:bg-[#25745a] text-black dark:text-white" }`}
                onClick={() => setSelectedChoice(index)} 
                >
                    <div className='flex-grow flex justify-between items-center'>
                    <span className=" font-semibold text-lg ">
              {option}
            </span>
            <ChevronRight className="text-white" />
                    </div>
                </Button>
                
                )
        
            })}
        
        
      </div>
      <div className='flex justify-center items-center mt-5 '><Button  onClick={() => handleNext()} className='mt-2 bg-[#32856a] dark:bg-[#9ad0be] '> {isChecking && <Loader2 className='w-4 h-4 mr-2 animate-spin'/>} Next <ChevronRight className='w-4 h-4 ml-2'/> </Button></div>
      
    </div>
  );
}

export default MCQ