import React, {useState} from 'react'

export default function Slideshow(props) {
    const data = props.data;
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = data.length;

    const nextSlide = () => {
        const nextIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
    }

    const prevSlide = () => {
        const nextIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;
        setCurrentIndex(nextIndex);
    }
  return (
    <div className='slideshow'>
        <div className="slide">
            {data.map((slide, index) => {
                return (
                    <div className={index === currentIndex ? 'slide-active' : 'slide'} key={index}>
                        {index === currentIndex && (
                            <img src={slide.image} alt='travel image' className='slideshow-image' />
                        )}
                    </div>
                )
            })}
            <button onClick={prevSlide} className='left-arrow'>Prev</button>
            <button onClick={nextSlide} className='right-arrow'>Next</button>
        </div>
    </div>
  )
}
