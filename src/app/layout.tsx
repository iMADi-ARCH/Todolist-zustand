import Link from "next/link";
import "./globals.css";
import { AiTwotoneHeart } from "react-icons/ai";
import Button from "@/components/ui/Button";
import Image from "next/image";
export const metadata = {
    title: "Minimal Todo list",
    description: `A minimal todolist with fast keyboard shortcuts. No clicky-clicky just to mark a todo as done. 
        Animations with react-spring and some ui elements from radix-ui.`,
    creator: "Aditya Nandan",
    category: "todo list",
    keywords: "todo, list, project manager, clean ui, radix, react-spring",
    applicationName: "Minimal Todo list",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="scroll-smooth w-full h-full overflow-x-clip overflow-y-auto"
        >
            <body className="relative w-full h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
                {children}

                <Link
                    href="https://github.com/iMADi-ARCH/Todolist-zustand"
                    target="_blank"
                    className="fixed top-0 right-0 p-3 animate-overlayShow"
                >
                    <Button
                        variant="secondary"
                        brightness="dim"
                        className="text-3xl p-0"
                    >
                        <Image
                            src={"/github-mark-white.svg"}
                            className="filter invert dark:invert-0 w-7 h-auto"
                            alt="github icon"
                            width={98}
                            height={96}
                        />
                    </Button>
                </Link>
                <Link
                    className="fixed bottom-0 p-3 text-xs text-zinc-900 dark:text-zinc-50 hover:opacity-100 opacity-50 transition-opacity"
                    href={"https://github.com/iMADi-ARCH"}
                    target="_blank"
                >
                    Made with
                    <AiTwotoneHeart className="inline animate-lubDub text-red-500" />
                    <br /> by Aditya Nandan
                </Link>
            </body>
        </html>
    );
}
