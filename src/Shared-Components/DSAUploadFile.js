import React from "react";
import { useSelector } from "react-redux";

const DSAUploadFile = (props) => {
  const currentUser = useSelector((state) => state.locationplayer.currentUser);
  const userSelectedTheme = useSelector((state) => state.locationplayer.userSelectedTheme);
  let themeObj = currentUser?.length !== 0 ? userSelectedTheme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;
  return (
    <>
      <input
        id="f02"
        type="file"
        placeholder="Add profile picture"
        class="common-upload"
        onChange={props.onChange}
        accept={props.accept ? props.accept : "*/*"}
      />
      <label
        className="upload-lable"
        style={{
          backgroundColor: appIconColor !== "" ? appIconColor : "#5d953c",
        }}
        for="f02"
      >
        {props.tittle ? props.tittle : "Browse"}
      </label>
    </>
  );
};

export default DSAUploadFile;
