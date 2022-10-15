import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import CreateCategory from "../components/CreateCategory";
import CreateArticle from "../components/CreateArticle";
import { convertToHtml } from "mammoth/mammoth.browser";
import ReactQuill from "react-quill";
import { formats, modules } from "../utilities/Editor";

const Create = () => {
  const [toggle, setToggle] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (event) => {
    readFileInputEventAsArrayBuffer(event, async function (arrayBuffer) {
      const hello = await convertToHtml({ arrayBuffer: arrayBuffer });
      setResult(hello.value);
    });
  };

  function readFileInputEventAsArrayBuffer(event, callback) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function (loadEvent) {
      var arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }

  console.log(result);
  return (
    <DefaultLayout>
      <div className="lg:w-6/12 md:w-8/12 w-10/12 mx-auto flex justify-between p-4">
        <div class="flex justify-center">
          <label
            for="large-toggle"
            class="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value={toggle}
              onChange={() => setToggle(!toggle)}
              id="large-toggle"
              class="sr-only peer"
            />
            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900">
              Togggle to Switch between category and article creation
            </span>
          </label>
        </div>
      </div>
      <div className="mt-4 lg:w-6/12 md:w-8/12 w-10/12 mx-auto mb-4">
        {!toggle && <CreateCategory />}
        {toggle && <CreateArticle />}

        <input type="file" onChange={(e) => handleChange(e)} />

        {result &&  <ReactQuill
                      theme="snow"
                      value={result}
                      onChange={setResult}
                      formats={formats}
                      modules={modules}
                      className="block p-2.5 w-full text-sm"
                    />}
      </div>
    </DefaultLayout>
  );
};

export default Create;
