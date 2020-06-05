import * as React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'

import {
  Connector,
  CONNECTOR_TOP_LEFT,
  CONNECTOR_TOP_MIDDLE,
  CONNECTOR_TOP_RIGHT,
  CONNECTOR_MIDDLE_RIGHT,
  CONNECTOR_BOTTOM_RIGHT,
  CONNECTOR_BOTTOM_MIDDLE,
  CONNECTOR_BOTTOM_LEFT,
  CONNECTOR_MIDDLE_LEFT,
  CONNECTOR_CENTER
} from './Connector'

export const AXIS_X = 'x'
export const AXIS_Y = 'y'
export const AXIS_ALL = 'all'
const CONNECTOR_SIZE = 14
const DEFAULT_Z_INDEX = 1

export interface DragResizeBlockProps {
  x?: number,
  y?: number,
  w?: number,
  h?: number,
  minW?: number,
  minH?: number,
  zIndex?: number,
  axis?: 'x' | 'y' | 'all',
  limitation: {
    x: number,
    y: number,
    w: number,
    h: number,
  },
  isDisabled: boolean,
  isDraggable: boolean,
  isResizable: boolean,
  connectors: [string, string, string, string, string, string, string, string, string],

  onPress: Function,
  onDragStart: Function,
  onDrag: Function,
  onDragEnd: Function,
  onResizeStart: Function,
  onResize: Function,
  onResizeEnd: Function,
  children: any
}

const defaultProps: DragResizeBlockProps = {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  minW: 50,
  minH: 50,
  axis: AXIS_ALL,
  limitation: {
    x: 0,
    y: 0,
    w: Dimensions.get('window').width,
    h: Dimensions.get('window').height,
  },
  isDisabled: false,
  zIndex: DEFAULT_Z_INDEX,
  isDraggable: true,
  isResizable: true,
  connectors: [
    CONNECTOR_TOP_LEFT,
    CONNECTOR_TOP_MIDDLE,
    CONNECTOR_TOP_RIGHT,
    CONNECTOR_MIDDLE_RIGHT,
    CONNECTOR_BOTTOM_RIGHT,
    CONNECTOR_BOTTOM_MIDDLE,
    CONNECTOR_BOTTOM_LEFT,
    CONNECTOR_MIDDLE_LEFT,
    CONNECTOR_CENTER,
  ],

  onPress: null,
  onDragStart: null,
  onDrag: null,
  onDragEnd: null,
  onResizeStart: null,
  onResize: null,
  onResizeEnd: null,
  children: null
}

export const DragResizeBlock: React.FunctionComponent<DragResizeBlockProps> = (props: DragResizeBlockProps) => {
  const [x, setX] = React.useState(props.x)
  const [y, setY] = React.useState(props.y)
  const [w, setW] = React.useState(props.w < props.minW ? props.minW : props.w)
  const [h, setH] = React.useState(props.h < props.minH ? props.minH : props.h)
  const [isSelected, setIsSelected] = React.useState(false)

  props = { ...defaultProps, ...props }

  /**
   * Handle drag start event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  const onDragStart = (coord) => {
    const {
      onDragStart,
    } = props

    setIsSelected(true)

    if (onDragStart !== null) {
      onDragStart([
        x,
        y,
      ])
    }
  }

  /**
   * Handle drag event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  const onDrag = (coord) => {
    const {
      axis,
      isDraggable,
      limitation,
      onDrag,
    } = props

    if (!isDraggable) {
      return
    }

    const newX = x + coord[0]
    const newY = y + coord[1]

    if (axis !== AXIS_Y) {
      if (limitation.x <= newX && limitation.w >= newX + w) {
        setX(newX)
      }
    }

    if (axis !== AXIS_X) {
      if (limitation.y <= newY && limitation.h >= newY + h) {
        setY(newY)
      }
    }

    if (onDrag !== null) {
      onDrag([
        x,
        y,
      ])
    }
  }

  /**
   * Handle drag end event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  const onDragEnd = (coord) => {
    const {
      onDragEnd,
    } = props

    setIsSelected(false)

    if (onDragEnd !== null) {
      onDragEnd([
        x,
        y,
      ])
    }
  }

  const onPress = (event) => {
    const {
      onPress,
    } = props

    if (onPress !== null) {
      onPress(event)
    }
  }

  const onResizeStart = () => {
    const {
      onResizeStart,
    } = props

    setIsSelected(true)

    if (onResizeStart !== null) {
      onResizeStart([
        x,
        y,
      ])
    }
  }

  const onResizeTL = (coord) => {
    const {
      minW,
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = props

    if (!isResizable) {
      return
    }

    const newX = x + coord[0]
    const newY = y + coord[1]
    const newW = x + w - newX
    const newH = y + h - newY

    if (newW >= minW && axis !== AXIS_Y) {
      if (limitation.x <= newX) {
        setW(newW)
        setX(newX)
      }
    }

    if (newH >= minH && axis !== AXIS_X) {
      if (limitation.y <= newY) {
        setH(newH)
        setY(newY)
      }
    }

    if (onResize !== null) {
      onResize([
        x,
        y,
      ])
    }
  }

  const onResizeTM = (coord) => {
    const {
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = props

    if (!isResizable) {
      return
    }

    const newY = y + coord[1]
    const newH = y + h - newY

    if (newH >= minH && axis !== AXIS_X) {
      if (limitation.y <= newY) {
        setH(newH)
        setY(newY)
      }
    }

    if (onResize !== null) {
      onResize([
        x,
        y,
      ])
    }
  }

  const onResizeTR = (coord) => {
    const {
      minW,
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = props

    if (!isResizable) {
      return
    }

    const newY = y + coord[1]
    const newW = w + coord[0]
    const newH = y + h - newY

    if (newW >= minW && axis !== AXIS_Y) {
      if (limitation.w >= x + newW) {
        setW(newW)
      }
    }

    if (newH >= minH && axis !== AXIS_X) {
      if (limitation.y <= newY) {
        setH(newH)
        setY(newY)
      }
    }

    if (onResize !== null) {
      onResize([
        x,
        y,
      ])
    }
  }

  const onResizeMR = (coord) => {
    const {
      minW,
      axis,
      isResizable,
      limitation,
      onResize,
    } = props

    if (!isResizable) {
      return
    }

    const newW = w + coord[0]

    if (newW >= minW && axis !== AXIS_Y) {
      if (limitation.w >= x + newW) {
        setW(newW)
      }
    }

    if (onResize !== null) {
      onResize([
        x,
        y,
      ])
    }
  }

  const onResizeBR = (coord) => {
    const {
      minW,
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = props

    if (!isResizable) {
      return
    }

    const newW = w + coord[0]
    const newH = h + coord[1]

    if (newW >= minW && axis !== AXIS_Y) {
      if (limitation.w >= x + newW) {
        setW(newW)
      }
    }

    if (newH >= minH && axis !== AXIS_X) {
      if (limitation.h >= y + newH) {
        setH(newH)
      }
    }

    if (onResize !== null) {
      onResize([
        x,
        y,
      ])
    }
  }

  const onResizeBM = (coord) => {
    const {
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = props

    if (!isResizable) {
      return
    }

    const newH = h + coord[1]

    if (newH >= minH && axis !== AXIS_X) {
      if (limitation.h >= y + newH) {
        setH(newH)
      }
    }

    if (onResize !== null) {
      onResize([
        x,
        y,
      ])
    }
  }

  const onResizeBL = (coord) => {
    const {
      minW,
      minH,
      axis,
      isResizable,
      limitation,
      onResize,
    } = props

    if (!isResizable) {
      return
    }

    const newX = x + coord[0]
    const newW = x + w - newX
    const newH = h + coord[1]

    if (newW >= minW && axis !== AXIS_Y) {
      if (limitation.x <= newX) {
        setW(newW)
        setX(newX)
      }
    }

    if (newH >= minH && axis !== AXIS_X) {
      if (y + newH <= limitation.h) {
        setH(newH)
      }
    }

    if (onResize !== null) {
      onResize([
        x,
        y,
      ])
    }
  }

  const onResizeML = (coord) => {
    const {
      minW,
      axis,
      isResizable,
      limitation,
      onResize,
    } = props

    if (!isResizable) {
      return
    }

    const newX = x + coord[0]
    const newW = x + w - newX

    if (newW >= minW && axis !== AXIS_Y) {
      if (limitation.x <= newX) {
        setW(newW)
        setX(newX)
      }
    }

    if (onResize !== null) {
      onResize([
        x,
        y,
      ])
    }
  }

  /**
   * Handle resize end event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  const onResizeEnd = () => {
    const {
      onResizeEnd,
    } = props

    setIsSelected(false)

    if (onResizeEnd !== null) {
      onResizeEnd([
        x,
        y,
      ])
    }
  }

  const connectorsMap = {}

  connectorsMap[CONNECTOR_TOP_LEFT] = {
    calculateX: () => {
      return 0
    },
    calculateY: () => {
      return 0
    },
    onStart: onResizeStart,
    onMove: onResizeTL,
    onEnd: onResizeEnd,
  }

  /**
   * Top middle connector.
   */
  connectorsMap[CONNECTOR_TOP_MIDDLE] = {
    calculateX: (width) => {
      return width / 2 - CONNECTOR_SIZE / 2
    },
    calculateY: () => {
      return 0
    },
    onStart: onResizeStart,
    onMove: onResizeTM,
    onEnd: onResizeEnd,
  }

  /**
   * Top right connector.
   */
  connectorsMap[CONNECTOR_TOP_RIGHT] = {
    calculateX: (width) => {
      return width - CONNECTOR_SIZE
    },
    calculateY: () => {
      return 0
    },
    onStart: onResizeStart,
    onMove: onResizeTR,
    onEnd: onResizeEnd,
  }

  /**
   * Middle right connector.
   */
  connectorsMap[CONNECTOR_MIDDLE_RIGHT] = {
    calculateX: (width) => {
      return width - CONNECTOR_SIZE
    },
    calculateY: (height) => {
      return height / 2 - CONNECTOR_SIZE / 2
    },
    onStart: onResizeStart,
    onMove: onResizeMR,
    onEnd: onResizeEnd,
  }

  /**
   * Bottom right connector.
   */
  connectorsMap[CONNECTOR_BOTTOM_RIGHT] = {
    calculateX: (width) => {
      return width - CONNECTOR_SIZE
    },
    calculateY: (height) => {
      return height - CONNECTOR_SIZE
    },
    onStart: onResizeStart,
    onMove: onResizeBR,
    onEnd: onResizeEnd,
  }

  /**
   * Bottom middle connector.
   */
  connectorsMap[CONNECTOR_BOTTOM_MIDDLE] = {
    calculateX: (width) => {
      return width / 2 - CONNECTOR_SIZE / 2
    },
    calculateY: (height) => {
      return height - CONNECTOR_SIZE
    },
    onStart: onResizeStart,
    onMove: onResizeBM,
    onEnd: onResizeEnd,
  }

  /**
   * Bottom left connector.
   */
  connectorsMap[CONNECTOR_BOTTOM_LEFT] = {
    calculateX: (width) => {
      return 0
    },
    calculateY: (height) => {
      return height - CONNECTOR_SIZE
    },
    onStart: onResizeStart,
    onMove: onResizeBL,
    onEnd: onResizeEnd,
  }

  /**
   * Middle left connector.
   */
  connectorsMap[CONNECTOR_MIDDLE_LEFT] = {
    calculateX: (width) => {
      return 0
    },
    calculateY: (height) => {
      return height / 2 - CONNECTOR_SIZE / 2
    },
    onStart: onResizeStart,
    onMove: onResizeML,
    onEnd: onResizeEnd,
  }

  /**
   * Center connector.
   */
  connectorsMap[CONNECTOR_CENTER] = {
    calculateX: (width) => {
      return width / 2 - CONNECTOR_SIZE / 2
    },
    calculateY: (height) => {
      return height / 2 - CONNECTOR_SIZE / 2
    },
    onStart: onDragStart,
    onMove: onDrag,
    onEnd: onDragEnd,
  }

  const renderConnectors = () => {
    const {
      connectors,
    } = props

    return connectors.map((connectorType) => {
      return (
        <Connector
          key={connectorType}
          type={connectorType}
          size={CONNECTOR_SIZE}
          x={connectorsMap[connectorType].calculateX(w)}
          y={connectorsMap[connectorType].calculateY(h)}
          onStart={connectorsMap[connectorType].onStart}
          onMove={connectorsMap[connectorType].onMove}
          onEnd={connectorsMap[connectorType].onEnd}
        />
      )
    })
  }

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        padding: CONNECTOR_SIZE / 2,
        zIndex: isSelected ? props.zIndex + 1 : props.zIndex,
      }}
    >
      <TouchableWithoutFeedback
        onPress={onPress}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {props.children}
        </View>
      </TouchableWithoutFeedback>

      {props.isDisabled ? null : renderConnectors()}

    </View>
  )
}
