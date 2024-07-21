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
import { SelectedTags } from "../../Features/Gallery/gallerySlice";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
  1200: { items: 4 },
};

const GallerySlider = (props) => {
  const currentUser = useSelector((state) => state.locationplayer.currentUser);
  const selectedTagsList = useSelector((state) => state.gallery.selectedTags);
  let themeObj = currentUser?.length !== 0 ? currentUser?.theme : "";
  let appIconColor = "#" + themeObj?.app_icon_color;
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [selectedTags, selectedTagId] = useState([]);

  const renderNextButton = () => {
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

  const renderPrevButton = () => {
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
    const id = props.tags[0]?.id;
    if (id) {
      let currentDate = Date.now()
      const data = {
        str: `?_dc=${currentDate}&tags=[{
  "tag_id":"${id}"
}]&page=1&start=0&limit=25`,
        item: {
          _dc: currentDate,
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
    } else {
      setloadingState(false);
    }
  };

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  useEffect(() => {
    getData();
  }, [allTags, JSON.stringify(replaceMediaFileRes)]);

  const handleCheckbox = (checkedState, id) => {
    if(!checkedState && id ===selectedTagsList['System Tags'][0].id) return;   // user cannot uncheck All tags checkbox
    let toggletateofTabs = props.type
    let allCheckedTags = Object.values(selectedTagsList).flatMap(tags =>
      tags.filter(tag => tag.checked === true)
    );
    let newList = [...selectedTagsList[props.type]];
    let listOfAllTags =deepClone(selectedTagsList)
    // below condition is to handle if we selecte any other tag, all tag should be unchecked
    if (allCheckedTags.length > 1) {
      newList = newList.map(item => {
        if (item.id === '371') {
          return { ...item, checked: false }
        } else if (item.id === id) {
          return { ...item, checked: checkedState }
        }
        else {
          return item
        }
      });
    }

    else if (allCheckedTags.length === 1 && allCheckedTags[0].id !== '371') {
      // if only on tag is checked and we will check 1st system tag if user un select already selcted tag, else it other tag will be selcted
      if (checkedState) {
        newList = newList.map(item => {
          if (item.id === id) {
            return { ...item, checked: checkedState }
          }
          else {
            return item
          }
        });
      } else {
        // to select 1st system tag if user unchecks all selected tags
        newList = deepClone(selectedTagsList['System Tags']);
        newList = newList.map(item => {
          if (item.id === '371') {
            return { ...item, checked: true }
          }
          else if (item.id === id) {
            return { ...item, checked: checkedState }
          }
          else {
            return item
          }
        });
        toggletateofTabs = 'System Tags'
      }
    }
    // to check/uncheck first system tag in case if we have selected/unselected other tags
    else if (allCheckedTags.length === 1 && allCheckedTags[0].id === '371') {
      if(props.type !=='System Tags'){
        listOfAllTags['System Tags'][0].checked = !checkedState // TO change state of first system tag
        newList = newList.map(item => {
          if (item.id === id) {
            return { ...item, checked: checkedState }
          }
          else {
            return item
          }
        });
      }else{
        newList = newList.map(item => {
          if (item.id === '371') {
            return { ...item, checked: false }
          }
          else if (item.id === id) {
            return { ...item, checked: checkedState }
          }
          else {
            return item
          }
        });
      }
    
    }

    let tempData = { ...listOfAllTags, [toggletateofTabs]: newList }
    dispatch(SelectedTags(tempData))
    allCheckedTags = Object.values(tempData).flatMap(tags =>
      tags.filter(tag => tag.checked === true)
    );
    let tagsItem = JSON.stringify(
      allCheckedTags &&
      allCheckedTags.map((item) => {
        const obj = {
          tag_id: item.id,
        };
        return obj;
      })
    );

    const data = {
      str: `?_dc=1669179376373&tags=${tagsItem}&page=1&start=0&limit=25`,
      item: {
        _dc: 1669187779440,
        tags: allCheckedTags.map((item) => {
          const obj = {
            tag_id: item.id,
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
        items={selectedTagsList[props.type]?.map((tag) => {
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

export default GallerySlider;