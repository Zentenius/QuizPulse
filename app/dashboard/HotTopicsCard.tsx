import CustomWordCloud from '@/components/CustomWordCloud'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import React from 'react'

type Props = {}

const HotTopicsCard = async (props: Props) => {
  const topics = await prisma.topic_count.findMany({})
const formattedTopics = topics.map(topic => {
  return {
    
    text: topic.topic,
    value: topic.count
  
  }
})
  return (
    <Card className='col-span-4 bg-[#dae9e5] dark:bg-[#162522]  dark:border-none'>
        <CardHeader>
            <CardTitle className='text-2xl'>Hot topics</CardTitle>
            <CardDescription>Click on a topic to start a quiz on it</CardDescription>
            <CardContent className='pl-2'><CustomWordCloud formattedTopics={formattedTopics}/></CardContent>
        </CardHeader>
    </Card>
  )
}

export default HotTopicsCard