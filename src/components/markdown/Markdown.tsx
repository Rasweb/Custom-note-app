import * as Types from "@/types/types"
import {BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, CreateLink, DialogButton, InsertImage, InsertTable, InsertThematicBreak, ListsToggle, MDXEditor, UndoRedo, codeBlockPlugin, headingsPlugin, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, tablePlugin, thematicBreakPlugin, toolbarPlugin} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useEffect, useRef, useState } from "react";
import * as dataHooks from "@/hooks/dataHooks"
import { useNavigate } from "react-router-dom";

// TODO - Handle responsiveness and ligth/dakr mode
// TODO - navigate not working, handle later - at the moment full reaload is used
export function ViewMarkdown({note, onNoteUpdate}:{note: Types.NoteType, onNoteUpdate:(updateNote: Types.NoteType) => void}){
    /* useRef
        - Persists for the full lifetime of the component
        - Changing a property does not trigger a re-render
        - ref.current to access or modify the stored variable
    */
   const navigate = useNavigate();

    type nType = {
        id: number,
        title: string
    };

    const [notesList, setNotesList] = useState<nType[]>([]); // full notes
    const [noteSuggestions, setNoteSuggestions] = useState<string[]>([]); // only titles for autocomplete

    const contentRef = useRef(note?.content ?? "# empty");
    const lastSavedRef = useRef("");
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const noteLinkMapRef = useRef<Map<string, number>>(new Map());

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

        await dataHooks.editNote(updatedNote,note.id, (savedNote) => {
            lastSavedRef.current = savedNote.content;
            onNoteUpdate(savedNote)
        });
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


    useEffect(() => {
        const fetchNoteSuggestions = async () => {
            try {
                const notes = await dataHooks.getNotes();
                setNotesList(notes.map((n: nType) => ({ id: n.id, title: n.title })));
                setNoteSuggestions(notes.map((n: nType) => n.title)); // only titles

                // Create a map for quick lookup
                const map = new Map();
                notes.forEach((n: nType) => {
                    map.set(n.title, n.id);
                });

                noteLinkMapRef.current = map;
    
            } catch (error) {
                console.error("Failted to fetch notes: ", error);
            }
        };
        fetchNoteSuggestions();
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
                    linkDialogPlugin({
                        linkAutocompleteSuggestions: noteSuggestions,
                        onClickLinkCallback: (url) => {
                            const noteId = noteLinkMapRef.current.get(url);
                            console.log("Id: ", noteId)

                            // navigate(`/note/${noteId}`);
                            window.location.href = `/note/${noteId}`; // Forces a full-page reload
                        }
                    }),
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