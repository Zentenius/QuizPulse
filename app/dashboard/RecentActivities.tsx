import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import React from 'react'

type Props = {}

const RecentActivities = (props: Props) => {
  return (
    <Card className='col-span-4 lg:col-span-3 bg-[#dae9e5] dark:bg-[#162522] dark:border-none'>
        <CardHeader>
            <CardTitle className='text-2xl'>Recent Activities</CardTitle>
            <CardDescription>You have played a total of 7 games</CardDescription>
        </CardHeader>
        <CardContent className="max-h-[580px] overflow-scroll"></CardContent>

    </Card>
  )
}

export default RecentActivities