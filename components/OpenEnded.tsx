"use client"
import React from 'react'
import { Game, Question } from '@prisma/client'
import { ChevronRight, Loader2, Timer, X, BarChart } from 'lucide-react'
import { cn, formatTimeDelta } from '@/lib/utils'
import {differenceInSeconds} from 'date-fns'
import { Button, buttonVariants } from "./ui/button";
import { useToast } from './ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { checkAnswerSchema } from '@/schemas/forms/quiz'
import axios from 'axios'
import BlankAnswerInput from './BlankAnswerInput'
import Link from 'next/link'
type Props = {
    game: Game & {questions: Pick<Question, 'question' | 'answer' | 'id'>[]


}


}

const OpenEnded = ({game}: Props) => {
    const [questionIndex, setQuestionIndex] = React.useState(0);
    
    const {toast} = useToast(
      )
    const [hasEnded, setHasEnded] = React.useState<boolean>(false)
    const [blankAnswer, setBlankAnswer] = React.useState("");
    const [now, setNow] = React.useState(new Date())
    React.useEffect(() => {
      const interval = setInterval(() => {
        if (!hasEnded) {
          setNow(new Date());
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [hasEnded]);
    const currentQuestion = React.useMemo(() => {
        return game.questions[questionIndex]
    }, [questionIndex, game.questions])
    const {mutate: checkAnswer, isPending: isChecking} = useMutation({
    
        mutationFn: async () => {
            let filledAnswer = blankAnswer
            document.querySelectorAll('user-blank-input').forEach(input => {filledAnswer = filledAnswer.replace("_____", input.value)
            input.value = ""
        })
          const payload: z.infer<typeof checkAnswerSchema> = {
          
            questionId: currentQuestion.id,
            userAnswer: filledAnswer
          
          }
          const response = await axios.post('/api/checkAnswer', payload)
          return response.data
        }
    
    })
    const handleNext = React.useCallback(() =>{
        if (isChecking) return
      checkAnswer(undefined, {
        
        onSuccess: ({ percentageSimilar }) => {
            toast({
                title: `Your answer is ${percentageSimilar}% similar to the correct answer `,
                description: `The correct answer was: ${currentQuestion.answer}`,

            })
          
          if (questionIndex === game.questions.length - 1) {
          
            setHasEnded(true)
            return;
          }
          setQuestionIndex((prev) => prev + 1)
    
        }
    
      })
      }, [checkAnswer, toast, isChecking, questionIndex, game.questions.length,])
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
      );}
      return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
    <div className="flex flex-row justify-between items-center">
      <Button
        variant="outline"
        size="icon"
        className=" border-2 border-[#32856a] text-[#32856a] "
      >
        <X className="h-6 w-6" />
      </Button>
      <h1 className="text-center text-2xl pl-24  ">{game.topic}</h1>

    </div>
    <div className="flex self-start mt-3 text-slate-300">
        <Timer className="mr-2" />
        {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
      </div>
    {/* Progress bar*/}
    <h1 className='text-center text-3xl mt-8'>{currentQuestion.question}</h1>
    <div className=" mt-4">
      
      <BlankAnswerInput answer={currentQuestion.answer} setBlankAnswer={setBlankAnswer} />
      
    </div>
    <div className='flex justify-center items-center mt-5'><Button  onClick={() => handleNext()} className='mt-2 bg-[#32856a]'> {isChecking && <Loader2 className='w-4 h-4 mr-2 animate-spin'/>} Next <ChevronRight className='w-4 h-4 ml-2'/> </Button></div>
    
  </div>
  )
}

export default OpenEnded