interface SubmitButtonProps {
    text: string;
    onClick?: (e:any) => void;
}

export default function SubmitButton({text, onClick}: SubmitButtonProps) {
    return (
        <button className="h-fit py-1 px-2 border-[1px] border-gray-300 hover:bg-lightOrange/40 transition-all rounded-lg shadow-inner" onClick={onClick? onClick : ()=>''}>
            {text}
        </button>
    );
}