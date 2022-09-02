import React from "react";
import { memo, useRef, useEffect, useState } from "react";

const Content = () => {
    const editorRef = useRef();
    const { ClassicEditor } = editorRef.current || {};
    const [editorLoaded, setEditorLoaded] = useState(false);
    
    function genHexString(len) {
      const hex = '0123456789ABCDEF';
      let output = '';
      for (let i = 0; i < len; ++i) {
          output += hex.charAt(Math.floor(Math.random() * hex.length));
      }
      return output;
    }
    
    const id = genHexString(7);
    useEffect(() => {
      editorRef.current = {
        ClassicEditor: require("./Editor/build/ckeditor")
      };
      setEditorLoaded(true);
    }, []);

    useEffect(()=>{
      if(ClassicEditor){
        ClassicEditor
				.create( document.querySelector( `.editor-${id}` ), {
					licenseKey: '',
				} )
				.then( editor => {
					window.editor = editor;
				} )
				.catch( error => {
					console.error( 'Oops, something went wrong!' );
					console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
					console.warn( 'Build id: 1lzzqnayetqo-tsu3xzcc1f0' );
					console.error( error );
				} );
      }
    },[ClassicEditor, id])
  return (
    <div className = "editor-content-wrapper">
    {editorLoaded ? (
        <div className={`editor-${id}`}></div>
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
};
export default memo(Content);
