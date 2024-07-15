// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from '@editorjs/image';
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: ImageTool,
    config: {
            /**
         * Custom uploader
         */
       uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile: async (file)  => {
          const formData = new FormData();
          formData.append('source', file);
          return fetch(`${route('images.store')}`, {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                return {
                  success: 1,
                  file: {
                    url: data.source.url,
                    width: data.source.width,
                    height: data.source.height,
                    color: data.source.color,
                    extension: data.source.extension
                  }
                };
              } else {
                throw new Error(data.error || 'File upload failed');
              }
            })
            .catch(error => {
              console.error('Error uploading file:', error);
              return {
                success: 0,
                message: error.message
              };
            });
        },


        /**
         * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
         * @param {string} url - pasted image URL
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByUrl: async (url) => {
          return fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to fetch file from remote URL');
              }
              return response.blob();
            })
            .then(blob => {
              const formData = new FormData();
              formData.append('source', blob, 'uploaded-file');
              return fetch(`${route('images.store')}`, {
                method: 'POST',
                body: formData
              });
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                return {
                  success: 1,
                  file: {
                    url: data.source.url,
                    width: data.source.width,
                    height: data.source.height,
                    color: data.source.color,
                    extension: data.source.extension
                  }
                };
              } else {
                throw new Error(data.error || 'File upload failed');
              }
            })
            .catch(error => {
              console.error('Error uploading file:', error);
              return {
                success: 0,
                message: error.message
              };
            });
        }

      }
    }
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage
};
