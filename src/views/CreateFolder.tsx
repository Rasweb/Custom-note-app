import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";;
import {Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import * as dataHooks from "@/hooks/dataHooks"

export default function CreateFolder() {
    const navigate = useNavigate();
    const [name, setTitle] = useState("");

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dataHooks.createFolderFunc(name, navigate);
    };
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
        <Card className="mx-auto ">
            <CardHeader  className="flex flex-col items-center gap-2">
                <CardTitle>Welcome to folder creation screen</CardTitle>
                <CardAction className="self-center">
                    <Button title="/" variant="link" size="default" onClick={() => navigate("/")}>Go Home</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form  className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="title">Name</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Note title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={name}
                        />
                    </div>
                    <Button type="submit" variant="outline" size={"default"}>
                        Create Folder
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}

