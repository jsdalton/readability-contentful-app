import React, { useState } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { Box, Flex, useId } from '@contentful/f36-components';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Block, Inline } from '@contentful/rich-text-types';

import * as FleschKincaid from 'flesch-kincaid'

const READABILITY_BOUNDARIES = {
  min: 0,
  low: 50,
  high: 60,
  optimum: 70,
  max: 100
}

interface ReadabilityPanelProps {
  sdk: FieldExtensionSDK
}

type ratingComputer = (tv: string) => number

const computeFKScore = (textValue: string): number => {
  return FleschKincaid.rate(textValue)
}

const computeFKGrade = (textValue: string): number => {
  const rawGrade = FleschKincaid.grade(textValue)
  return Math.max(Math.round(rawGrade), 1)
}

const convertValueToText = (value: string | Block | Inline) => {
  return (typeof value === 'string')
    ? value
    : documentToPlainTextString(value)
}

const updateRating = (
  textValue: string,
  currentRating: number,
  ratingComputer: ratingComputer,
  setter: React.Dispatch<React.SetStateAction<number>>
) => {
  const newRating = ratingComputer(textValue)
  if (newRating !== currentRating) {
    setter(newRating)
  }
}

const ReadabilityPanel = ({ sdk }: ReadabilityPanelProps) => {
  const meterId = useId()
  const { low, optimum, high, min, max } = READABILITY_BOUNDARIES
  const [score, setScore] = useState(0)
  const [grade, setGrade] = useState(1)

  console.log(sdk.field)

  sdk.field.onValueChanged((value: string | Block | Inline) => {
    const textValue = convertValueToText(value)

    updateRating(textValue, score, computeFKScore, setScore)
    updateRating(textValue, grade, computeFKGrade, setGrade)
  })

  return (
    <Flex
      flexDirection="row"
      gap="spacingS"
      justifyContent="left"
      alignItems="left"
      marginTop="spacingM"
    >
      <Box>
        <label htmlFor={meterId}>Readability score:</label>
        <meter
          id={meterId}
          value={score}
          min={min}
          low={low}
          high={high}
          optimum={optimum}
          max={max}
          style={{
            marginLeft: 10
          }}
        >
          {score} out of {max}
        </meter>
      </Box>
      <Box marginLeft="spacingL">
        <span>Grade level: {(grade < 13) ? grade : `12+`}</span>
      </Box>
    </Flex>
  )
}

export default ReadabilityPanel

