// components/pro-gate.tsx
export const ProGate = ({ children, componentName }: ProGateProps) => {
    const { isProUser } = useProAuth();

    if (!isProUser) {
        return <ProUpgradePrompt componentName={componentName} />;
    }

    return children;
};