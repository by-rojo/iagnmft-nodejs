import Slider, { SliderProps } from 'rc-slider'
import style from './style.module.scss'

const RangeSlider: React.FC<SliderProps> = (props) => {
  return (
    <div className={style.rangeSlider}>
      <Slider {...props} />
    </div>
  )
}

export default RangeSlider
