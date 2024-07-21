import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DSATags from "./DSATags";
import { useMediaQuery } from "@mui/material";
import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { GetMediaTag } from "../../Features/Playlist/playListSlice";
import DTSpinner from "./DTSpinner";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
  1200: { items: 4 },
};

const DSASlider = (props) => {
  const currentUser = useSelector((state) => state.locationplayer.currentUser);
  let themeObj = currentUser?.length !== 0 ? currentUser?.theme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [tagslist, setTagsList] = useState([]);
  const [prevList, setPrevList] = useState([]);
  const [selectedTags, selectedTagId] = useState([]);

  const renderNextButton = ({ isDisabled }) => {
    return (
      <ArrowForwardIosIcon
        sx={{
          position: "absolute",
          right: `${matchDownMd ? "-155px" : "-185px"}`,
          top: "3px",
          fontSize: "15px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.12)",
          background: "white",
          padding: "15px",
          borderRadius: "50%",
          color: appIconColor !== "" ? appIconColor : "#5D953C",
          "&:hover": {
            background: appIconColor !== "" ? appIconColor : "grey",
            color: "white",
          },
        }}
      />
    );
  };


  useEffect(() => {
    if (prevList.join("") !== props.tags.join("")) {
      // debugger
      setTagsList(props.tags);
      setPrevList(props.tags);
      // selectedTagId([props.tags[0]?.id]);
      // if (props.tags && props.tags[0]?.checked && props.type ==="System Tags") {
      //   selectedTagId([props.tags[0]?.id]);
      //   if(props?.userCanEditTag){
      //   props?.listOfSelectedTags([props.tags[0]?.id])}
      // }else{
      //   selectedTagId([props.tags[0]?.id]);
      //   if(props?.userCanEditTag){
      //   props?.listOfSelectedTags([props.tags[0]?.id])}
      // }
    }
  }, [props.tags]);


  const renderPrevButton = ({ isDisabled }) => {
    return (
      <ArrowBackIosIcon
        sx={{
          position: "absolute",
          right: `${matchDownMd ? "-90px" : "-120px"}`,
          top: "3px",
          fontSize: "15px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.12)",
          background: "white",
          padding: "15px",
          borderRadius: "50%",
          color: appIconColor !== "" ? appIconColor : "#5D953C",
          "&:hover": {
            background: appIconColor !== "" ? `${appIconColor}!important` : "grey",
            color: "white",
          },
        }}
      />
    );
  };

  const allTags = useSelector((state) => state?.gallery?.allTagsData);
  const replaceMediaFileRes = useSelector(
    (state) => state?.gallery?.replaceMediaFileRes
  );

  const [LoadingState, setloadingState] = useState(false);
  const getData = async () => {
    setloadingState(true);
    console.log("****called")
    const id = props.tags[0]?.id;
    if (id) {
      let currentDate = Date.now()
      const data = {
        str: `?_dc=${currentDate}&tags=[{
  "tag_id":"${id}"
}]&page=1&start=0&limit=25`,
        item: {
          _dc: 1669187779440,
          tags: [
            {
              tag_id: id,
            },
          ],
          page: 1,
          start: 0,
          limit: 25,
        },
      };
      await dispatch(GetMediaTag(data));
      setloadingState(false);
    }else{
      setloadingState(false);
    }
  };

  useEffect(() => {
    getData();
  }, [allTags, JSON.stringify(replaceMediaFileRes)]);

  const handleCheckbox = (checked, id) => {
    let updatedList = [...selectedTags];
    if (id && checked) {
      updatedList.splice(0, 1);
      let tags = tagslist.map((item) => {
        if (item.id === id) {
          if(props.type ==="System Tags" && id ==props.tags[0].id){

          }else{
            item.checked = checked;
          }
        }
        return item;
      });
       tags = tags.map((item) => {
          if(item.id ==props.tags[0].id && tagslist[0].checked && props.type ==="System Tags"){
              item.checked =false
              selectedTagId(selectedTags.splice(selectedTags.indexOf(item.id), 1))
            }
          if(id ==props.tags[0].id && !tagslist[0].checked && props.type ==="System Tags"){
              item.checked =true
              selectedTagId([...selectedTags, id])
            }
        return item;
      });
      setTagsList(tags);
      updatedList = [...selectedTags, id];
    } else if (!checked) {
      let tags = tagslist.map((item) => {
        if (item.id === id) {
          item.checked = checked;
        }
        return item;
      });
      setTagsList(tags);
      updatedList.splice(selectedTags.indexOf(id), 1);
    }
    if (!updatedList.length) {
      tagslist[0].checked = true;
      setTagsList(tagslist);
      selectedTagId([tagslist[0].id]);
      if(props?.userCanEditTag){
        props?.listOfSelectedTags(tagslist)
      }
      updatedList = [tagslist[0].id];
    } else {
      selectedTagId(updatedList);
      if(props?.userCanEditTag){
        props?.listOfSelectedTags(updatedList)
      }
    }

    let tagsItem = JSON.stringify(
      updatedList &&
        updatedList.map((d) => {
          const obj = {
            tag_id: d,
          };
          return obj;
        })
    );

    const data = {
      str: `?_dc=1669179376373&tags=${tagsItem}&page=1&start=0&limit=25`,

      item: {
        _dc: 1669187779440,
        tags: updatedList.map((d) => {
          const obj = {
            tag_id: d,
          };
          return obj;
        }),

        page: 1,
        start: 0,
        limit: 25,
      },
    };

    dispatch(GetMediaTag(data))
      .then((res) => {
        if (res?.payload?.data?.success) {
        } else if ((res.payload.data.msg = "The user is not authenticated!")) {
          localStorage.clear();
          window.location.replace("./");
        }
      })
      .catch((err) => console.log("error****", err));
  };

  return (
    <>
      <DTSpinner open={LoadingState} />
      <AliceCarousel
        mouseTracking
        items={tagslist?.map((tag) => {
          return (
            <div
              className={`item ${selectedTags.includes(tag.id) && "TagsList"}`}
              data-value={tag.id}
            >
              <DSATags
                value={tag.id}
                name={tag.id}
                checked={tag.checked}
                handleChange={(e) => handleCheckbox(e.target.checked, tag.id)}
              >
                {tag.name}
              </DSATags>
            </div>
          );
        })}
        responsive={responsive}
        controlsStrategy="alternate"
        disableDotsControls
        disableButtonsControls={false}
        autoWidth
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
      />
    </>
  );
};

export default DSASlider;
