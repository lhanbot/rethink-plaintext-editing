import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

function MarkdownEditor({ file, write }) {
  console.log(file, write);

  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.editor}>
      <ReactMarkdown plugins={[[gfm, {singleTilde: false}]]}>
        {value}
      </ReactMarkdown>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
