import React, { useState } from "react";
import ReactDOM from "react-dom";
import "jodit";
// import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import postService from "../../service/post.service";

const copyStringToClipboard = function (str: any) {
    var el: any = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

const facilityMergeFields = [
    "FacilityNumber",
    "FacilityName",
    "Address",
    "MapCategory",
    "Latitude",
    "Longitude",
    "ReceivingPlant",
    "TrunkLine",
    "SiteElevation"
];
const inspectionMergeFields = [
    "InspectionCompleteDate",
    "InspectionEventType"
];
const createOptionGroupElement = (mergeFields: any, optionGrouplabel: any) => {
    let optionGroupElement = document.createElement("optgroup");
    optionGroupElement.setAttribute("label", optionGrouplabel);
    for (let index = 0; index < mergeFields.length; index++) {
        let optionElement = document.createElement("option");
        optionElement.setAttribute("class", "merge-field-select-option");
        optionElement.setAttribute("value", mergeFields[index]);
        optionElement.text = mergeFields[index];
        optionGroupElement.appendChild(optionElement);
    }
    return optionGroupElement;
}
const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
    "|",
    "source",
    "|",
    {
        name: "insertMergeField",
        tooltip: "Insert Merge Field",
        iconURL: "images/merge.png",
        popup: (editor: any, current: any, self: any, close: any) => {
            function onSelected(e: any) {
                let mergeField = e.target.value;
                if (mergeField) {
                    console.log(mergeField);
                    editor.selection.insertNode(
                        editor.create.inside.fromHTML("{{" + mergeField + "}}")
                    );
                }
            }
            let divElement = editor.create.div("merge-field-popup");

            let labelElement: any = document.createElement("label");
            labelElement.setAttribute("class", "merge-field-label");
            labelElement.text = 'Merge field: ';
            divElement.appendChild(labelElement);

            let selectElement: any = document.createElement("select");
            selectElement.setAttribute("class", "merge-field-select");
            selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
            selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
            selectElement.onchange = onSelected;
            divElement.appendChild(selectElement);

            console.log(divElement);
            return divElement;
        }
    },
    {
        name: "copyContent",
        tooltip: "Copy HTML to Clipboard",
        iconURL: "images/copy.png",
        exec: function (editor: any) {
            let html = editor.value;
            copyStringToClipboard(html);
        }
    }
];

const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    buttons: buttons,
    uploader: {
        insertImageAsBase64URI: true
    },
    // width: 800,
    height: 700
};

function PostCreate() {
    const [title, setTile] = useState('')
    const [content, setContent] = useState('');
    const [taggingIds, setTaggingIds] = useState([])

    const publishPost = () => {
        const request: any = {
            title: title,
            content: content,
            taggingIds: taggingIds,
            view: 0,
            createdDate: new Date(),
            modifiedDate: new Date()
        }
        postService.createPost(request)
    }


    return (
        <div className="mt-3">
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Tiêu đề</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setTile(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div>
                <label>Nội dung</label>
                <JoditEditor
                    value={content}
                    //@ts-ignore
                    config={editorConfig}
                    onChange={value => setContent(value)}
                />
            </div>
            <button className="btn btn-primary w-100 mt-3" onClick={() => {
                publishPost()
            }}>Đăng bài</button>
        </div>
    );
}
export default PostCreate