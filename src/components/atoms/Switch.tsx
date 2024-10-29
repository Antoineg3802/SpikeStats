"use client"

interface SwitchProps {
    onClick?: () => void;
}

export default function Switch({ onClick }: SwitchProps) {
    return (
        <label
            htmlFor="darkThemeActive"
            className="relative inline-block h-6 w-10 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-lightOrange"
        >
            <input
                type="checkbox"
                id="darkThemeActive"
                className="peer sr-only"
                onChange={onClick}
            />

            <span
                className="absolute inset-y-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:end-0 peer-checked:start-auto start-0"
            ></span>
        </label>
    );
}
