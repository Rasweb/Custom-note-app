import * as Types from "@/types/types"
import {BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, CreateLink, InsertImage, InsertTable, InsertThematicBreak, ListsToggle, MDXEditor, UndoRedo, codeBlockPlugin, headingsPlugin, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, tablePlugin, thematicBreakPlugin, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useEffect, useRef } from "react";

// TODO - modify the someSTyle class for ligth mode and more
// TODO - Check here for more toolbar stuff: https://mdxeditor.dev/editor/docs/customizing-toolbar
// TODO - Handle responsiveness
export function ViewMarkdown({note, onNoteUpdate}:{note: Types.NoteType, onNoteUpdate:(updateNote: Types.NoteType) => void}){
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
            // Copies all existing values and changes only specific ones    
            const updatedNote = {
                ...note,
                content: contentRef.current
            };
            saveContent(updatedNote);
            
        }, 1500) // autosave delay
    }

    const saveContent = async (updatedNote: Types.NoteType) => {
        // Only save if content changed
        if(updatedNote.content == lastSavedRef.current){
            return
        }

        try{
            const response = await fetch(`/database/note/${note.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedNote),
            });
            if(response.ok){
                const savedNote = await response.json();
                lastSavedRef.current = savedNote.content;
                onNoteUpdate(savedNote);
            }
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
    
    // Change on new id
    useEffect(() => {
        contentRef.current = note.content ?? "# empty";
        lastSavedRef.current = note.content ?? "";
    }, [note.id]);

    // Cleanup on leave
    useEffect(() => {
        return () => {
            if(saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, []);

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