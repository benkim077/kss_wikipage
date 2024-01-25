import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
function ListMain({ children }: Props) {
  return <div>{children}</div>;
}

function ListItems({ children }: Props) {
  return <ul>{children}</ul>;
}

function ListItem({ children }: Props) {
  return <li>{children}</li>;
}

export const List = Object.assign(ListMain, {
  Items: ListItems,
  Item: ListItem,
});
