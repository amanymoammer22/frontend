export default function Button({ value }) {
    return (
        <button
            className="
            font-[Inknut_Antiqua]
        mx-auto md:mx-0 
        bg-[var(--bg-btn)] 
        text-white 
        rounded-3xl 
        font-medium
        transition hover:opacity-90 
        px-4 py-2 text-base w-[140px]   
        sm:px-6 sm:py-2 sm:text-lg sm:w-[160px]  
        lg:px-8 lg:py-3 lg:text-2xl lg:w-[200px] 
        mt-4
      ">
            {value}
        </button>
    );
}
