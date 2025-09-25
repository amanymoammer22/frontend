import Button from "../../../components/ui/Button";

export default function HomeDesc() {
return (
    <div className="font-[Inter] mt-16 mx-auto p-6 sm:px-4 lg:px-14 py-[30px] flex flex-col md:flex-row justify-between items-center bg-[var(--bg-Color)] gap-6">
        <div className=" flex flex-col gap-6 text-white w-full md:w-1/2 py-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-lg mx-auto md:mx-0 text-center md:text-left">Palestinian Traditional embroidery</h1>
            <p className="text-base sm:text-lg lg:text-2xl max-w-sm mx-auto md:mx-0 text-center md:text-left">Preserve the rich heritage of Palestinian embroidery and support local artisans</p>
            <Button value="Shop Now" />
        </div>

        <div className="img w-full md:w-1/2 py-4 flex justify-center  mt-16">
            <img src="homeDes.jpg" alt="" className="rounded-3xl w-full max-w-md md:max-w-full" />
        </div>
    </div>
);

}
