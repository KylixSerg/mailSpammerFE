import React from "react";
import EmailEditor from "react-email-editor";
import { useRef } from "react";

const MailEditor = () => {
  const emailEditorRef = useRef(null);


  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      // eslint-disable-next-line no-unused-vars
      const { design, html } = data;

      console.log("exportHtml", html);
    });
  };

  const exportJson = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      // eslint-disable-next-line no-unused-vars

      console.log("exportDesign", design);
    });
  };

  const mystyle = {
    color: "white",
    height: "850px",
    padding: "10px",
    fontFamily: "Arial",
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
    console.log("onLoad");
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>
      <div>
        <button onClick={exportJson}>Export JSON</button>
      </div>

      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
        projectId={66042}
        style={mystyle}
      />
    </div>
  );
};

export default MailEditor;
