"use client"
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from './ui/card'
import { useForm } from 'react-hook-form'
import { QuizCreationSchema } from '@/schemas/forms/quiz'
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ClipboardType, CopyCheck } from 'lucide-react'
import { Separator } from './ui/separator'
import {useMutation} from "@tanstack/react-query"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import LoadingQuestions from './LoadingQuestions'
type Props = {
topicParam: string
}



type Input = z.infer<typeof QuizCreationSchema>

const QuizCreation = ({topicParam}: Props) => {
  const router = useRouter()
  const [showLoader, setshowLoader] = React.useState(false)
  const [finished, setFinished] = React.useState(false)
  const { mutate: getQuestions, isPending } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await axios.post("/api/game", { amount, topic, type });
      return response.data;
      
    }, 
  },
  );
  const form = useForm<Input>({
    
        resolver: zodResolver(QuizCreationSchema),
        defaultValues: {
            
            amount: 3,
            topic: "",
            type: "open_ended"
        
        }
    
    })
    function onSubmit (input: Input) {
        setshowLoader(true)
        
        getQuestions({amount: input.amount, topic: input.topic, type: input.type}, {
        
          onSuccess: (response) => {
            setFinished(true)
            setTimeout(() => {
              if (input.type === "open_ended") {
                router.push(`/play/open-ended/${response.gameId}`)}
              else if (input.type === "mcq") {
                router.push(`/play/mcq/${response.gameId}`)
              }
            
            }, 1000)
            
          },
          onError: () => {
          
            setshowLoader(false)
          }
          
        
        })

        
        
        {/*{
          onSuccess: ({ gameId }: { gameId: string }) => {
          
            if (input.type === "open_ended") {
            console.log(gameId)
            router.push(`/play/open-ended/${gameId}`)}
            else if (input.type === "mcq") {
            
            router.push(`/play/mcq/${gameId}`)}

          }
        }*/}
    
    }
    form.watch();
    if (showLoader) {
      
      return <LoadingQuestions finished={finished} />
    }
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#dae9e5]  rounded-md dark:bg-[#162522] dark:border-none'>
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl'>Quiz Creation</CardTitle>
                <CardDescription>Choose a topic</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Enter a topic" {...field} />
              </FormControl>
              <FormDescription>
               Please provide a topic for your quiz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Questions</FormLabel>
              <FormControl>
                <Input placeholder="Enter a an amount" type="number" min={1} max={40} {...field} onChange={(e) => {form.setValue("amount", parseInt(e.target.value))}} />
              </FormControl>
              <FormDescription>
               Choose the amount of questions you'd like provided
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between space-x-0">
            <Button onClick={() => form.setValue('type', 'mcq')} className={`w-1/2 rounded-none rounded-l-lg ${form.getValues('type') === 'mcq' ? "bg-[#2c876a] hover:bg-[#2c876a] hover:opacity-75hover:opacity-75 text-white" : "bg-[#e2efea] hover:bg-[#e2efea] hover:opacity-75 text-black"} `} >
                <CopyCheck className='w-4 h-4 mr-2'/> Multiple Choice
            </Button>
            <Separator orientation="vertical" />
            <Button onClick={() => form.setValue('type', 'open_ended')} className={`w-1/2  rounded-none rounded-r-lg ${form.getValues('type') === 'open_ended' ? "bg-[#2c876a] hover:bg-[#2c876a] hover:opacity-75  text-white" : "bg-[#e2efea] hover:bg-[#e2efea] text-black"}`}>
                <ClipboardType className='w-4 h-4 mr-2'/> Open Ended
            </Button>
        </div>
        <Button disabled={isPending} type="submit" className='bg-[#32856a]'>Submit</Button>
      </form>
    </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default QuizCreation