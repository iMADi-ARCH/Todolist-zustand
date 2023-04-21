import "./globals.css";

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
        <html lang="en" className="scroll-smooth w-full h-full">
            <body className="w-full h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
                {children}
            </body>
        </html>
    );
}
