import { DEFAULT_AVATAR } from "../../constants/assets";
import { AVATAR_SIZES } from "../../constants/ui";

export default function Avatar({src, size = "md", alt}){
    const className = `avatar_${size}`
    const dimensions = AVATAR_SIZES[size] || AVATAR_SIZES.md;

    return(
        <img src = {src || DEFAULT_AVATAR}
            className = {className}
            alt = {alt}
            onError={(e) => {e.currentTarget.src=DEFAULT_AVATAR}}
            style={{
                width:`${dimensions}px`,
                height: `${dimensions}px`,
                borderRadius: '20%',
                objectFit: 'cover',
                border: '2px solid #111'
            }}
            loading="lazy" />
    )
}