import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";;
import {Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { type ChangeEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

/* TODO - Use shadcn components
- Link: https://ui.shadcn.com/
- Remove radix-ui and ui components except button.tsx
- Replace everything
*/
export default function CreateFolder() {
  const navigate = useNavigate();

  function createFolderFunc(e: ChangeEvent<HTMLFormElement>){};
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
                <form  className="space-y-6" onSubmit={createFolderFunc}>
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Note title"
                            // onChange={(e) => setTitle(e.target.value)}
                            // value={title}
                            required
                        />
                    </div>
                    <div className="space-y-2">

                        {/* <Label htmlFor="content">Content</Label>
                        <Textarea
                            className="w-full h-64"
                            id="content"
                            placeholder="Write your note here..."
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        /> */}
                    </div>
                    <Button type="submit" variant="outline" size={"default"}>
                        Create Note
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}

