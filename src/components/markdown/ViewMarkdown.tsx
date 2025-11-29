import * as Types from "@/types/types"
import {BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, CreateLink, InsertFrontmatter, InsertImage, InsertTable, InsertThematicBreak, ListsToggle, MDXEditor, UndoRedo, codeBlockPlugin, frontmatterPlugin, headingsPlugin, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, tablePlugin, thematicBreakPlugin, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

// TODO - Add autosave using useffect and timer
// TODO - modify the someSTyle class for ligth mode and more
// TODO - Check here for more toolbar stuff: https://mdxeditor.dev/editor/docs/customizing-toolbar
// TODO - Handle responsiveness
export function ViewMarkdown({note}:{note: Types.NoteType}){
    return (
        <div >
            <MDXEditor markdown={note?.content ?? "# empty"} plugins={
                    [headingsPlugin(),
                    listsPlugin(),
                    markdownShortcutPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    linkPlugin(),
                    linkDialogPlugin(),
                    codeBlockPlugin(),
                    imagePlugin(),
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