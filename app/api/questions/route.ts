import { NextResponse } from "next/server"
import { QuizCreationSchema } from "@/schemas/forms/quiz";import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { prisma } from "@/lib/db";


// /api/questions
export const POST = async (req: Request, res: Response) => {
    try {
        //const session = await getAuthSession()
        //if (!session?.user) {
          //  return NextResponse.json({ error: "You must be logged in to create a quiz" }, { status: 401 });
        //}
        const body = await req.json();
        const {amount, topic, type} = QuizCreationSchema.parse(body);
        let questions: any;
        if (type === "open_ended") {
        
            questions = await strict_output(
                'You are a helpful AI that is able to generate a pair of questions and answers, the length of the answers should noy exceed 15 words, store all the pairs of answers and questions in a json array ', 
                new Array(amount).fill(`You are to generate a random hard open-ended question about ${topic} `)
                , {question: 'question', answer: "answer with max length of 15 words"})
        } else if (type === "mcq") {
                questions = await strict_output(`You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not exceed 15 words, and the amount of questions should always be ${amount} no matter what`, new Array(amount).fill(`You are able to generate a random mcq question about ${topic}`), 
                {
                    question: 'queston',
                    answer: 'answer with max lenth of 15 words',
                    option1: "1st option with max length of 15 words",
                    option2: "2nd option with max length of 15 words",
                    option3: "3rd option with max length of 15 words",
                
                }
                
                )
        }

        return NextResponse.json({questions}, {status: 200})
    } 
    catch (err) {
    if (err instanceof ZodError) {
        
        return NextResponse.json({error: err.issues}, {status: 400})
    
    }
}


}