/// <reference types="react" />
interface DocumentProps {
    children: React.ReactNode;
    frontMatter: {
        title?: string;
        description?: string;
    };
}
export declare const Document: ({ children, frontMatter }: DocumentProps) => JSX.Element;
export {};
