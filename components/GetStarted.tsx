"use client"
import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'


type Props = {

    text:string

}

function GetStarted({text}: Props) {
  return (
    <Button size="lg" className={` bg-[#32856a] dark:bg-[#7acdb1] rounded-md ${text}`} onClick={() => signIn('google').catch(console.error)}>Get Sarted</Button>
  )
}

export default GetStarted