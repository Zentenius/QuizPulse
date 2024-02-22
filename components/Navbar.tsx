import React from 'react'
import Image from 'next/image'
import SigninButton from './SigninButton'
import { getAuthSession } from '@/lib/nextauth'
import UserAccountNav from './UserAccountNav'
import { ThemeToggle } from './ThemeToggle'

type Props = {}

const Navbar = async (props: Props) => {
    const session = await getAuthSession()
  return (
    <nav className="relative container mx-auto p-2 border-b">

    <div className="flex items-center justify-between">
        <div className="pt-2">
            <img src="https://media.discordapp.net/attachments/940015000267919401/1207387142985224273/image_2024-02-14_125829992-removebg-preview.png?ex=65df75e7&is=65cd00e7&hm=4ee8c9802519bd096c8f0fc52b284dc4d8de6582f2eb0754cb1f5a08ddd9f471&=&format=webp&quality=lossless" alt="QuizPulse" width="150" height="150" />

        </div>
        <div className='flex items-center justify-between space-x-4'>
            <ThemeToggle/>
            {session?.user ? ( <UserAccountNav user={session.user} />)
            : (<SigninButton text="Sign in"/>)}
            
        </div>
    </div>

    </nav>
  )
}

export default Navbar