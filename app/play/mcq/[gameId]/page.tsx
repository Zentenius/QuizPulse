import { getAuthSession } from '@/lib/nextauth';
import React from 'react'

type Props = {
    params: {
        gameId: string;
    }

}

const MCQpage = async ({params: {gameId}}: Props) => {
    const session = await getAuthSession()
    return (
    <div>{gameId}</div>
  )
}
export default MCQpage