import React from "react";
import { FC, memo, useRef, useEffect, useState, useMemo } from "react";
import { Modal, Row, Col, Radio, Button, RadioChangeEvent } from "antd";
import EditorWrapper from "./editor/EditorWrapper";

interface IContentProps {
  isModalContentVisible: boolean | undefined,
  setIsModalContentVisible: (data) => void,
  dataContent?: string;
  addData?: (data) => void,
  handlEditContent?: (data) => void,
}
const Content: FC<IContentProps> = ({isModalContentVisible, setIsModalContentVisible, addData, handlEditContent, dataContent}) => {
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState();
    function genHexString(len) {
      const hex = '0123456789ABCDEF';
      let output = '';
      for (let i = 0; i < len; ++i) {
          output += hex.charAt(Math.floor(Math.random() * hex.length));
      }
      return output;
    }
    
    const id = useMemo(() => genHexString(7),[]);

    useEffect(() => {
      editorRef.current = {
        ClassicEditor: require("./editor/ckeditor")
      };
      setEditorLoaded(true);
    }, []);

    useEffect(()=>{
      if(editorRef.current.ClassicEditor && isModalContentVisible){
        editorRef.current.ClassicEditor
				.create( document.querySelector( `.editor-${id}` ), {
					licenseKey: '',
          autosave: {
            save( editor ) {
                console.log(editor.getData())
                return setData(editor.getData());
            }
        },
				} )
				.then( editor => {
					window.editor = editor;
          if(dataContent){
            editor.setData(dataContent);
          }
				} )
				.catch( error => {
					console.error( 'Oops, something went wrong!' );
					console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
					console.warn( 'Build id: 1lzzqnayetqo-tsu3xzcc1f0' );
					console.error( error );
				});
      }
    },[editorRef, id, editorLoaded, isModalContentVisible])

    const handleOk = () => {
      if(editor){
        editor.destroy()
        .then( () => {
          if(handlEditContent){
            handlEditContent(data)
          }else{
            addData({
              title: "Nội dung",
              lable: <EditorWrapper dataContent={data}/>,
            })
          }
          if(editor){
            editor.setData("")
          }
          setIsModalContentVisible(false);
    
        })
        .catch( error => {
            console.log( error );
        } );
      }
    }
    const handleCancel = () => {
      if(editor){
        editor.destroy()
        .then( () => setIsModalContentVisible(false))
        .catch( error => {
            console.log( error );
        } );
      }
      setIsModalContentVisible(false)
    }
  return (
    <Modal
        visible={isModalContentVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
    <div className = "editor-content-wrapper">
    {editorLoaded ? (
        <div className={`editor-${id}`}></div>
      ) : (
        <div>Editor loading</div>
      )}
    </div>
    </Modal>
  );
};
export default memo(Content);
