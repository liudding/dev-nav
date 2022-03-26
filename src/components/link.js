import React from "react"
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';

const Link = ({ to, nested, ...props }) => {
  if (!to) {
    to = "";
  }

  return nested ? (
    <object>
      {
        isAbsoluteUrl(to) ? (
          <a href={to} {...props}>
            {props.children}
          </a>
        ) : (
          <GatsbyLink to={to} {...props} />
        )
      }
    </object>
  ) : (isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  ))



}

export default Link;