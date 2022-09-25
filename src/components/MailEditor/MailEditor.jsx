import React from "react";
import EmailEditor from "react-email-editor";
import { useRef, useState } from "react";
import axios from "axios";

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYi5zZXJnaGluZUBnbWFpbC5jb20iLCJleHAiOjE2NjM4OTUxMDEsImlhdCI6MTY2Mzg3NzEwMX0.2GCxpObuu4EUJaYNWB0zWNbaMTwEJgkmDPFKi5De6EcwfE5TIw49LPO7RcpXjaOHgTbQrFVayEF5giy5YUkalA'

// service
async function getData () {
  const url = `/api/v1/templates/8`
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const res = await axios.get(url, config);
  return res.data;
};

const MailEditor = () => {
  const emailEditorRef = useRef(null);
  const [html, setHtml] = useState('');
  const [json, setJson] = useState('');


  const exportAtrributes = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      setJson(design);
      setHtml(html);
    });
  };

  const exportTemplate = () => {
    if (json === '' || html === ''){
      console.log("Both html and json needed");
      return
    }

    const url = '/api/v1/templates';
    const data = {
      htmlEmail: html,
      jsonEmail: JSON.stringify(json),
      templateOwnerId: 1,
      emailRecipients: [] 
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log(data)
    axios.post( 
      url,
      data,
      config
    ).then(console.log).catch(console.log);

  }

  const mystyle = {
    color: "white",
    height: "850px",
    padding: "10px",
    fontFamily: "Arial",
  };

  async function onLoad () {
    const data = await getData();
    console.log(data['jsonEmail'])
    emailEditorRef.current.editor.loadDesign(data['jsonEmail']);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  return (
    <div>
      <div>
        <button onClick={() => exportAtrributes()}>Export json/html</button>
      </div>
      <div>
        <button onClick={() => exportTemplate()}>Save Template</button>
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
