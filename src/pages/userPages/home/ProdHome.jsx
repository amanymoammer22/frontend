import TestSwiper from './TestSwiper';
import HomeProd from './HomeProd';
import Sectionlast from './Sectionlast';

export default function ProdHome() {
    return (
        <div className="bg-[var(--bg-Color)] h-full py-40">
            <div className="mx-2 py-[30px] bg-[var(--bg-footer)]   font-[Inknut_Antiqua] lg:rounded-[70px] rounded-3xl">
                <HomeProd />
                <TestSwiper />
                <Sectionlast />
            </div>
        </div>
    );
}
