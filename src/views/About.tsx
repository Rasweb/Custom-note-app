import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";;
import {Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";

import logo from "../logo.svg";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
      </div>
      <div>
        About route
      </div>
      <div>
        <Button variant="link" size="default" onClick={() => navigate("/")}> Home</Button>
      </div>
    </div>
  );
}

