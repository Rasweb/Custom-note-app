import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "../APITester";
import { useNavigate } from "react-router-dom";



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
            <button className="cursor-pointer" onClick={() => navigate("/about")}> About page</button><br/>
            <button className="cursor-pointer" onClick={() => navigate("/markdown")}> Markdown page</button>
        </div>
    </div>
    )
}

