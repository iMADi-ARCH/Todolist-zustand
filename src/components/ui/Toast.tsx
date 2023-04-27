"use client";
import { FC, useEffect, useState } from "react";
import * as RToast from "@radix-ui/react-toast";
import { MdClose } from "react-icons/md";
import { cn } from "@/lib/utils";
import { animated, useSpring, useTransition } from "@react-spring/web";

interface ToastProps extends RToast.ToastProps {
    title?: string;
    desc?: string;
}

const AnimatedToastRoot = animated(RToast.Root);

const Toast: FC<ToastProps> = ({ title, className, desc, ...props }) => {
    const transitions = useTransition(props.open, {
        from: {
            x: "100%",
            opacity: 0,
        },
        enter: {
            x: "0%",
            opacity: 1,
        },
        leave: {
            x: "100%",
            opacity: 0,
        },
    });

    return (
        <RToast.Provider swipeDirection="down" duration={2000}>
            {transitions((style, item) =>
                item ? (
                    <AnimatedToastRoot
                        {...props}
                        style={{
                            ...style,
                        }}
                        className={cn(
                            "bg-zinc-100 dark:bg-zinc-800 px-10 py-7 rounded-md shadow-lg",
                            className
                        )}
                    >
                        <RToast.Title>{title}</RToast.Title>
                        <RToast.Description>{desc}</RToast.Description>
                        {/* <RToast.Action altText=""></RToast.Action> */}
                        <RToast.Close className="absolute top-0 right-0 p-4 text-lg">
                            <MdClose />
                        </RToast.Close>
                    </AnimatedToastRoot>
                ) : null
            )}

            <RToast.Viewport className="m-5 fixed bottom-0 right-0 flex flex-col gap-3 w-80 max-w-[100vw] list-none z-[2147483647] outline-none" />
        </RToast.Provider>
    );
};

export default Toast;
