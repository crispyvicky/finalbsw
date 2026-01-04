export const COMMON_ITEMS = [
    { label: "Master Bedroom Wardrobe", defaultRate: 1100, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80", categories: ["bedroom"] }, // Wardrobe specific
    { label: "Guest Bedroom Wardrobe", defaultRate: 1100, image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&q=80", categories: ["bedroom"] }, // Bedroom interior
    { label: "Kitchen Base Cabinet", defaultRate: 1400, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] }, // Kitchen cabinet
    { label: "Kitchen Wall Cabinet", defaultRate: 1200, image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&q=80", categories: ["kitchen"] }, // Modern kitchen
    { label: "Loft Storage", defaultRate: 650, image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c01?w=400&q=80", categories: ["bedroom", "kitchen", "general"] },
    { label: "TV Unit (Basic)", defaultRate: 1500, image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&q=80", categories: ["living", "bedroom"] }, // Living room TV
    { label: "TV Unit (Premium)", defaultRate: 1800, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80", categories: ["living", "bedroom"] }, // Premium Living
    { label: "Crockery Unit", defaultRate: 1600, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80", categories: ["dining", "living"] }, // Dining cabinet
    { label: "Shoe Rack", defaultRate: 1200, image: "https://images.unsplash.com/photo-1595552611403-aba1338fac27?w=400&q=80", categories: ["foyer", "general"] }, // Entryway
    { label: "Study Table", defaultRate: 1300, image: "https://images.unsplash.com/photo-1519710304256-40f55522ba16?w=400&q=80", categories: ["bedroom", "study"] }, // Desk
    { label: "False Ceiling (Gypsum)", defaultRate: 120, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80", categories: ["all"] }, // Ceiling
    { label: "False Ceiling (POP)", defaultRate: 110, image: "https://images.unsplash.com/photo-1594916320072-fac403d64026?w=400&q=80", categories: ["all"] },
    { label: "Wall Painting (Premium Emulsion)", defaultRate: 25, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", categories: ["all"] }, // Paint texture
    { label: "Wall Painting (Royal Play)", defaultRate: 85, image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&q=80", categories: ["all"] },
    { label: "Electrical Point (Switch & Socket)", defaultRate: 650, image: "https://images.unsplash.com/photo-1558235201-90a6d36d4f6c?w=400&q=80", categories: ["all"] },
    { label: "Mosquito Mesh (Saint Gobain)", defaultRate: 350, image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed5cd6?w=400&q=80", categories: ["all"] },
    { label: "Safety Grill", defaultRate: 250, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80", categories: ["all"] },

    // --- MASTER BEDROOM SPECIFIC ITEMS ---
    { label: "Main Wardrobe", defaultRate: 1200, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80", categories: ["bedroom"] },
    { label: "Loft Frame", defaultRate: 700, image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c01?w=400&q=80", categories: ["bedroom"] },
    { label: "Loft Base Panelling", defaultRate: 550, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom"] },
    { label: "Dressing", defaultRate: 1100, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80", categories: ["bedroom"] },
    { label: "Study", defaultRate: 1300, image: "https://images.unsplash.com/photo-1519710304256-40f55522ba16?w=400&q=80", categories: ["bedroom", "study"] },
    { label: "Sitting Unit", defaultRate: 1400, image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Books Rack", defaultRate: 900, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", categories: ["bedroom", "study"] },
    { label: "Storage Bed", defaultRate: 1500, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80", categories: ["bedroom"] },
    { label: "Wall Highlighter", defaultRate: 450, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Wallpaper", defaultRate: 85, image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Window Panelling", defaultRate: 600, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Sitout Kushan", defaultRate: 800, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Bed Kushan", defaultRate: 750, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80", categories: ["bedroom"] },
    { label: "Lowers Panelling", defaultRate: 500, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "TV Unit", defaultRate: 1600, image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Side Frame", defaultRate: 650, image: "https://images.unsplash.com/photo-1620330954005-59b56f8f1725?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Main Frame", defaultRate: 750, image: "https://images.unsplash.com/photo-1620330954005-59b56f8f1725?w=400&q=80", categories: ["bedroom", "all"] },

    // --- CHILDREN BEDROOM SPECIFIC ITEMS ---
    { label: "Children Main Wardrobe", defaultRate: 1150, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80", categories: ["bedroom"] },
    { label: "Children Loft Frame", defaultRate: 680, image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c01?w=400&q=80", categories: ["bedroom"] },
    { label: "Children Loft Base Panelling", defaultRate: 530, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom"] },
    { label: "Children Dressing", defaultRate: 1050, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80", categories: ["bedroom"] },
    { label: "Children Study", defaultRate: 1250, image: "https://images.unsplash.com/photo-1519710304256-40f55522ba16?w=400&q=80", categories: ["bedroom", "study"] },
    { label: "Children Sitting Unit", defaultRate: 1350, image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Children Books Rack", defaultRate: 850, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", categories: ["bedroom", "study"] },
    { label: "Children Storage Bed", defaultRate: 1450, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80", categories: ["bedroom"] },
    { label: "Children Wall Highlighter", defaultRate: 430, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Children Wallpaper", defaultRate: 80, image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Children Window Panelling", defaultRate: 580, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Children Sitout Kushan", defaultRate: 780, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Children Bed Kushan", defaultRate: 730, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80", categories: ["bedroom"] },
    { label: "Children Lowers Panelling", defaultRate: 480, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Children TV Unit", defaultRate: 1550, image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Children Side Frame", defaultRate: 630, image: "https://images.unsplash.com/photo-1620330954005-59b56f8f1725?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Children Main Frame", defaultRate: 730, image: "https://images.unsplash.com/photo-1620330954005-59b56f8f1725?w=400&q=80", categories: ["bedroom", "all"] },

    // --- GUEST BEDROOM SPECIFIC ITEMS ---
    { label: "Guest Main Wardrobe", defaultRate: 1100, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80", categories: ["bedroom"] },
    { label: "Guest Loft Frame", defaultRate: 650, image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c01?w=400&q=80", categories: ["bedroom"] },
    { label: "Guest Loft Base Panelling", defaultRate: 520, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom"] },
    { label: "Guest Dressing", defaultRate: 1050, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80", categories: ["bedroom"] },
    { label: "Guest Study", defaultRate: 1200, image: "https://images.unsplash.com/photo-1519710304256-40f55522ba16?w=400&q=80", categories: ["bedroom", "study"] },
    { label: "Guest Sitting Unit", defaultRate: 1300, image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Guest Books Rack", defaultRate: 850, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", categories: ["bedroom", "study"] },
    { label: "Guest Storage Bed", defaultRate: 1400, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80", categories: ["bedroom"] },
    { label: "Guest Wall Highlighter", defaultRate: 420, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Guest Wallpaper", defaultRate: 75, image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Guest Window Panelling", defaultRate: 570, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Guest Sitout Kushan", defaultRate: 750, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Guest Bed Kushan", defaultRate: 720, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80", categories: ["bedroom"] },
    { label: "Guest Lowers Panelling", defaultRate: 470, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Guest TV Unit", defaultRate: 1500, image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&q=80", categories: ["bedroom", "living"] },
    { label: "Guest Side Frame", defaultRate: 620, image: "https://images.unsplash.com/photo-1620330954005-59b56f8f1725?w=400&q=80", categories: ["bedroom", "all"] },
    { label: "Guest Main Frame", defaultRate: 720, image: "https://images.unsplash.com/photo-1620330954005-59b56f8f1725?w=400&q=80", categories: ["bedroom", "all"] },

    // --- HALL & DINING SPECIFIC ITEMS ---
    { label: "Hall Crockery Unit", defaultRate: 1600, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80", categories: ["living", "dining"] },
    { label: "Hall Wall Unit", defaultRate: 1200, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80", categories: ["living", "dining"] },
    { label: "Hall Base Unit", defaultRate: 1400, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", categories: ["living", "dining"] },
    { label: "Hall Loft Frame", defaultRate: 650, image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c01?w=400&q=80", categories: ["living", "dining"] },
    { label: "Hall Wallpaper", defaultRate: 85, image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&q=80", categories: ["living", "dining"] },
    { label: "Hall Wall Highlights", defaultRate: 450, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", categories: ["living", "dining"] },
    { label: "Glass Panelling", defaultRate: 850, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80", categories: ["living", "dining", "all"] },
    { label: "Hall Window Panelling", defaultRate: 600, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["living", "dining"] },
    { label: "Hall Loft Base Panelling", defaultRate: 550, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["living", "dining"] },
    // Additional Hall Items
    { label: "Hall TV Unit", defaultRate: 1600, image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&q=80", categories: ["living"] },
    { label: "Hall Arch", defaultRate: 850, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["living", "all"] },
    { label: "Hall Arch Box", defaultRate: 950, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["living", "all"] },
    { label: "Metal Partition", defaultRate: 2500, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", categories: ["living", "dining"] },
    { label: "Hall Panelling", defaultRate: 600, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["living"] },
    { label: "Hall Wall Beeding", defaultRate: 250, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", categories: ["living"] },

    // --- ENTRANCE / FOYER SPECIFIC ITEMS ---
    { label: "Main Door", defaultRate: 45000, image: "https://images.unsplash.com/photo-1506377225287-24817d23d865?w=400&q=80", categories: ["foyer", "doors"] },
    { label: "Main Door Arch", defaultRate: 5500, image: "https://images.unsplash.com/photo-1506377225287-24817d23d865?w=400&q=80", categories: ["foyer", "doors"] },
    { label: "Main Door Safety Door", defaultRate: 18000, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80", categories: ["foyer", "doors"] },
    { label: "Shoes Rack", defaultRate: 1200, image: "https://images.unsplash.com/photo-1595552611403-aba1338fac27?w=400&q=80", categories: ["foyer"] },
    { label: "Entrance Tiles", defaultRate: 150, image: "https://images.unsplash.com/photo-1584743232675-8bd34934fb50?w=400&q=80", categories: ["foyer", "flooring"] },

    // --- VANITY SPECIFIC ITEMS ---
    { label: "Vanity Base Unit", defaultRate: 1400, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&q=80", categories: ["vanity", "bathroom"] },
    { label: "Vanity Wall Unit", defaultRate: 1200, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80", categories: ["vanity", "bathroom"] },
    { label: "Vanity Loft Frame", defaultRate: 650, image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c01?w=400&q=80", categories: ["vanity", "bathroom"] },
    { label: "Vanity Side Unit", defaultRate: 1100, image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?w=400&q=80", categories: ["vanity", "bathroom"] },
    { label: "Vanity Loft Base Panelling", defaultRate: 550, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["vanity", "bathroom"] },

    // --- KITCHEN SPECIFIC ITEMS ---
    { label: "Base Unit", defaultRate: 1400, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] },
    { label: "Wall Unit", defaultRate: 1200, image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&q=80", categories: ["kitchen"] },
    { label: "Kitchen Loft Frame", defaultRate: 680, image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c01?w=400&q=80", categories: ["kitchen"] },
    { label: "Kitchen Loft Base Panelling", defaultRate: 540, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["kitchen"] },
    { label: "Pantry Unit", defaultRate: 1500, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["kitchen"] },
    { label: "Rolling Shutter", defaultRate: 950, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] },
    { label: "Corner Magic", defaultRate: 1800, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["kitchen"] },
    { label: "Tandem Baskets", defaultRate: 1200, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] },
    { label: "SS Baskets", defaultRate: 1100, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] },
    { label: "Wicker Baskets", defaultRate: 950, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] },
    { label: "Breakfast Counter", defaultRate: 1600, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["kitchen", "dining"] },
    { label: "Breakfast Arch", defaultRate: 850, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["kitchen"] },
    { label: "Arch", defaultRate: 800, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["kitchen", "all"] },
    { label: "Pull Out", defaultRate: 1100, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] },
    { label: "Gas Copper Connection", defaultRate: 450, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] },
    { label: "Stove", defaultRate: 8500, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["kitchen"] },
    { label: "Chimney", defaultRate: 12000, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", categories: ["kitchen"] },
    { label: "Profile Doors", defaultRate: 1300, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen", "all"] },
    { label: "Open Box", defaultRate: 950, image: "https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=400&q=80", categories: ["kitchen"] },

    // Generic Construction Items (from Excel)
    { label: "Internal Box (Carcass)", defaultRate: 1100, image: "https://images.unsplash.com/photo-1594040291617-e9a9d1645391?w=400&q=80", categories: ["all", "kitchen", "bedroom"] },
    { label: "Wall Unit Box", defaultRate: 1100, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80", categories: ["all", "kitchen"] },
    { label: "Panning / Paneling", defaultRate: 500, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["all"] },
    { label: "Frame / Borders", defaultRate: 700, image: "https://images.unsplash.com/photo-1620330954005-59b56f8f1725?w=400&q=80", categories: ["all"] },
    { label: "Loft Box", defaultRate: 650, image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c01?w=400&q=80", categories: ["all"] },

    // --- NEW CATEGORIES (User Requested) ---

    // Plumbing & Sanitary
    { label: "Wash Basin (Table Top)", defaultRate: 3500, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&q=80", categories: ["plumbing", "bathroom"] },
    { label: "Wall Mounted WC", defaultRate: 8500, image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80", categories: ["plumbing", "bathroom"] },
    { label: "Kitchen Sink (Quartz/Granite)", defaultRate: 6000, image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400&q=80", categories: ["plumbing", "kitchen"] },
    { label: "CP Fittings (Taps/Mixers)", defaultRate: 4500, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80", categories: ["plumbing", "bathroom", "kitchen"] },
    { label: "Plumbing Pipes & Internal", defaultRate: 15000, image: "https://images.unsplash.com/photo-1581092580638-e4b7858c6791?w=400&q=80", categories: ["plumbing", "all"] },

    // Doors & Locks
    { label: "Main Door (Teak Wood Frame & Shutter)", defaultRate: 45000, image: "https://images.unsplash.com/photo-1506377225287-24817d23d865?w=400&q=80", categories: ["civil", "doors"] },
    { label: "Flush Door (Laminate Finish)", defaultRate: 12000, image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=400&q=80", categories: ["civil", "doors"] },
    { label: "Door Lock Set (Mortise Handle)", defaultRate: 2800, image: "https://images.unsplash.com/photo-1622359288102-1a403d64115e?w=400&q=80", categories: ["hardware", "doors"] },
    { label: "Door Accessories (Hinges/Stopper)", defaultRate: 1500, image: "https://images.unsplash.com/photo-1588365609335-e1069a239965?w=400&q=80", categories: ["hardware", "doors"] },

    // Flooring, Tiles & Granite
    { label: "Vitrified Floor Tiles (600x1200)", defaultRate: 110, image: "https://images.unsplash.com/photo-1584743232675-8bd34934fb50?w=400&q=80", categories: ["flooring", "civil"] },
    { label: "Bathroom Highlighter Tiles", defaultRate: 95, image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80", categories: ["flooring", "bathroom"] },
    { label: "Granite Countertop (Jet Black)", defaultRate: 350, image: "https://images.unsplash.com/photo-1615529185854-3259b6f10356?w=400&q=80", categories: ["flooring", "kitchen"] },
    { label: "Italian Marble Flooring", defaultRate: 450, image: "https://images.unsplash.com/photo-1618221823713-980637319e38?w=400&q=80", categories: ["flooring", "civil"] },

    // Electrical
    { label: "Electrical Wiring (Polycab/Finolex)", defaultRate: 25000, image: "https://images.unsplash.com/photo-1558235201-90a6d36d4f6c?w=400&q=80", categories: ["electrical", "all"] },
    { label: "Distribution Board (DB Box)", defaultRate: 4500, image: "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?w=400&q=80", categories: ["electrical"] },
    { label: "Profile Lights (LED Strip + Profile)", defaultRate: 650, image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400&q=80", categories: ["electrical", "ceiling"] },
    { label: "Switches & Plates (Legrand)", defaultRate: 200, image: "https://images.unsplash.com/photo-1558235201-90a6d36d4f6c?w=400&q=80", categories: ["electrical"] },

    // --- MISC / SERVICES (User Requested) ---
    // Ceiling & Lights
    { label: "False Ceiling (Gypsum/POP)", defaultRate: 110, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80", categories: ["ceiling", "all"] },
    { label: "PVC Ceiling", defaultRate: 85, image: "https://images.unsplash.com/photo-1594916320072-fac403d64026?w=400&q=80", categories: ["ceiling", "all"] },
    { label: "Wood Ceiling", defaultRate: 280, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80", categories: ["ceiling", "all"] },
    { label: "Light Points", defaultRate: 650, image: "https://images.unsplash.com/photo-1558235201-90a6d36d4f6c?w=400&q=80", categories: ["electrical", "all"] },
    { label: "Profile Lights (Runnning Mtr)", defaultRate: 650, image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400&q=80", categories: ["electrical", "ceiling"] },
    { label: "Lights (Fitting Only)", defaultRate: 150, image: "https://images.unsplash.com/photo-1558235201-90a6d36d4f6c?w=400&q=80", categories: ["electrical"] },
    { label: "Wall Chipping & Boards", defaultRate: 1200, image: "https://images.unsplash.com/photo-1581092580638-e4b7858c6791?w=400&q=80", categories: ["electrical", "civil"] },

    // Civil & Flooring
    { label: "Granite Laying", defaultRate: 140, image: "https://images.unsplash.com/photo-1615529185854-3259b6f10356?w=400&q=80", categories: ["flooring", "civil"] },
    { label: "Tiles Laying", defaultRate: 110, image: "https://images.unsplash.com/photo-1584743232675-8bd34934fb50?w=400&q=80", categories: ["flooring", "civil"] },
    { label: "Granite & Tiles Chemicals", defaultRate: 45, image: "https://images.unsplash.com/photo-1621293954908-35688ade2439?w=400&q=80", categories: ["flooring", "civil"] },
    { label: "Deep Cleaning (Sqft)", defaultRate: 12, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80", categories: ["services", "all"] },

    // Painting & Finishes
    { label: "Ceiling Painting", defaultRate: 22, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", categories: ["painting", "all"] },
    { label: "Wall Painting (Premium)", defaultRate: 25, image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&q=80", categories: ["painting", "all"] },
    { label: "Wallpaper Laying", defaultRate: 20, image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&q=80", categories: ["painting", "all"] },
    { label: "Wall Highlights (Texture)", defaultRate: 85, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", categories: ["painting", "all"] },

    // Balcony & Grills
    { label: "Invisible Grill", defaultRate: 350, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80", categories: ["grills", "balcony"] },
    { label: "Balcony Box Grill", defaultRate: 280, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80", categories: ["grills", "balcony"] },
    { label: "Plain Grill", defaultRate: 220, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80", categories: ["grills", "balcony"] },
    { label: "Mesh Doors", defaultRate: 450, image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed5cd6?w=400&q=80", categories: ["grills", "doors"] },
    { label: "Balcony Cloth Hanger", defaultRate: 3500, image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=400&q=80", categories: ["balcony", "all"] },

    // Plumbing Fixtures
    { label: "Sync (Sink) Installation", defaultRate: 1200, image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400&q=80", categories: ["plumbing"] },
    { label: "Taps Installation", defaultRate: 450, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80", categories: ["plumbing"] },
    { label: "Bowl / Basin Installation", defaultRate: 850, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&q=80", categories: ["plumbing"] },
    { label: "Plumbing Work (Lumpsum)", defaultRate: 5000, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80", categories: ["plumbing"] },

];

export const ESTIMATOR_ROOM_DATA = [
    { id: "Living Room", label: "Living Room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop" },
    { id: "Kitchen", label: "Modular Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=600&auto=format&fit=crop" },
    { id: "Master Bedroom", label: "Master Bedroom", badge: "Popular", image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=600&auto=format&fit=crop" },
    { id: "Bathroom", label: "Bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop" },
    { id: "Dining", label: "Dining Area", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=600&auto=format&fit=crop" },
    { id: "Kids Room", label: "Kids Room", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop" },
    { id: "Guest Room", label: "Guest Room", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop" },
    { id: "Study", label: "Study Unit", image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?q=80&w=600&auto=format&fit=crop" },
    { id: "Vanity", label: "Vanity Area", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=600&auto=format&fit=crop" },
    { id: "Balcony", label: "Balcony", image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=600&auto=format&fit=crop" },
    { id: "Study", label: "Study Unit", image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?q=80&w=600&auto=format&fit=crop" },
    { id: "Foyer", label: "Foyer / Entrance", image: "https://images.unsplash.com/photo-1506377225287-24817d23d865?q=80&w=600&auto=format&fit=crop" },
    { id: "Pooja Room", label: "Pooja Room", image: "https://images.unsplash.com/photo-1606293926075-69a00febf280?q=80&w=600&auto=format&fit=crop" },
];
