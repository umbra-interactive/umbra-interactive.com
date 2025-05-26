import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';


export const UConfetti = ({numberOfPieces, windowSize}: {numberOfPieces: number, windowSize: {width: number, height: number}}) => {

    return (
        <Confetti
        width={windowSize.width}
        height={windowSize.height}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 5000,
        }}
        recycle={true}
        numberOfPieces={numberOfPieces}
        gravity={1}
      />
    )
}