import { Container } from "@/components/ui/Container";
import { CampusGallery } from "@/components/campuses/CampusGallery";

export default function CampusesPage() {
    return (
        <>
            <div className="pt-6 pb-6 lg:pb-12">
                <Container>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.22em] text-primary-900">
                        EXPLORE CAMPUSES
                    </h1>
                </Container>
            </div>

            <CampusGallery />
        </>
    );
}
