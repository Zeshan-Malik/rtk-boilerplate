import { DropzoneArea } from "material-ui-dropzone";
const  DSADropzone = (props)=> {

 const handleChange = (files) =>{
 props.handleChange(files)
  }
      return (
        <DropzoneArea
        style={{background:"red !important"}}
          onChange={(e) =>handleChange(e)}
          showPreviewsInDropzone={false}
          filesLimit={20}
          clearOnUnmount={true}
          acceptedFiles={props.acceptedFiles}
          maxFileSize={50000000}
          />
      )
  
}

export default DSADropzone;
