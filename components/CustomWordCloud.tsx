"use client"
import React from 'react'
import D3WordCloud from 'react-d3-cloud'
import { useTheme } from "next-themes";

const data = [{

text: "Hey",
value: 3

},
{

    text: "Hey",
    value: 4
    
    },
{

text: "Hey",
value: 2

},
{

text: "Hey",
value: 10

},
{

    text: "Hey",
    value: 8
    
    },

]

const fontSizeMapper = (word: {value: number}) =>  {
    
    return Math.log2(word.value) * 10 + 16
    
    
}

type Props = {}

const CustomWordCloud = (props: Props) => {
    const theme = useTheme();
  return (
   <>
    <D3WordCloud data={data} height={500} font="Times" fontSize={fontSizeMapper} rotate={0} padding={10} fill={theme.theme === "dark" ? "white" : "black"} />
   </>
  )
}

export default CustomWordCloud 