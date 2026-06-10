export interface Project {
    id: string;
    slug: string;
    title: string;
    category: "Residential" | "Commercial" | "Renovation" | "Interiors" | "Hospitality";
    heroImage: string;
    images: string[];
    description: string;
    client: string;
    location: string;
    budget: string;
    area: string;
    timeline: string;
    story: string;
    transformation: string;
    designElements: string[];
}

export const projects: Project[] = [
    {
        id: "1",
        slug: "jubilee-hills-villa",
        title: "Jubilee Hills Villa",
        category: "Residential",
        heroImage: "/hero.png",
        images: ["/hero.png", "/bedroom.png"],
        description: "A blend of traditional grandeur and modern minimalism in the heart of Hyderabad.",
        client: "The Reddy Family",
        location: "Jubilee Hills, Hyderabad",
        budget: "₹3.5 Cr",
        area: "4,500 sq ft",
        timeline: "14 Weeks",
        story: "The clients wanted a home that spoke of their legacy while embracing the future. We focused on the Navy and Silver aesthetic.",
        transformation: "We removed non-load-bearing walls to create a fluid axis. Used pristine white marble offset by deep navy accents.",
        designElements: ["Italian Marble Flooring", "Navy Blue Accents", "Double-height Atrium", "Custom Chandelier"]
    },
    {
        id: "2",
        slug: "tech-park-office",
        title: "Tech Park Office",
        category: "Commercial",
        heroImage: "/office.png",
        images: ["/office.png"],
        description: "A collaborative workspace designed for innovation and productivity.",
        client: "InnovateTech Solutions",
        location: "Hitech City, Hyderabad",
        budget: "₹85 Lakhs",
        area: "2,500 sq ft",
        timeline: "8 Weeks",
        story: "InnovateTech needed a space that fostered collaboration without sacrificing focus. The challenge was a rigid rectangular floor plan with low ceilings.",
        transformation: "We exposed the HVAC ducts and painted the ceiling charcoal black to create an illusion of height. Premium navy walls create a strong executive presence.",
        designElements: ["Executive Boardrooms", "Premium Materials", "Brand Color Integration", "Acoustic Treatments"]
    },
    {
        id: "3",
        slug: "modern-penthouse",
        title: "Modern Penthouse",
        category: "Residential",
        heroImage: "/bedroom.png",
        images: ["/bedroom.png", "/kitchen.png"],
        description: "Sky-high luxury with panoramic views and bespoke interiors.",
        client: "Private Client",
        location: "Financial District, Hyderabad",
        budget: "₹2.2 Cr",
        area: "3,200 sq ft",
        timeline: "12 Weeks",
        story: "With sweeping views of the city, this penthouse needed to feel like a sanctuary in the sky. The client desired a 'hotel-like' luxury.",
        transformation: "We maximized the views by orienting all major seating towards the windows. A navy and silver palette served as a canvas.",
        designElements: ["Smart Home Automation", "Bespoke Furniture", "Floor-to-ceiling Windows", "Minimalist Art"]
    },
    {
        id: "4",
        slug: "banjara-hills-apt",
        title: "Banjara Hills Kitchen",
        category: "Renovation",
        heroImage: "/kitchen.png",
        images: ["/kitchen.png"],
        description: "Revitalizing a 90s apartment into a contemporary family home.",
        client: "Mr. & Mrs. Rao",
        location: "Banjara Hills, Hyderabad",
        budget: "₹55 Lakhs",
        area: "1,800 sq ft",
        timeline: "10 Weeks",
        story: "This older apartment had great bones but tired finishes. The challenge was updating the plumbing and electricals without destroying the vintage charm.",
        transformation: "We gutted the kitchen completely, introducing sleek navy blue cabinetry and pristine white marble countertops.",
        designElements: ["Open Kitchen", "Navy Cabinetry", "Silver Hardware", "Custom Joinery"]
    }
];
