import { Button } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { API_KEY, BridgeWindow } from "../../interface";


export const SelectDirectory = observer(() => {
    const selectDirectory = async () => {
        const filePaths = await (window as unknown as BridgeWindow)[API_KEY.OPEN_DIRECTORY]();
        alert(filePaths);
    }

    return (
        <div>
            <Button type='primary' onClick={selectDirectory}>选择npm包</Button>
        </div>
    )
});