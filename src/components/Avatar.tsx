
interface AvatarProps {
    name: string;
    size?: "small"|"big";
}

export const Avatar = ({name, size ="small"}:AvatarProps)=>{
    const getInitials = (name: string) => {
        const words = name.trim().split(" ");
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        } else {
            return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
        }
    };
    return  <div className={`cursor-pointer relative inline-flex items-center justify-center ${size === "small"?"w-4 h-4":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
                <span className={`${size === "small"?"text-xs":"text-md"} font-light text-gray-600 dark:text-gray-300`}>{getInitials(name)}</span>
            </div>
    

}