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
    <Card className='flex flex-row items-center justify-center p-3'>
        <CheckCircle2 color='green' size={30}/>
        <span className='mx-2 text-2xl text-[green]'>{correctAnswers}</span>
        <Separator orientation='vertical'/>
        <span className='mx-3 text-2xl text-[red]'>{wrongAnswers}</span>
        <XIcon color='red' size={30}/>
    </Card>
  )
}

export default MCQCounter