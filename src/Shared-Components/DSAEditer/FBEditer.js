import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  EditorState,
  Modifier,
  convertToRaw,
  ContentState,
  convertFromHTML,
  DefaultDraftBlockRenderMap,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Immutable from "immutable";
import draftToHtml from "draftjs-to-html";
import ColorPic from "./ColorPics.js";
import { Box } from "@mui/system";

class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "⭐",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return (
      <div
        class="rdw-option-wrapper"
        aria-selected="false"
        role="button"
        title="Star"
        onClick={this.addStar}
      >
        *
      </div>
    );
  }
}

class CustomTable extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addTable = () => {
    let { editorState, onChange } = this.props;
    let contentState;

    let html = `<table>
        <tr>
          <td><strong>A1</strong></td>
          <td><em>B1</em></td>
        </tr>
        <tr>
          <td>A2</td>
          <td>B2</td>
        </tr>
      </table>`;

    const blocksFromHTML = convertFromHTML(html);
    const { contentBlocks, entityMap } = blocksFromHTML;
    contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

    contentState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      contentState.getBlockMap()
    );

    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return (
      <div
        class="rdw-option-wrapper"
        aria-selected="false"
        title="Table"
        onClick={this.addTable}
      >
        T
      </div>
    );
  }
}

export default class FBEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(this.props.editorStates.savedText || '')
        )
      ),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.sendContent();
  };
  sendContent = () => {
    this.props.editorStates.getContent(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  };

  blockRenderMap = Immutable.Map({
    section: {
      element: "section",
    },
    table: {
      element: "table",
    },
    tr: {
      element: "tr",
    },
    td: {
      element: "td",
    },
    th: {
      element: "th",
    },
  });
  extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    this.blockRenderMap
  );

  render() {
    const { editorState } = this.state;
    return (
      <Box
        sx={{
          background: "white",
          height: "55vh",
          padding: "12px 12px 0px 12px",
        }}
      >
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbarCustomButtons={[<CustomOption />, <CustomTable />]}
          blockRenderMap={this.extendedBlockRenderMap}
          toolbar={{
            colorPicker: { component: ColorPic },
          }}
        />
      </Box>
    );
  }
}
