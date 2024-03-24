import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { GraduationCap} from 'lucide-react'
import { signIn } from 'next-auth/react'
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import SigninButton from "@/components/SigninButton";
import GetStarted from "@/components/GetStarted";

export default async function Home() {
  const session = await getAuthSession()
  if (session?.user) {
    return redirect('/dashboard')
  }
  return (
    <div className="md:p-10 p-4">

      <div className=" rounded-md bg-[#dae9e5] dark:bg-[#162522] h-[90vh] ">
        <div className="flex flex-col items-center pt-24 h-screen space-y-8  ">
          <Badge variant="outline" className="px-3 bg-[#a0cdbe] dark:bg-[#182927] border-[#7FB0A2] dark:border-[#1a2d28] font-light "><GraduationCap className="mr-3 w-5 font-light"/>Next-Generation Quizzing</Badge>
          <h1 className=" md:text-7xl text-3xl font-bold md:w-[1000px] w-[380px] text-center">Create Engaging Quizzes with AI technology</h1>
          <p className="md:text-sm  text-xs text-[11px] text-center text-black dark:text-white md:w-full w-[300px]">Welcome to our AI quiz Platform, where you can easily create and take quizzes to test your knowledge.</p>
          <div className="space-x-4">
             <GetStarted text="md:px-10 md:py-6"/>
            <Button size={"lg"} variant="outline" className="hover:bg-[#8bdac0] dark:hover:bg-[#315e4f] dark:border-[#315e4f] dark:bg-transparent md:px-10 md:py-6 bg-transparent border-[#8bdac0]">Learn More</Button>
              
          </div> 
          <Image src={"/illustration.png"} width={450} height={450} className="hidden md:flex absolute bottom-0 left-8" alt="QuizPulse" />      
        </div>
        
      </div>

    </div>
  );
}
