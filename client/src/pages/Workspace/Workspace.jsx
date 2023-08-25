import React from "react";
import Split from "react-split";
import Problem from "./Problem";
import Editor from "./Editor";
import QTimer from "../../components/QTimer";
import { Room } from "../../components/Room";
import { useSnapshot } from "valtio";
import { globalState } from "../../utils/proxy";

function Workspace() {
  const state = useSnapshot(globalState);
  const time = new Date(state.room.created_at);
  time.setSeconds(time.getSeconds() + state.room.room_config.duration * 60);
  console.log("Hellow orld", state.room.room_config);

  return (
    <>
      <Split
        className="split max-h-screen p-[10px] overflow-hidden bg-[rgb(26,26,26)]"
        sizes={[40, 60]}
        minSize={[450, 500]}
        expandToMin={false}
      >
        <Problem />
        <Editor />
      </Split>
      <div className="flex justify-between gap-5 absolute right-10 top-[22px]">
        <QTimer expiryTimestamp={time} />
        <Room />
      </div>
    </>
  );
}

export default Workspace;
