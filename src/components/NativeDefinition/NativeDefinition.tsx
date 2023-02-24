import { Typography, TypographyProps } from '@mui/material'
import { Fragment, memo, useMemo } from 'react'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'
import CopyableText from '../CopyableText'
import NativeParamsEx from '../NativeParamsEx'
import NativeParams from '../NativeParams'
import { useSettings } from '../../hooks'

export interface NativeDefinitionProps extends Omit<TypographyProps, 'children'> {
  name         : string
  params       : NativeParam[]
  returnType   : string
  noWrap      ?: boolean
  nameCopyable?: boolean
}

function NativeDefinition({ name, params, returnType, sx, noWrap = false, nameCopyable = true, ...rest }: NativeDefinitionProps) {
  const { nativeDisplayMode, displayVoidReturnType } = useSettings()
  const nameWithBreaks = useMemo(() => name.replace(/_/g, '_\u200b'), [name])
  
  if (nativeDisplayMode === 'C') {
    return (
      <Typography 
        component="span" 
        sx={{ 
          fontFamily: '"Roboto Mono", monospace',
          whiteSpace: noWrap ? 'nowrap' : 'normal',
          overflowWrap: noWrap ? 'normal' : 'break-word',
          ...sx
        }} 
        {...rest}
      >
        <NativeType popover={!noWrap} type={returnType} />{' '}
        {nameCopyable ? (
          <CopyableText>
            {nameWithBreaks}
          </CopyableText>
        ) : (
          <span>
            {nameWithBreaks}
          </span>
        )}
        {noWrap ? (
          <NativeParams params={params} />
        ) : (
          <NativeParamsEx params={params} />
        )}
      </Typography>
    )
  }
  else {
    return (
      <Typography
        component="span"
        sx={{
          fontFamily: '"Roboto Mono", monospace',
          whiteSpace: noWrap ? 'nowrap' : 'normal',
          overflowWrap: noWrap ? 'normal' : 'break-word',
          ...sx
        }}
        {...rest}
      >
        {nameCopyable ? (
          <CopyableText>
            {nameWithBreaks}
          </CopyableText>
        ) : (
          <span>
            {nameWithBreaks}
          </span>
        )}
        {noWrap ? (
          <NativeParams params={params} />
        ) : (
          <NativeParamsEx params={params} />
        )}
        {(displayVoidReturnType || (returnType !== 'void' && returnType !== 'VOID')) && (
          <Fragment>
            {':'}&nbsp;<NativeType popover={!noWrap} type={returnType} />
          </Fragment>
        )}
      </Typography>
    )
  }
}
export default memo(NativeDefinition)
