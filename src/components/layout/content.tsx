import type { ReactNode } from "react";

type Props = {
    children: ReactNode
}
export const Content = ({ children }: Props) => {
    return (
        <main className="w-full flex justify-center px-4 py-8 md:px-8 md:py-12">
            <section className="max-w-6xl w-full flex flex-col gap-8">
                {children}
            </section>
        </main>
    );
}