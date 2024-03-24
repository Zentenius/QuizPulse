import React from 'react'
import { Card } from './ui/card'
import { CheckCircle2, XIcon } from 'lucide-react'
import { Separator } from './ui/separator'

type Props = {

    correctAnswers: number,
    wrongAnswers: number,

}

const MCQCounter = ({correctAnswers, wrongAnswers}: Props) => {
  return (
    <Card className='flex flex-row items-center justify-center p-2 md:p-3 bg-[#dae9e5] dark:bg-[#162522] dark:border-none'>
        <CheckCircle2 color='green' className='h-[20px] w-[20px]'/>
        <span className='md:mx-2 mx-1 md:text-2xl text-[green]'>{correctAnswers}</span>
        <Separator orientation='vertical'/>
        <span className='md:mx-3 mx-1 md:text-2xl text-[red]'>{wrongAnswers}</span>
        <XIcon color='red' className='h-[20px] w-[20px]' />
    </Card>
  )
}

export default MCQCounter