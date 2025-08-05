// Define the component interface
interface Component {
    name: string;
    tier: 'free' | 'pro';
    description?: string;
    // Add other component properties as needed
}

export const filterComponentsByTier = (components: Component[], userTier: 'free' | 'pro'): Component[] => {
    return components.filter(component =>
        userTier === 'pro' || component.tier === 'free'
    );
};

// Export the Component type for use in other files
export type { Component };