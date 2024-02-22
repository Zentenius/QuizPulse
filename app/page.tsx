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
    <div className="p-10">

      <div className=" rounded-md bg-[#dae9e5] dark:bg-[#162522] h-[90vh] ">
        <div className="flex flex-col items-center pt-24 h-screen space-y-8  ">
          <Badge variant="outline" className="px-3 bg-[#a0cdbe] dark:bg-[#182927] border-[#7FB0A2] dark:border-[#1a2d28] font-light "><GraduationCap className="mr-3 w-5 font-light"/>Next-Generation Quizzing</Badge>
          <h1 className=" text-7xl font-bold w-[1000px] text-center">Create Engaging Quizzes with AI technology</h1>
          <p className="text-sm text-black dark:text-white">Welcome to our AI quiz Platform, where you can easily create and take quizzes to test your knowledge.</p>
          <div className="space-x-4">
             <GetStarted text="px-10 py-6"/>
            <Button variant="outline" className="hover:bg-[#8bdac0] dark:hover:bg-[#315e4f] dark:border-[#315e4f] dark:bg-transparent px-10 py-6 bg-transparent border-[#8bdac0]">Learn More</Button>
              
          </div> 
          <Image src={"https://media.discordapp.net/attachments/1137879400428355654/1208152218981630044/1Q6qA1c99MwAAAAASUVORK5CYII.png?ex=65e23e6f&is=65cfc96f&hm=1b323678a0b3d5c45003ae5fc16fed2874158deddd5d356f371e7b301e2b103a&=&format=webp&quality=lossless&width=760&height=578"} width={450} height={450} className="absolute bottom-0 left-8" alt="QuizPulse" />      
        </div>
        
      </div>

    </div>
  );
}
