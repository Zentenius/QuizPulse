"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {}

const QuizMeCard = (props: Props) => {
    const router = useRouter()
  return (
    <Card className='bg-[#dae9e5] dark:bg-[#162522]  dark:border-none'>
        <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-2xl'>Create Quiz</CardTitle>
            <Button onClick={() => {router.push("/quiz")}} size="icon" className='rounded-full bg-[#32856a] dark:bg-[#7acdb1]'><Plus/></Button>
        </CardHeader>
        <CardContent>
            <p className='text-sm text-muted-foreground'>
                Challenge yourself with a quiz!
            </p>
        </CardContent>
    </Card>
  )
}
export default QuizMeCard