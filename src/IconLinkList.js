import * as React from "react";
import { useNavigate,Link } from "react-router-dom";
import { List, ListItemIcon,ListItemButton } from "@mui/material";
import IconLink from "./IconLink";

export default function IconLinkList(props) {
  // Data: type,

  let navigate = useNavigate(); 
  const routeChange = (l) =>{ 
    console.log("hello...")
    console.log(l)
    navigate(l.url,{replace: true});
  }

  const iconlinks = props.data.map((l,i) => {
    return (<Link style={{ color: 'inherit', textDecoration: 'inherit'}}to={{
      pathname: "/courses"}}>
        <ListItemButton>
        <IconLink key = {i} {...l} />
        </ListItemButton>
    </Link>);
  })

  return(<List>{iconlinks}</List>);
}
