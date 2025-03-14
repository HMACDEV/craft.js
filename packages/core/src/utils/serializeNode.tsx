import React, { Children } from "react";
import { NodeData, ReducedComp, SerializedNodeData } from "../interfaces";
import { Resolver } from "../interfaces";
import { resolveComponent } from "./resolveComponent";

const reduceType = (type: React.ElementType | string, resolver: Resolver) => {
  if (typeof type === "string") return type;
  return { resolvedName: resolveComponent(resolver, type) };
};

export const serializeComp = (
  data: Pick<NodeData, "type" | "isCanvas" | "props">,
  resolver: Resolver
): ReducedComp => {
  let { type, isCanvas, props } = data;
  props = Object.keys(props).reduce((result: Record<string, any>, key) => {
    const prop = props[key];
    if (key === "children" && typeof prop !== "string") {
      result[key] = Children.map(prop, child => {
        if (typeof child === "string") return child;
        return serializeComp(child, resolver);
      });
    } else if (prop.type) {
      result[key] = serializeComp(prop, resolver);
    } else {
      result[key] = prop;
    }
    return result;
  }, {});

  return {
    type: reduceType(type, resolver),
    ...(isCanvas && { isCanvas }),
    props
  };
};

export const serializeNode = (
  data: Omit<NodeData, "event">,
  resolver: Resolver
): SerializedNodeData => {
  let { type, props, isCanvas, name, ...nodeData } = data;

  const reducedComp = serializeComp({ type, isCanvas, props }, resolver);

  return {
    ...reducedComp,
    ...nodeData
  };
};
