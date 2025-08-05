import { filterComponentsByTier, type Component } from "@/lib/pro/filter";
import { useProAuth } from "@/lib/pro/auth";
import { components } from "@/registry";
import { NavItem } from "./nav-item";

export const Navigation = ({ showProComponents }: { showProComponents: boolean }) => {
    const { isProUser } = useProAuth();
    const filteredComponents = filterComponentsByTier(components, isProUser ? 'pro' : 'free');

    return (
        <nav>
            {filteredComponents.map((component: Component) => (
                <NavItem key={component.name} component={component} />
            ))}
        </nav>
    );
};