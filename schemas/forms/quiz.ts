import {z} from 'zod'

export const QuizCreationSchema = z.object({


    topic: z.string().min(4, {message: "Topic must be at least 4 characters long"}).max(2000),
    type: z.enum(['mcq','open_ended']),
    amount: z.number().min(1).max(40),


})

export const checkAnswerSchema = z.object({


        questionId: z.string(),
        userAnswer: z.string()

})