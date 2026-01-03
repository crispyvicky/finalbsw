export type EstimatorState = {
    type?: string;
    propertyType: string;
    bhk: string;
    size: number;
    city: string;
    rooms: string[];
    style: string;
    materials: Record<string, string>;
    addons: string[];
    // Lead Gen
    name?: string;
    phone?: string;
};
