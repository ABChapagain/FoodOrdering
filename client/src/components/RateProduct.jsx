import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'

const RateProduct = ({ user, productId }) => {
  const [currentValue, setCurrentValue] = useState(1)
  const [hoverValue, setHoverValue] = useState(undefined)

  const handleClick = (value) => {
    setCurrentValue(value)
  }

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue)
  }

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const colors = {
    orange: '#FFBA5A',
    grey: '#a9a9a9',
  }

  const stars = Array(5).fill(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const rating = {
      star: currentValue,
      userId: user?.id,
    }
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/rate-product/${productId}`,
      rating
    )

    if (data.success) {
      alert('Thank you for your rating')
    }
  }

  return (
    <>
      <div className='d-flex'>
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => {
              handleClick(index + 1)
            }}
            style={{
              marginRight: 10,
              cursor: 'pointer',
            }}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={
              (hoverValue || currentValue) > index ? colors.orange : colors.grey
            }
          />
        ))}
      </div>

      <button
        type='submit'
        onClick={handleSubmit}
        className='btn btn-primary ms-3 mt-3 w-auto'
      >
        Submit
      </button>
    </>
  )
}

export default RateProduct
