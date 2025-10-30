import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "../APITester";
import { useNavigate } from "react-router-dom";
import ReactMarkdown  from 'react-markdown'
const markdown = `
# Hello, World!
# h1
## h2
### h3
#### h4

This is a **bold** paragraph with a [link](https://bun.sh).
`

export default function Home(){
    const navigate = useNavigate();
    return(
    <div className="container mx-auto p-8 text-center relative z-10">
        <Card>
            <CardHeader className="gap-4">
            <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
            <CardDescription>
                Edit <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code> and save to
                test HMR
            </CardDescription>
            </CardHeader>
            <CardContent>
            <APITester />
            </CardContent>
        </Card>
        <div>
            <button onClick={() => navigate("/about")}> Gp heres</button>
        </div>
            <ReactMarkdown 
            components={{
        h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-4" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-3xl font-semibold mb-3" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-2xl font-medium mb-2" {...props} />,
        p: ({node, ...props}) => <p className="text-base mb-2" {...props} />,
        a: ({node, ...props}) => <a className="text-blue-500 underline" {...props} />,
        strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
      }}
            >{markdown}</ReactMarkdown >
    </div>
    )
}