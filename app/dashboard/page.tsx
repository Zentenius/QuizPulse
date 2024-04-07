import HistoryCard from '@/components/dashboard/HistoryCard'
import QuizMeCard from '@/components/dashboard/QuizMeCard'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'
import HotTopicsCard from './HotTopicsCard'
import RecentActivities from './RecentActivities'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Bug, Volume } from 'lucide-react'

type Props = {}

export const metadata = {

    title: "Dashboard | QuizPulse"

}

const Dashboard = async (props: Props) => {
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect("/")
    }
    return (
    <main className='p-8 mx-auto max-w-7xl'>
        <div className='flex items-center'>
            <h1 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h1>
            <Dialog>
            <DialogTrigger asChild>
                
        <span className="flex items-center px-2 py-1 text-white rounded-md  bg-[#2c876a] dark:bg-[#9ad0be]">
            Bugs
            <Bug className="w-5 h-5 ml-1" />
        </span>
      </DialogTrigger>
            <DialogContent className='bg-[#ecf3f1]'>
                <DialogHeader>
                <DialogTitle className=''>Notice</DialogTitle>
                <DialogDescription className='text-sm text-gray-600'>
                This website is currently still underdevlopment so bugs are to be expected
                </DialogDescription>
                </DialogHeader>
                <div className='ml-4'>
                <ul className='list-disc text-[15px]
                    '>
                    <li>Quiz not loading</li>
                    <li>Date being wrong</li>
                    <li>Open ended questions not working</li>
                    <li>Same option showing twice for multiple choice</li>
        
                </ul>
                </div>
            </DialogContent>
            </Dialog>
        </div>
            <div className='grid gap-4 mt-4 md:grid-cols-2'>
                <QuizMeCard/>
                <HistoryCard/>
            </div>
            <div className='grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7'>
                <HotTopicsCard/>
                <RecentActivities/>
            </div>
    </main>
  )
}
export default Dashboard