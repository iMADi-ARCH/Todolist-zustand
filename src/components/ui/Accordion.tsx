import {
    FC,
    ForwardRefExoticComponent,
    RefAttributes,
    forwardRef,
} from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { MdArrowDownward } from "react-icons/md";

interface Item {
    trigger: string;
    content: string;
}

interface AccordionProps {
    items: Item[];
}

const Accord: FC<AccordionProps> = ({ items }) => {
    return (
        <Accordion.Root
            className="bg-mauve6 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
            type="multiple"
        >
            {items.map((item, i) => {
                return (
                    <AccordionItem key={i} value={i.toString()}>
                        <AccordionTrigger>{item.trigger}</AccordionTrigger>
                        <AccordionContent>{item.content}</AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion.Root>
    );
};

const AccordionItem: ForwardRefExoticComponent<
    Accordion.AccordionItemProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
        className={cn(
            "focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]",
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        {children}
    </Accordion.Item>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger: ForwardRefExoticComponent<
    Accordion.AccordionTriggerProps & RefAttributes<HTMLButtonElement>
> = forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
        <Accordion.Trigger
            className={cn(
                "text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none",
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <MdArrowDownward
                className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
            />
        </Accordion.Trigger>
    </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";
const AccordionContent: ForwardRefExoticComponent<
    Accordion.AccordionContentProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={cn(
            "text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]",
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
));
AccordionContent.displayName = "AccordionContent";
export default Accord;
