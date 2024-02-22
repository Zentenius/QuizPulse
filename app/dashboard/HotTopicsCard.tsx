import CustomWordCloud from '@/components/CustomWordCloud'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {}

const HotTopicsCard = (props: Props) => {
  return (
    <Card className='col-span-4 bg-[#dae9e5] dark:bg-[#162522]  dark:border-none'>
        <CardHeader>
            <CardTitle className='text-2xl'>Hot topics</CardTitle>
            <CardDescription>Click on a topic to start a quiz on it</CardDescription>
            <CardContent className='pl-2'><CustomWordCloud/></CardContent>
        </CardHeader>
    </Card>
  )
}

export default HotTopicsCard