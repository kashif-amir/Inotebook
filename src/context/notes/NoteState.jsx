import  { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [user, setUser] = useState(
    [{id:1, title:"sample title", description:"sample description", tag:"sample tag"}, {id:2, title:"sample title 2", description:"sample description 2", tag:"sample tag 2"}]
  );

  return (
    <NoteContext.Provider value={{ user, setUser }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
