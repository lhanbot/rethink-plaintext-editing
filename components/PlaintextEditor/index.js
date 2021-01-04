import React, { useEffect } from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';

import css from './style.css';

function updateFile({file, write, setCurrentFile, editorState}) {
  const newFile = new File(
    [editorState.getCurrentContent().getPlainText()],
    file.name,
    {
      type: file.type,
      lastModified: Date.now()
    }
  );
  setCurrentFile(newFile);
  write(newFile);
}

function PlaintextEditor({ file, write }) {
  console.log(file, write);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [currentFile, setCurrentFile] = React.useState(file)
  useEffect(() => {
    (async () => {
      setEditorState(EditorState.createWithText(await file.text()));
    })();
  }, [file]);
  return (
    <div className={css.editor}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>
        <Editor
          editorState={editorState}
          currentFile={currentFile}
          onChange= {editorState => {
            setEditorState(editorState);
            updateFile({file, write, setCurrentFile, editorState});
          }}
        />
      </div>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
