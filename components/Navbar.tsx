import React from 'react'
import Image from 'next/image'
import SigninButton from './SigninButton'
import { getAuthSession } from '@/lib/nextauth'
import UserAccountNav from './UserAccountNav'
import { ThemeToggle } from './ThemeToggle'
import { redirect } from 'next/navigation'
import Link from 'next/link'

type Props = {}

const Navbar = async (props: Props) => {
    const session = await getAuthSession()
  return (
    <nav className="relative container mx-auto p-2 border-b">

    <div className="flex items-center justify-between">
        <div className="pt-2" >
          <Link href='/'>
            <Image src="/quizpulse2.png" alt="QuizPulse" width={150} height={150} />
          </Link>
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