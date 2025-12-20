import * as Types from "@/types/types"
import {BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, CreateLink, InsertImage, InsertTable, InsertThematicBreak, ListsToggle, MDXEditor, UndoRedo, codeBlockPlugin, headingsPlugin, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, tablePlugin, thematicBreakPlugin, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useRef } from "react";

// TODO - modify the someSTyle class for ligth mode and more
// TODO - Check here for more toolbar stuff: https://mdxeditor.dev/editor/docs/customizing-toolbar
// TODO - Handle responsiveness
export function ViewMarkdown({note}:{note: Types.NoteType}){
    /* useRef
        - Persists for the full lifetime of the component
        - Changing a property does not trigger a re-render
        - ref.current to access or modify the stored variable
    */

    const contentRef = useRef(note?.content ?? "# empty");
    const lastSavedRef = useRef("");
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (newContent: string) => {
        contentRef.current = newContent;
        debounceSave();
    };

    const debounceSave = () => {
        if(saveTimeoutRef.current){
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
            saveContent(contentRef.current);
        }, 1500) // autosave delay
    }

    // Save to sqlite database
    const saveContent = async (content: string) => {
        // Only save if content changed
        if(content == lastSavedRef.current){
            return
        }

        try{
            const response = await fetch(`/database/note/${note.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: note.id,
                    content: content
                }),
            });
            if(response.ok){
                console.log("Autosave success");
            }
            // Update last saved value;
            lastSavedRef.current = content;
            // return await response.json();
        } catch(error) {
            console.error("Failted to autosave note: ", error);
        }
    };

    async function imageUploadHandler(image: File){
        const formData = new FormData();
        formData.append("image", image);
        try {
            const response = await fetch("/upload/image", {
                method: "POST",
                body: formData
            });
            const json = (await response.json()) as {url: string};
            return json.url;
        } catch (error){
            console.error("Upload error:",error);
            throw error;
        }
    }
    return (
        <div >
            <MDXEditor 
                markdown={contentRef.current} 
                onChange={handleChange}
                plugins={
                    [headingsPlugin(),
                    listsPlugin(),
                    markdownShortcutPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    linkPlugin(),
                    linkDialogPlugin(),
                    codeBlockPlugin(),
                    imagePlugin({imageUploadHandler}),
                    tablePlugin(),
                    toolbarPlugin({
                        toolbarClassName: 'toolbarStyle',
                        toolbarContents: () => (
                            <>
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <BlockTypeSelect/>
                                <CodeToggle/>
                                <CreateLink/>
                                <InsertImage/>
                                <InsertTable/>
                                <InsertThematicBreak/>
                                <ListsToggle/>
                            </>
                        )
                    })
                    ]
                }
                contentEditableClassName="someSTyle" // Change editor styling
            />
        </div>
    )
}