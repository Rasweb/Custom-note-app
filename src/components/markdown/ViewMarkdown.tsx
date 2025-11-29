import ReactMarkdown  from 'react-markdown'
import * as Types from "@/types/types"

export function ViewMarkdown({note}:{note: Types.NoteType}){
    return (
        <ReactMarkdown
            components={{
                img: ({src="", alt=""}) =>{
                    const [label, width] = alt.split("|");
                    const style = width ? { width:`${width}px` } : undefined;
                    return (
                        <img src={src} alt={label} className={`my-4`} style={style} />
                    )
                }    
            }}
        >
            {note?.content}
        </ReactMarkdown>
    )
}