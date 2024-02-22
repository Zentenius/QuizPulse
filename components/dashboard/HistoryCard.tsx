"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { History } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {}

function HistoryCard({}: Props) {
    const router = useRouter()
  return (
    <Card className='hover:cursor-pointer hover:opacity-75 bg-[#dae9e5] dark:bg-[#162522] dark:border-none '>
        <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-2xl '>History</CardTitle>
            <Button onClick={() => {router.push("/history")}} size="icon" className='rounded-full bg-[#32856a] dark:bg-[#7acdb1]'><History/></Button>

            
        </CardHeader>
        <CardContent>
            <p className='text-sm text-muted-foreground'>View your quiz history here!</p>
        </CardContent>

    </Card>
  )
}

export default HistoryCard