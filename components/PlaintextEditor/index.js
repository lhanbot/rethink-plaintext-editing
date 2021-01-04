import React, { useEffect } from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';

import css from './style.css';

let initialState = EditorState.createEmpty();
function PlaintextEditor({ file, write }) {
  console.log(file, write);
  const [editorState, setEditorState] = React.useState(initialState);
  useEffect(() => {
    (async () => {
      setEditorState(EditorState.createWithText(await file.text()));
    })();
  }, [file]);
  return (
    <div className={css.editor}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
