import React from "react";
import { FC, memo, useRef, useEffect, useState, useMemo } from "react";
import { Modal, Row, Col, Radio, Button, RadioChangeEvent } from "antd";
import EditorWrapper from "./editor/EditorWrapper";

// class MyUploadAdapter {
//   constructor( loader ) {
//       // CKEditor 5's FileLoader instance.
//       this.loader = loader;

//       // URL where to send files.
//       this.url = process.env.REACT_APP_API_URL + "/articles/media";
//   }

//   // Starts the upload process.
//   upload() {
//       return new Promise( ( resolve, reject ) => {
//           this._initRequest();
//           this._initListeners( resolve, reject );
//           this._sendRequest();
//       } );
//   }

//   // Aborts the upload process.
//   abort() {
//       if ( this.xhr ) {
//           this.xhr.abort();
//       }
//   }

//   // Example implementation using XMLHttpRequest.
//   _initRequest() {
//       const xhr = this.xhr = new XMLHttpRequest();

//       xhr.open( 'POST', this.url, true );
//       xhr.responseType = 'json';
//   }

//   // Initializes XMLHttpRequest listeners.
//   _initListeners( resolve, reject ) {
//       const xhr = this.xhr;
//       const loader = this.loader;
//       const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

//       xhr.addEventListener( 'error', () => reject( genericErrorText ) );
//       xhr.addEventListener( 'abort', () => reject() );
//       xhr.addEventListener( 'load', () => {
//           const response = xhr.response;

//           if ( !response || response.error ) {
//               return reject( response && response.error ? response.error.message : genericErrorText );
//           }

//           // If the upload is successful, resolve the upload promise with an object containing
//           // at least the "default" URL, pointing to the image on the server.
//           resolve( {
//               default: response.url
//           } );
//       } );

//       if ( xhr.upload ) {
//           xhr.upload.addEventListener( 'progress', evt => {
//               if ( evt.lengthComputable ) {
//                   loader.uploadTotal = evt.total;
//                   loader.uploaded = evt.loaded;
//               }
//           } );
//       }
//   }

//   // Prepares the data and sends the request.
//   _sendRequest() {
//       const data = new FormData();

//       data.append( 'upload', this.loader.file );

//       this.xhr.send( data );
//   }
// }

interface IContentProps {
  isModalContentVisible: boolean | undefined,
  setIsModalContentVisible: (data) => void,
  dataContent?: string;
  addData?: (data) => void,
  addDataContent?: (data) => void,
  handlEditContent?: (data) => void,
}
const Content: FC<IContentProps> = ({isModalContentVisible, setIsModalContentVisible, addData, handlEditContent, dataContent, addDataContent}) => {
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

    // function MyCustomUploadAdapterPlugin( editor ) {
    //   editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    //       console.log(editor.plugins)
    //       return new MyUploadAdapter( loader );
    //   };
    // }  
    useEffect(() => {
      editorRef.current = {
        ClassicEditor: require("./editor/ckeditor")
      };
      setEditorLoaded(true);
    }, []);

    useEffect(()=>{
      if(editorRef?.current.ClassicEditor && isModalContentVisible){
        editorRef?.current.ClassicEditor
				.create( document.querySelector( `.editor-${id}` ), {
					licenseKey: '',
          autosave: {
            save( editor ) {
                return setData(editor.getData());
            },
            simpleUpload: {
              uploadUrl: {url:'http://127.0.0.1/my-upload-endpoint', headers:{ 'x-header':'myhead'} }
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
    },[editorRef, id, editorLoaded, isModalContentVisible, dataContent])

    const handleOk = () => {
      if(editor){
        editor.destroy()
        .then( () => {
          if(handlEditContent){
            console.log(data)
            handlEditContent(data)
          }else{
            if(addData && data){
              addData({
              title: "Nội dung",
              lable: <EditorWrapper dataContent={data}/>,
            })
            addDataContent(
              {
                type: "content",
                data: data,
              }
            );
          }
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
