import React from "react";

interface LegalLayoutProps {
    children: React.ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
        </div>
    );
}