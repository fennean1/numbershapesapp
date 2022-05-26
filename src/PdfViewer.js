import * as React from 'react';
import { Routes, Route, useParams, useNavigate} from "react-router-dom";

export default function PdfViewer(props) {
  const {url} = useParams()
  console.log("url",url)
  const urly = "/"+url

  return (<iframe src={urly} style = {{width: "100vw", height: "100vh"}}>
</iframe>);
}
