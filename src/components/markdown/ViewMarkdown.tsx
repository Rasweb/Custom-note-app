import ReactMarkdown  from 'react-markdown'
import * as Types from "@/types/types"

export function ViewMarkdown({note}:{note: Types.NoteType}){
    return (
        <ReactMarkdown
            components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-semibold mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-medium mb-2" {...props} />,
                p: ({node, ...props}) => <p className="text-base mb-2" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-500 underline" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                ul: ({node, ...props}) => (
                    <ul className="list-disc list-inside my-4" {...props} />
                ),
                ol: ({node, ...props}) => (
                    <ol className="list-decimal list-inside my-4" {...props} />
                ),
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
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