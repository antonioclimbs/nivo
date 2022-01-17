import { ReactNode } from 'react'
import { CssMixBlendMode } from '@nivo/core'
import { IconType } from './ui'

export type Unit = 'px' | '°' | 'ms'

export type InputType = 'text' | 'checkbox' | 'range' | 'color'

export type ControlContext = {
    path: string[]
}

export type SupportedValueByType = {
    angle: number
    blend_mode: CssMixBlendMode
    box_anchor: BoxAnchor
    color: string
    line_width: number
    margin: Margin
    object: Record<string, any>
    opacity: number
    ordinal_colors: string
    radio: string | number
    range: number
    switch: boolean
    text: string
}

export type AllSupportedValues = SupportedValueByType[keyof SupportedValueByType]

export interface CommonControlProps<Value extends AllSupportedValues> {
    id: string
    // can be used to override `id` for label
    label?: string
    icon?: IconType | ReactNode
    help?: string
    description?: string
    context?: ControlContext
    value: Value
    onChange?: (value: Value) => void
}

export interface RadioControlProps<Value extends SupportedValues<'radio'> = string>
    extends CommonControlProps<Value> {
    type: 'radio'
    columns?: number
    choices: {
        label: string
        value: Value
    }[]
}

export interface RangeControlProps extends CommonControlProps<SupportedValues<'range'>> {
    type: 'range'
    min: number
    max: number
    step?: number
    unit?: Unit
}

export interface SwitchControlProps extends CommonControlProps<SupportedValues<'switch'>> {
    type: 'switch'
}

export interface TextControlProps extends CommonControlProps<SupportedValues<'text'>> {
    type: 'text'
    disabled?: boolean
}

export interface AngleControlProps extends CommonControlProps<SupportedValues<'angle'>> {
    type: 'angle'
    start?: number
    min?: number
    max?: number
}

export interface ObjectControlProps<Obj extends SupportedValues<'object'> = Record<string, any>>
    extends CommonControlProps<Obj> {
    type: 'object'
    props: ObjectNestedControlProps<Obj>[]
}

export interface OpacityControlProps extends CommonControlProps<SupportedValues<'opacity'>> {
    type: 'opacity'
}

export interface LineWidthControlProps extends CommonControlProps<SupportedValues<'line_width'>> {
    type: 'line_width'
    min?: number
    max?: number
    step?: number
}

export type BoxAnchor =
    | 'center'
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'

export interface BoxAnchorControlProps extends CommonControlProps<SupportedValues<'box_anchor'>> {
    type: 'box_anchor'
}

export interface ColorControlProps extends CommonControlProps<SupportedValues<'color'>> {
    type: 'color'
}

export interface OrdinalColorsControlProps
    extends CommonControlProps<SupportedValues<'ordinal_colors'>> {
    type: 'ordinal_colors'
}

export interface BlendModeControlProps extends CommonControlProps<SupportedValues<'blend_mode'>> {
    type: 'blend_mode'
}

export type Margin = {
    top: number
    right: number
    bottom: number
    left: number
}

export interface MarginControlProps extends CommonControlProps<SupportedValues<'margin'>> {
    type: 'margin'
    min?: number
    max?: number
}

export type SupportedValues<T extends ControlType> = SupportedValueByType[T]

export type ExtractValue<Value extends AllSupportedValues, T extends ControlType> = Extract<
    Value,
    SupportedValues<T>
>

export type ControlProps<Value extends AllSupportedValues = any> =
    | AngleControlProps
    | BlendModeControlProps
    | BoxAnchorControlProps
    | ColorControlProps
    | LineWidthControlProps
    | MarginControlProps
    | ObjectControlProps<ExtractValue<Value, 'object'>>
    | OpacityControlProps
    | OrdinalColorsControlProps
    | RadioControlProps<ExtractValue<Value, 'radio'>>
    | RangeControlProps
    | SwitchControlProps
    | TextControlProps

export type ControlType = ControlProps['type']

export type ControlPropsByType<
    T extends ControlType,
    Value extends AllSupportedValues = AllSupportedValues
> = Extract<ControlProps<Value>, Record<'type', T>>

type ObjectKeysForValue<Obj extends Record<string, any>, T extends AllSupportedValues> = Extract<
    keyof Pick<
        Obj,
        {
            [Key in keyof Obj]: Obj[Key] extends T ? Key : never
        }[keyof Obj]
    >,
    string
>

type NestObjectControlProps<
    Props extends ControlProps,
    Obj extends SupportedValues<'object'>
> = Omit<Props, 'id' | 'value' | 'onChange'> & {
    id: ObjectKeysForValue<Obj, SupportedValues<Props['type']>>
}

export type ObjectNestedControlProps<Obj extends SupportedValues<'object'>> =
    | NestObjectControlProps<AngleControlProps, Obj>
    | NestObjectControlProps<BlendModeControlProps, Obj>
    | NestObjectControlProps<BoxAnchorControlProps, Obj>
    | NestObjectControlProps<ColorControlProps, Obj>
    | NestObjectControlProps<LineWidthControlProps, Obj>
    | NestObjectControlProps<MarginControlProps, Obj>
    | NestObjectControlProps<ObjectControlProps, Obj>
    | NestObjectControlProps<OpacityControlProps, Obj>
    | NestObjectControlProps<OrdinalColorsControlProps, Obj>
    | NestObjectControlProps<RadioControlProps, Obj>
    | NestObjectControlProps<RangeControlProps, Obj>
    | NestObjectControlProps<SwitchControlProps, Obj>
    | NestObjectControlProps<TextControlProps, Obj>
