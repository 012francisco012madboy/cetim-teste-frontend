import type { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export const Container = ({ children }: Props) => {
    return (
        <main className="w-full min-h-dvh flex flex-col gap-8 overflow-hidden">
            {children}
        </main>
    );
}