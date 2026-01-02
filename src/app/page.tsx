
import { CategoryDisplaySection } from "../screens/HomeV/sections/CategoryDisplaySection";
import { HeroSection } from "../screens/HomeV/sections/HeroSection";
// import { InstagramFeedSection } from "../screens/HomeV/sections/InstagramFeedSection";
// Disabling Insta feed for now as it might need refactoring or API keys
import { NewArrivalsSection } from "../screens/HomeV/sections/NewArrivalsSection";
import { RoomSelectionSection } from "../screens/HomeV/sections/RoomSelectionSection";
import { TaglineSection } from "../screens/HomeV/sections/TaglineSection";
import { UniqueFeaturesSection } from "../screens/HomeV/sections/UniqueFeaturesSection";

export default function Home() {
    return (
        <div className="bg-primary-03 overflow-hidden w-full relative">
            <HeroSection />
            <NewArrivalsSection />
            <UniqueFeaturesSection />
            <CategoryDisplaySection />
            <TaglineSection />
            <RoomSelectionSection />
            {/* <InstagramFeedSection /> */}
        </div>
    );
}
