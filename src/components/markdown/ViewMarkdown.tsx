import * as Types from "@/types/types"
import {BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, CreateLink, InsertFrontmatter, InsertImage, InsertTable, InsertThematicBreak, ListsToggle, MDXEditor, UndoRedo, codeBlockPlugin, frontmatterPlugin, headingsPlugin, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, tablePlugin, thematicBreakPlugin, toolbarPlugin, type MDXEditorMethods } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useRef } from "react";

// TODO - modify the someSTyle class for ligth mode and more
// TODO - Check here for more toolbar stuff: https://mdxeditor.dev/editor/docs/customizing-toolbar
// TODO - Handle responsiveness
// TODO - Save to the sqlite database
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

        console.log("Autosaving: \n", content);

        // Update last saved value;
        lastSavedRef.current = content;
    }

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