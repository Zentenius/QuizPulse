"use client"
import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'


type Props = {

    text:string

}

function SigninButton({text}: Props) {
  return (
    <Button size="lg" className=' bg-[#32856a] dark:bg-[#7acdb1] rounded-md' onClick={() => signIn('google').catch(console.error)}>{text}</Button>
  )
}

export default SigninButton