import * as React from "react";
import { useNavigate,Link } from "react-router-dom";
import { List, ListItemIcon,ListItemButton } from "@mui/material";
import IconLink from "./IconLink";
import { NavigateNextTwoTone } from "@mui/icons-material";

export default function IconLinkList(props) {
  // Data: type,
  const navigate = useNavigate()
  
  const navigateTo = (url)=>{
    let x = url.substring(0,3)
    if (x == "htt"){
      window.open(url, '_blank');
    } else{
      navigate(url)
    }
  }
  
  const iconlinks = props.data.map((l,i) => {
    return (<ListItemButton onClick = {()=>navigateTo(l.url)}>
        <IconLink key = {i} {...l} />
        </ListItemButton>);
  })

  return(<List>{iconlinks}</List>);
}
