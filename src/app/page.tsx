import { Inter } from "next/font/google";
import Todos from "@/components/Todos";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center px-5 sm:px-10 md:px-24 py-20">
            <Todos />
        </main>
    );
}
