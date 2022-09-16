import React from 'react';
import { MultipleLineEditor } from '@contentful/field-editor-multiple-line';
import { RichTextEditor } from '@contentful/field-editor-rich-text';
import { FieldExtensionSDK } from '@contentful/app-sdk';


interface DefaultEditorProps {
  sdk: FieldExtensionSDK
  isInitiallyDisabled: boolean
}

const DefaultEditor = ({ sdk, isInitiallyDisabled = false }: DefaultEditorProps) => {
  return (sdk.field.type === "RichText")
    ? (
      <RichTextEditor sdk={sdk} isInitiallyDisabled={isInitiallyDisabled} />
    )
    : (
      <MultipleLineEditor
        field={sdk.field}
        locales={sdk.locales}
        isInitiallyDisabled={isInitiallyDisabled}
      />
    )
}

export default DefaultEditor;

