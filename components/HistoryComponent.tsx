import { prisma } from '@/lib/db'
import { Clock, CopyCheck, Edit2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

type Props = {

    limit: number
    userId: string

}

const HistoryComponent = async ({limit, userId}: Props) => {
    const games = await prisma.game.findMany({
    
    where: {
    
        userId: userId
    },
    take: limit,
    orderBy: {
    
        timeStarted: "desc"
    }


    
    })
  return (
    <div>

        <div className='space-y-8'>


        {games.map( game => {

        return (
                <div key={game.id}  className="flex items-center flex-row justify-between rounded-[20px] bg-[#ecf3f1] dark:bg-[#111c19] py-2 px-3 md:px-4 md:py-3"> 
            <div className='flex items-center'>
            <div className='cusor-pointer' > 
            {game.gameType ===  'mcq' ? (
                        
                        <CopyCheck className='mr-3 w-4 h-4 md:w-6 md:h-6' />
                        
                        ) : (
                            <Edit2 className='mr-3 w-4 h-4 md:w-6 md:h-6'/>
                        )}
            </div>
            <div className='ml-4'>
            <Link className='md:text-base text-xs font-medium leading-none'  href={`/statistics/${game.id}`}>{game.topic}</Link>
            <p className="flex items-center px-2 py-1 md:text-xs text-[10px] dark:text-white text-black rounded-lg w-fit  dark:bg-[#162522] bg-[#dae9e5] font-semibold ">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(game.timeEnded ?? 0).toLocaleDateString()}
                </p>

            </div>
            </div>
            <div>
                <Button  className='bg-[#dae9e5] dark:bg-[#162522] md:py-2 md:px-4 px-2 py-1 rounded-full text-black dark:text-white font-semibold  text-[10px] md:text-base ' asChild>
                        <Link href={`/statistics/${game.id}`} className='' >{game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}</Link>
                </Button>

            </div>
        </div>
            )
        
        })}

        </div>


    </div>
  )
}

export default HistoryComponent